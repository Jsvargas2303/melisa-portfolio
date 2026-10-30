import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

function Blob({ color, pos, s }: { color: string; pos: [number, number, number]; s: number }) {
  const r = useRef<THREE.Mesh>(null!)
  useFrame(({ pointer, clock }) => {
    r.current.rotation.x = clock.elapsedTime * 0.2 + pointer.y * 0.4
    r.current.rotation.y = clock.elapsedTime * 0.3 + pointer.x * 0.4
    r.current.position.x = THREE.MathUtils.lerp(r.current.position.x, pos[0] + pointer.x * 0.25, 0.05)
  })
  return <Float speed={1.5} floatIntensity={1.2}>
    <mesh ref={r} position={pos} scale={s}><sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial color={color} transparent opacity={0.72} roughness={0.25} clearcoat={1} clearcoatRoughness={0.2} sheen={1} sheenColor="#ffffff" emissive={color} emissiveIntensity={0.35} depthWrite={false} />
    </mesh></Float>
}

export default function Orb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOn] = useState(true)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting)); if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={className} aria-hidden>
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 35 }} frameloop={onScreen ? 'always' : 'never'} gl={{ alpha: true }}>
      <ambientLight intensity={1.2} /><directionalLight position={[3, 3, 3]} intensity={2} />
      <Blob color="#c9b6ff" pos={[-0.55, 0.1, 0]} s={0.9} />
      <Blob color="#a8e8d4" pos={[0.6, -0.1, -0.4]} s={0.9} />
    </Canvas></div>
}
