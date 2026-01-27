import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, SSAO, Bloom, Vignette } from '@react-three/postprocessing';
import { TNTBox } from './TNTBox';
import * as THREE from 'three';

type TNTSceneProps = {
  onTntClicked: () => void;
};

// Simple shadow plane component
const SoftShadow = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.25}
        color="#000000"
        depthWrite={false}
      >
        <primitive 
          attach="map" 
          object={(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d')!;
            
            // Create radial gradient for soft shadow
            const gradient = ctx.createRadialGradient(128, 128, 40, 128, 128, 128);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
            gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 256);
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()} 
        />
      </meshBasicMaterial>
    </mesh>
  );
};

export const TNTScene: React.FC<TNTSceneProps> = ({ onTntClicked }) => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0.5, 5], fov: 40 }}
      shadows
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1
      }}
    >
      {/* Dark background */}
      <color attach="background" args={['#0a0806']} />
      <fog attach="fog" args={['#0a0806', 6, 12]} />

      {/* Soft ambient with slight warmth - reduced for more dramatic shadows */}
      <ambientLight intensity={0.45} color="#ffe8d1" />
      
      {/* Main light from RIGHT side - stronger to create left-side shadows */}
      <directionalLight
        position={[6, 5, 3]}
        intensity={1.8}
        color="#fff5e1"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      
      {/* Very weak fill light from LEFT - creates the shadow effect */}
      <directionalLight
        position={[-4, 2, -1]}
        intensity={0.15}
        color="#b8d4f0"
      />
      
      {/* Subtle top light for rim */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={0.2}
        color="#ffd4a3"
      />

      {/* Environment map for subtle reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Custom soft shadow - stays consistent */}
      <SoftShadow />

      <Suspense fallback={null}>
        <TNTBox onClick={onTntClicked} />
      </Suspense>

      {/* Post-processing for painterly look */}
      <EffectComposer multisampling={4}>
        {/* SSAO for ambient occlusion - enhanced to create visible left-side shadows */}
        <SSAO
          samples={31}
          radius={0.6}
          intensity={50}
          luminanceInfluence={0.4}
        />
        {/* Subtle bloom for soft glow */}
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        {/* Very subtle vignette */}
        <Vignette
          offset={0.3}
          darkness={0.5}
        />
      </EffectComposer>
    </Canvas>
  );
};