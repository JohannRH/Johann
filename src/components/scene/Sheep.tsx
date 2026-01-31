import React, { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sheep: React.FC = () => {
  const gltf = useGLTF('/models/Sheep.gltf');
  const groupRef = useRef<THREE.Group>(null);
  // Initialize mouse to the right side (where text is)
  const mouseNdcRef = useRef({ x: -0.5, y: 0 });

  const MODEL_FACES_POSITIVE_Z = true;

  // Find head/ears AND legs with random offsets
  const { headRig, legNodes, legOffsets } = useMemo(() => {
    const heads: THREE.Object3D[] = [];
    const ears: THREE.Object3D[] = [];
    const legs: THREE.Object3D[] = [];

    gltf.scene.traverse((obj) => {
      if (!obj.name) return;
      if (/head/i.test(obj.name)) heads.push(obj);
      if (/ear/i.test(obj.name)) ears.push(obj);
      if (/leg/i.test(obj.name)) legs.push(obj);
    });

    const head = heads[0] ?? null;

    const ancestors = (obj: THREE.Object3D | null) => {
      const arr: THREE.Object3D[] = [];
      let cur = obj;
      while (cur) {
        arr.push(cur);
        cur = cur.parent ?? null;
      }
      return arr;
    };

    const lca = (nodes: THREE.Object3D[]) => {
      if (nodes.length === 0) return null;
      const chains = nodes.map(ancestors);
      for (const candidate of chains[0]) {
        if (chains.every((c) => c.includes(candidate))) return candidate;
      }
      return null;
    };

    const rigCandidate = lca([head, ...ears].filter(Boolean) as THREE.Object3D[]);
    const rig = rigCandidate && rigCandidate !== gltf.scene ? rigCandidate : head;

    // Generate random offsets for each leg for independent movement
    const offsets = legs.map(() => ({
      phase: Math.random() * Math.PI * 2,
      speed: 1.5 + Math.random() * 0.5,
      amplitude: 0.06 + Math.random() * 0.04
    }));

    return { headRig: rig, legNodes: legs, legOffsets: offsets };
  }, [gltf.scene]);

  // Material setup
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const material = obj.material;
      if (!material || Array.isArray(material)) return;

      const mat = material as THREE.MeshStandardMaterial;
      mat.flatShading = true;
      mat.roughness = 0.9;
      mat.metalness = 0;

      const hsl = { h: 0, s: 0, l: 0 };
      mat.color.getHSL(hsl);
      mat.color.setHSL(hsl.h, Math.min(hsl.s * 1.8, 1), Math.min(hsl.l * 1.08, 1));

      obj.castShadow = false;
      obj.receiveShadow = false;
      
      if (obj.geometry) {
        obj.geometry.computeVertexNormals();
      }
    });
  }, [gltf.scene]);

  // Track mouse
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const x = -((event.clientX / window.innerWidth) * 2 - 1);
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseNdcRef.current.x = x;
      mouseNdcRef.current.y = y;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const tmpWorldTarget = useRef(new THREE.Vector3());
  const tmpDir = useRef(new THREE.Vector3());
  const tmpLookObj = useRef(new THREE.Object3D());
  const tmpHeadWorldPos = useRef(new THREE.Vector3());
  const tmpParentWorldQuat = useRef(new THREE.Quaternion());
  const tmpDesiredLocalQuat = useRef(new THREE.Quaternion());
  const modelForwardFixQuat = useRef(
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI),
  );

  // State for occasional animations
  const lastSpecialAnimTime = useRef(0);
  const specialAnimState = useRef<{
    type: 'none' | 'hop' | 'wiggle';
    startTime: number;
    duration: number;
  }>({ type: 'none', startTime: 0, duration: 0 });

  // Entrance animation state
  const entranceAnimRef = useRef({
    startTime: 0,
    duration: 0.8,
    isComplete: false,
  });

  useFrame(({ camera, clock }) => {
    const root = groupRef.current;
    if (!root) return;

    const head = headRig;
    const { x, y } = mouseNdcRef.current;
    const time = clock.getElapsedTime();

    // Entrance animation - scale up from 0.5 to 1.0
    const entranceAnim = entranceAnimRef.current;
    if (!entranceAnim.isComplete) {
      if (entranceAnim.startTime === 0) {
        entranceAnim.startTime = time;
      }

      const elapsed = time - entranceAnim.startTime;
      const progress = Math.min(elapsed / entranceAnim.duration, 1);

      // Easing function
      const t = progress;
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      // Animate scale from 0 to 1 (applied on top of base 0.4 scale)
      const entranceScale = 0.5 + (0.5 * eased);
      root.scale.setScalar(0.4 * entranceScale);

      // Animate opacity (fade in materials)
      gltf.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.material) {
          const mat = obj.material as THREE.MeshStandardMaterial;
          mat.opacity = eased;
          mat.transparent = true;
        }
      });

      if (progress >= 1) {
        entranceAnim.isComplete = true;
        // Reset to final scale and opacity
        root.scale.setScalar(0.4);
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.material) {
            const mat = obj.material as THREE.MeshStandardMaterial;
            mat.opacity = 1;
            mat.transparent = false;
          }
        });
      }

      // Don't return - allow cursor tracking to work during entrance
      // Only skip idle animations and special animations
    }

    // Only do idle animations and special animations if entrance is complete
    const skipIdleAnimations = !entranceAnimRef.current.isComplete;

    if (!skipIdleAnimations) {
      // Trigger occasional special animations (every 8-10 seconds)
      const timeSinceLastAnim = time - lastSpecialAnimTime.current;
      const specialAnim = specialAnimState.current;
      
      if (specialAnim.type === 'none' && timeSinceLastAnim > 8 + Math.random() * 2) {
        const animations = ['hop', 'wiggle'] as const;
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        specialAnimState.current = {
          type: randomAnim,
          startTime: time,
          duration: 0.6
        };
        lastSpecialAnimTime.current = time;
      }
    }

    // Execute special animation if active (only after entrance)
    let specialBobOffset = 0;
    let specialRotationOffset = 0;
    
    if (!skipIdleAnimations) {
      const specialAnim = specialAnimState.current;
      
      if (specialAnim.type !== 'none') {
        const animProgress = (time - specialAnim.startTime) / specialAnim.duration;
        
        if (animProgress >= 1) {
          specialAnimState.current.type = 'none';
        } else {
          const easeInOut = animProgress < 0.5 
            ? 2 * animProgress * animProgress 
            : 1 - Math.pow(-2 * animProgress + 2, 2) / 2;
          
          switch (specialAnim.type) {
            case 'hop':
              specialBobOffset = Math.sin(animProgress * Math.PI) * 0.15;
              break;
            case 'wiggle':
              specialRotationOffset = Math.sin(animProgress * Math.PI * 3) * 0.15 * (1 - easeInOut);
              break;
          }
        }
      }

      // Simple idle animation - gentle bobbing + special animation offset
      const bobAmount = Math.sin(time * 1.5) * 0.02 + specialBobOffset;
      root.position.y = bobAmount;
      
      // Apply wiggle rotation if active
      if (specialRotationOffset !== 0) {
        root.rotation.z = specialRotationOffset;
      } else {
        root.rotation.z = 0;
      }

      // Animate legs
      legNodes.forEach((leg, index) => {
        const offset = legOffsets[index];
        const swing = Math.sin(time * offset.speed + offset.phase) * offset.amplitude;
        leg.rotation.x = swing;
      });
    }

    // Cursor tracking - ALWAYS active (even during entrance)

    // Build world-space target
    tmpWorldTarget.current.set(x, y, 0.5).unproject(camera);
    tmpDir.current.copy(tmpWorldTarget.current).sub(camera.position).normalize();
    tmpWorldTarget.current.copy(camera.position).add(tmpDir.current.multiplyScalar(10));

    // Body follows cursor
    root.getWorldPosition(tmpHeadWorldPos.current);
    tmpLookObj.current.position.copy(tmpHeadWorldPos.current);
    tmpLookObj.current.lookAt(tmpWorldTarget.current);
    if (MODEL_FACES_POSITIVE_Z) {
      tmpLookObj.current.quaternion.multiply(modelForwardFixQuat.current);
    }

    root.quaternion.slerp(tmpLookObj.current.quaternion, 0.08);
    root.updateWorldMatrix(true, true);

    // Head follows more
    if (head && head !== root) {
      head.getWorldPosition(tmpHeadWorldPos.current);
      tmpLookObj.current.position.copy(tmpHeadWorldPos.current);
      tmpLookObj.current.lookAt(tmpWorldTarget.current);
      if (MODEL_FACES_POSITIVE_Z) {
        tmpLookObj.current.quaternion.multiply(modelForwardFixQuat.current);
      }

      if (head.parent) {
        head.parent.getWorldQuaternion(tmpParentWorldQuat.current);
        tmpDesiredLocalQuat.current
          .copy(tmpParentWorldQuat.current)
          .invert()
          .multiply(tmpLookObj.current.quaternion);
      } else {
        tmpDesiredLocalQuat.current.copy(tmpLookObj.current.quaternion);
      }

      head.quaternion.slerp(tmpDesiredLocalQuat.current, 0.18);
    }
  });

  return (
    <group ref={groupRef} scale={[0.4, 0.4, 0.4]} position={[0, 0, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

useGLTF.preload('/models/Sheep.gltf');