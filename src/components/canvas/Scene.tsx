'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Suspense } from 'react'
import { ThreeTunnel } from '@/helpers/global'

export default function Scene() {
  return (
    <Canvas
      className="roe-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ThreeTunnel.Out />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
