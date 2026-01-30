import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sheep } from './Sheep';

export const SheepScene: React.FC = () => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ 
        antialias: true,
        alpha: true,
      }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
      }}
      dpr={[1, 2]}
    >
      {/* Soft ambient light */}
      <ambientLight intensity={0.8} color="#ffeedd" />
      
      {/* Main light from top-right */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.2}
        color="#ffddbb"
      />
      
      {/* Fill light from left */}
      <directionalLight
        position={[-3, 2, 2]}
        intensity={0.4}
        color="#aaccee"
      />
      
      {/* Rim light */}
      <directionalLight
        position={[0, 1, -3]}
        intensity={0.3}
        color="#ccddff"
      />

      <Suspense fallback={<group />}>
        <Sheep />
      </Suspense>
    </Canvas>
  );
};
export default SheepScene;