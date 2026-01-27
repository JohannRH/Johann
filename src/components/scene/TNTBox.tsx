import React, { useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import tntModelUrl from '../../assets/models/TNT.gltf?url';

type TNTBoxProps = {
  onClick: () => void;
};

// Custom shader material for painterly/stylized look
const createPainterlyShadedMaterial = (baseColor: THREE.Color) => {
  const uniforms = {
    uColor: { value: baseColor },
    uLightPos: { value: new THREE.Vector3(4, 6, 3) },
    uLightColor: { value: new THREE.Color('#fff5e1') },
    uAmbient: { value: 0.6 },
    uTime: { value: 0 }
  };

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uLightPos;
    uniform vec3 uLightColor;
    uniform float uAmbient;
    uniform float uTime;
    
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;
    
    // Soft lighting calculation
    vec3 softLighting(vec3 normal, vec3 lightDir, vec3 viewDir) {
      float NdotL = dot(normal, lightDir);
      
      // Soften the transition between light and shadow
      float diffuse = smoothstep(-0.2, 0.8, NdotL);
      
      // Subsurface scattering approximation
      float backScatter = smoothstep(-1.0, 0.0, -NdotL) * 0.3;
      
      // Fresnel rim light
      float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);
      float rim = fresnel * 0.4;
      
      return vec3(diffuse + backScatter + rim);
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(uLightPos - vWorldPosition);
      
      // Main lighting
      vec3 lighting = softLighting(normal, lightDir, viewDir);
      
      // Add ambient
      vec3 ambient = vec3(uAmbient);
      
      // Combine
      vec3 finalColor = uColor * (lighting + ambient);
      
      // Slight color variation for hand-painted feel
      float variation = sin(vWorldPosition.x * 20.0 + vWorldPosition.y * 15.0) * 0.02 + 1.0;
      finalColor *= variation;
      
      // Tone mapping
      finalColor = finalColor / (finalColor + vec3(1.0));
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    lights: false
  });
};

export const TNTBox: React.FC<TNTBoxProps> = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const gltf = useGLTF(tntModelUrl);
  const useCustomShader = false; // Set to true to use custom shader instead of standard material

  // Store original materials
  const originalMaterials = useMemo(() => {
    const materials: Map<THREE.Mesh, THREE.Material> = new Map();
    gltf.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        materials.set(obj, obj.material);
      }
    });
    return materials;
  }, [gltf.scene]);

  // Apply enhanced materials
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const material = obj.material;
      if (!material || Array.isArray(material)) return;

      if (useCustomShader) {
        // Use custom shader
        const mat = material as THREE.MeshStandardMaterial;
        const color = mat.color.clone();
        const shaderMat = createPainterlyShadedMaterial(color);
        obj.material = shaderMat;
      } else {
        // Enhanced standard material
        const mat = material as THREE.MeshStandardMaterial;
        
        // Softer, more natural look
        mat.roughness = 0.85;
        mat.metalness = 0;
        
        // Enhance colors subtly
        const hsl = { h: 0, s: 0, l: 0 };
        mat.color.getHSL(hsl);
        mat.color.setHSL(hsl.h, Math.min(hsl.s * 1.15, 1), Math.min(hsl.l * 1.15, 0.95));
        
        // Shadows
        obj.castShadow = true;
        obj.receiveShadow = false;
        
        // Emissive for depth
        if (mat.color.r > 0.5 && mat.color.g < 0.3) {
          mat.emissive = new THREE.Color('#ff3333');
          mat.emissiveIntensity = 0.08;
        }
        
        if (mat.color.r > 0.5 && mat.color.g > 0.3 && mat.color.b < 0.3) {
          mat.emissive = new THREE.Color('#ffaa66');
          mat.emissiveIntensity = 0.05;
        }
      }
    });

    return () => {
      // Cleanup
      gltf.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          const originalMat = originalMaterials.get(obj);
          if (originalMat) {
            if (obj.material !== originalMat) {
              if (obj.material instanceof THREE.ShaderMaterial) {
                obj.material.dispose();
              }
            }
          }
        }
      });
    };
  }, [gltf.scene, useCustomShader, originalMaterials]);

  // Cursor feedback
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  return (
    <group
      scale={[0.26, 0.26, 0.26]}
      rotation={[0, 0.4, 0]}
      position={[0, 0, 0]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={gltf.scene} />
    </group>
  );
};

useGLTF.preload(tntModelUrl);