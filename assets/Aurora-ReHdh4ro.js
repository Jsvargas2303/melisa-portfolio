import{r as c,j as t}from"./index-DNEHWSPa.js";import{C as i,u,V as n,a as v}from"./react-three-fiber.esm-DjcrzBV2.js";const m=`
uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform vec2 uRes;
varying vec2 vUv;
float blob(vec2 p, vec2 c, float r){ return smoothstep(r, 0.0, length(p-c)); }
void main(){
  float a = uRes.x/uRes.y; vec2 p = vUv; p.x *= a;
  float t = uTime*0.08;
  vec3 base = vec3(0.953,0.945,0.925);
  vec3 lav = vec3(0.78,0.70,0.98), blue = vec3(0.74,0.85,0.98), mint = vec3(0.72,0.93,0.86);
  vec2 m = uMouse*vec2(a,1.0);
  vec2 c1 = vec2(a*(0.35+0.12*sin(t*3.0)), 0.7+0.1*cos(t*2.0) - uScroll*0.4);
  vec2 c2 = vec2(a*(0.85+0.08*cos(t*2.3)), 0.55+0.15*sin(t*1.7) - uScroll*0.2);
  vec2 c3 = vec2(a*(0.6+0.15*sin(t*1.3)), 0.2+0.1*sin(t*2.6) + uScroll*0.3);
  vec3 col = base;
  col = mix(col, lav, blob(p,c1,0.55)*0.55);
  col = mix(col, blue, blob(p,c2,0.5)*0.45);
  col = mix(col, mint, blob(p,c3,0.55)*0.45);
  col = mix(col, lav, blob(p,m,0.35)*0.25);
  float g = fract(sin(dot(vUv*uRes, vec2(12.9898,78.233)))*43758.5453);
  col += (g-0.5)*0.025;
  gl_FragColor = vec4(col,1.0);
}`,d="varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }";function f(){const{size:r}=u(),s=c.useRef(new n(.5,.5)),e=c.useMemo(()=>({uTime:{value:0},uMouse:{value:new n(.5,.5)},uScroll:{value:0},uRes:{value:new n(1,1)}}),[]);return c.useEffect(()=>{const o=a=>s.current.set(a.clientX/innerWidth,1-a.clientY/innerHeight);return addEventListener("pointermove",o),()=>removeEventListener("pointermove",o)},[]),v((o,a)=>{e.uTime.value+=a,e.uMouse.value.lerp(s.current,.04);const l=document.body.scrollHeight-innerHeight;e.uScroll.value+=((l>0?scrollY/l:0)-e.uScroll.value)*.05,e.uRes.value.set(r.width,r.height)}),t.jsxs("mesh",{children:[t.jsx("planeGeometry",{args:[2,2]}),t.jsx("shaderMaterial",{uniforms:e,vertexShader:d,fragmentShader:m,depthWrite:!1})]})}function b(){const[r,s]=c.useState(!0),e=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;return c.useEffect(()=>{const o=()=>s(!document.hidden);return document.addEventListener("visibilitychange",o),()=>document.removeEventListener("visibilitychange",o)},[]),t.jsx("div",{className:"aurora","aria-hidden":!0,children:t.jsx(i,{dpr:[1,1.5],gl:{antialias:!1,powerPreference:"low-power"},frameloop:r&&!e?"always":"demand",children:t.jsx(f,{})})})}export{b as default};
