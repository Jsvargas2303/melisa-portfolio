import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { usePrefs } from './context/Prefs'

const frag = `
uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform vec2 uRes; uniform float uDark;
varying vec2 vUv;
float blob(vec2 p, vec2 c, float r){ return smoothstep(r, 0.0, length(p-c)); }
void main(){
  float a = uRes.x/uRes.y; vec2 p = vUv; p.x *= a;
  float t = uTime*0.08;
  vec3 baseL = vec3(0.953,0.945,0.925);
  vec3 baseD = vec3(0.070,0.066,0.100);
  vec3 lavL = vec3(0.78,0.70,0.98), lavD = vec3(0.32,0.24,0.55);
  vec3 blueL = vec3(0.74,0.85,0.98), blueD = vec3(0.18,0.28,0.48);
  vec3 mintL = vec3(0.72,0.93,0.86), mintD = vec3(0.16,0.38,0.34);
  vec3 base = mix(baseL, baseD, uDark);
  vec3 lav = mix(lavL, lavD, uDark);
  vec3 blue = mix(blueL, blueD, uDark);
  vec3 mint = mix(mintL, mintD, uDark);
  vec2 m = uMouse*vec2(a,1.0);
  vec2 c1 = vec2(a*(0.35+0.12*sin(t*3.0)), 0.7+0.1*cos(t*2.0) - uScroll*0.4);
  vec2 c2 = vec2(a*(0.85+0.08*cos(t*2.3)), 0.55+0.15*sin(t*1.7) - uScroll*0.2);
  vec2 c3 = vec2(a*(0.6+0.15*sin(t*1.3)), 0.2+0.1*sin(t*2.6) + uScroll*0.3);
  vec3 col = base;
  col = mix(col, lav, blob(p,c1,0.55)*mix(0.55,0.70,uDark));
  col = mix(col, blue, blob(p,c2,0.5)*mix(0.45,0.55,uDark));
  col = mix(col, mint, blob(p,c3,0.55)*mix(0.45,0.55,uDark));
  col = mix(col, lav, blob(p,m,0.42)*mix(0.55,0.75,uDark));
  float g = fract(sin(dot(vUv*uRes, vec2(12.9898,78.233)))*43758.5453);
  col += (g-0.5)*mix(0.025, 0.04, uDark);
  gl_FragColor = vec4(col,1.0);
}`
const vert = `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`

function Plane({ dark }: { dark: boolean }) {
  const { size, invalidate } = useThree()
  useEffect(() => { invalidate() }, [dark, invalidate])
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const u = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uDark: { value: dark ? 1 : 0 },
  }), [])
  useEffect(() => {
    const f = (e: PointerEvent) => mouse.current.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight)
    addEventListener('pointermove', f); return () => removeEventListener('pointermove', f)
  }, [])
  useFrame((_, d) => {
    u.uTime.value += d
    u.uMouse.value.lerp(mouse.current, 0.09)
    const max = document.body.scrollHeight - innerHeight
    u.uScroll.value += ((max > 0 ? scrollY / max : 0) - u.uScroll.value) * 0.05
    u.uRes.value.set(size.width, size.height)
    u.uDark.value += ((dark ? 1 : 0) - u.uDark.value) * 0.08
  })
  return <mesh><planeGeometry args={[2, 2]} /><shaderMaterial uniforms={u} vertexShader={vert} fragmentShader={frag} depthWrite={false} /></mesh>
}

export default function Aurora() {
  const { theme, reducedMotion } = usePrefs()
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const f = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', f)
    return () => document.removeEventListener('visibilitychange', f)
  }, [])
  return (
    <div className="aurora" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
      >
        <Plane dark={theme === 'dark'} />
      </Canvas>
    </div>
  )
}
