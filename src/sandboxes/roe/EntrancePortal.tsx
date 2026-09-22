'use client'

import { Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function RoseCore() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.13
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
  })

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.8}>
        <mesh>
          <torusKnotGeometry args={[1.05, 0.24, 220, 28]} />
          <meshStandardMaterial
            color="#c8152f"
            emissive="#6b0014"
            emissiveIntensity={2.1}
            metalness={0.55}
            roughness={0.18}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function EntrancePortal() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 4, 6]} intensity={3} color="#f4f0e8" />
      <pointLight position={[-3, -1, 2]} intensity={18} color="#ed519e" />
      <pointLight position={[3, 1, 0]} intensity={12} color="#72c2cf" />

      <RoseCore />
      <Sparkles count={120} scale={[8, 5, 6]} size={2} speed={0.35} opacity={0.7} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.15} luminanceThreshold={0.65} mipmapBlur />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </>
  )
}
