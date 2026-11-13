import{u as v,r as a,j as r}from"./index-B3SVnIL6.js";import{C as m,u as f,V as s,a as d}from"./react-three-fiber.esm-DLIqtttV.js";const b=`
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
  col = mix(col, lav, blob(p,m,0.35)*0.25);
  float g = fract(sin(dot(vUv*uRes, vec2(12.9898,78.233)))*43758.5453);
  col += (g-0.5)*mix(0.025, 0.04, uDark);
  gl_FragColor = vec4(col,1.0);
}`,x="varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }";function p({dark:t}){const{size:c,invalidate:o}=f();a.useEffect(()=>{o()},[t,o]);const u=a.useRef(new s(.5,.5)),e=a.useMemo(()=>({uTime:{value:0},uMouse:{value:new s(.5,.5)},uScroll:{value:0},uRes:{value:new s(1,1)},uDark:{value:t?1:0}}),[]);return a.useEffect(()=>{const i=l=>u.current.set(l.clientX/innerWidth,1-l.clientY/innerHeight);return addEventListener("pointermove",i),()=>removeEventListener("pointermove",i)},[]),d((i,l)=>{e.uTime.value+=l,e.uMouse.value.lerp(u.current,.04);const n=document.body.scrollHeight-innerHeight;e.uScroll.value+=((n>0?scrollY/n:0)-e.uScroll.value)*.05,e.uRes.value.set(c.width,c.height),e.uDark.value+=((t?1:0)-e.uDark.value)*.08}),r.jsxs("mesh",{children:[r.jsx("planeGeometry",{args:[2,2]}),r.jsx("shaderMaterial",{uniforms:e,vertexShader:x,fragmentShader:b,depthWrite:!1})]})}function g(){const{theme:t,reducedMotion:c}=v(),[o,u]=a.useState(!0);return a.useEffect(()=>{const e=()=>u(!document.hidden);return document.addEventListener("visibilitychange",e),()=>document.removeEventListener("visibilitychange",e)},[]),r.jsx("div",{className:"aurora","aria-hidden":!0,children:r.jsx(m,{dpr:[1,1.5],gl:{antialias:!1,powerPreference:"low-power"},frameloop:o&&!c?"always":"demand",children:r.jsx(p,{dark:t==="dark"})})})}export{g as default};
