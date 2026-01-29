'use client'

import { useState, useEffect, useRef } from 'react'
import { HeroContent } from './HeroContent'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import * as THREE from 'three'

// Palabras que escupe el globo
const LAVA_WORDS = ['AI', 'THINK', 'AUTO', 'MIND', 'CLP', 'ALL', 'LIVE', 'SEND', 'COPY', 'PASTE', 'DATE', 'EMAIL', 'CALL', 'CHATBOT', 'SECURE', 'ANALITICS']

function useParticlePositions(count: number) {
  const [positions, setPositions] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])
  
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 12,
      }))
    )
  }, [count])
  
  return positions
}

function useExplosionPositions(count: number) {
  const [positions, setPositions] = useState<Array<{ tx: number; ty: number; word: string }>>([])
  
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        tx: Math.random() * 200 - 100,
        ty: Math.random() * 200 - 100,
        word: LAVA_WORDS[Math.floor(Math.random() * LAVA_WORDS.length)],
      }))
    )
  }, [count])
  
  return positions
}

// Crear textura de texto para Three.js
function createTextTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  
  canvas.width = 256
  canvas.height = 80
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#ffee00')
  gradient.addColorStop(0.3, '#ffaa00')
  gradient.addColorStop(0.6, '#ff6600')
  gradient.addColorStop(1, '#ff3300')
  
  ctx.font = 'bold 52px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  ctx.shadowColor = '#ff4400'
  ctx.shadowBlur = 20
  ctx.fillStyle = gradient
  ctx.fillText(text, 128, 40)
  
  ctx.shadowBlur = 10
  ctx.fillText(text, 128, 40)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  
  return texture
}

// Componente del Globo Terráqueo 3D
function LavaGlobe({ opacity, scale }: { opacity: number; scale: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)
  const wordsRef = useRef<THREE.Group>(new THREE.Group())
  const timeRef = useRef<number>(0)
  const lightIntensityRef = useRef<number>(1)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // ============================================
    // SHADER DEL GLOBO CON LUZ PULSANTE RÁPIDA
    // ============================================
    
    const globeVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        
        float displacement = sin(position.x * 12.0 + time * 0.8) * sin(position.y * 12.0 + time * 0.6) * 0.004;
        vec3 newPosition = position + normal * displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `
    
    const globeFragmentShader = `
      uniform float time;
      uniform float lightPulse;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      
      #define PI 3.14159265359
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      float getContinentMask(vec3 pos) {
        float lon = atan(pos.z, pos.x);
        float lat = asin(clamp(pos.y, -1.0, 1.0));
        
        float u = (lon + PI) / (2.0 * PI);
        float v = (lat + PI/2.0) / PI;
        
        float continent = 0.0;
        
        // EURASIA
        float europeX = smoothstep(0.42, 0.46, u) * smoothstep(0.6, 0.56, u);
        float europeY = smoothstep(0.58, 0.63, v) * smoothstep(0.78, 0.72, v);
        continent += europeX * europeY * 0.95;
        
        float iberiaX = smoothstep(0.4, 0.44, u) * smoothstep(0.5, 0.46, u);
        float iberiaY = smoothstep(0.56, 0.6, v) * smoothstep(0.68, 0.64, v);
        continent += iberiaX * iberiaY * 0.9;
        
        float italyX = smoothstep(0.51, 0.535, u) * smoothstep(0.565, 0.54, u);
        float italyY = smoothstep(0.54, 0.58, v) * smoothstep(0.68, 0.62, v);
        continent += italyX * italyY * 0.85;
        
        float scandX = smoothstep(0.5, 0.54, u) * smoothstep(0.6, 0.56, u);
        float scandY = smoothstep(0.7, 0.75, v) * smoothstep(0.88, 0.82, v);
        continent += scandX * scandY * 0.9;
        
        float ukX = smoothstep(0.43, 0.47, u) * smoothstep(0.52, 0.48, u);
        float ukY = smoothstep(0.64, 0.68, v) * smoothstep(0.76, 0.72, v);
        continent += ukX * ukY * 0.85;
        
        float russiaX = smoothstep(0.55, 0.62, u) * smoothstep(0.98, 0.88, u);
        float russiaY = smoothstep(0.62, 0.68, v) * smoothstep(0.85, 0.78, v);
        continent += russiaX * russiaY * 0.95;
        
        float chinaX = smoothstep(0.72, 0.78, u) * smoothstep(0.9, 0.84, u);
        float chinaY = smoothstep(0.52, 0.58, v) * smoothstep(0.72, 0.66, v);
        continent += chinaX * chinaY * 0.95;
        
        float indiaX = smoothstep(0.68, 0.73, u) * smoothstep(0.8, 0.75, u);
        float indiaY = smoothstep(0.42, 0.48, v) * smoothstep(0.62, 0.56, v);
        continent += indiaX * indiaY * 0.9;
        
        float japanX = smoothstep(0.86, 0.89, u) * smoothstep(0.94, 0.91, u);
        float japanY = smoothstep(0.56, 0.62, v) * smoothstep(0.74, 0.68, v);
        continent += japanX * japanY * 0.8;
        
        float meX = smoothstep(0.58, 0.64, u) * smoothstep(0.72, 0.66, u);
        float meY = smoothstep(0.5, 0.55, v) * smoothstep(0.65, 0.6, v);
        continent += meX * meY * 0.85;
        
        // ÁFRICA
        float africaX = smoothstep(0.44, 0.52, u) * smoothstep(0.68, 0.6, u);
        float africaY = smoothstep(0.28, 0.38, v) * smoothstep(0.58, 0.5, v);
        continent += africaX * africaY;
        
        float hornX = smoothstep(0.6, 0.65, u) * smoothstep(0.7, 0.66, u);
        float hornY = smoothstep(0.4, 0.45, v) * smoothstep(0.54, 0.5, v);
        continent += hornX * hornY * 0.85;
        
        float madX = smoothstep(0.62, 0.65, u) * smoothstep(0.68, 0.65, u);
        float madY = smoothstep(0.32, 0.36, v) * smoothstep(0.44, 0.4, v);
        continent += madX * madY * 0.8;
        
        // AMÉRICA DEL NORTE
        float canadaX = smoothstep(0.08, 0.16, u) * smoothstep(0.36, 0.26, u);
        float canadaY = smoothstep(0.65, 0.72, v) * smoothstep(0.88, 0.8, v);
        continent += canadaX * canadaY;
        
        float usaX = smoothstep(0.1, 0.18, u) * smoothstep(0.34, 0.26, u);
        float usaY = smoothstep(0.54, 0.6, v) * smoothstep(0.72, 0.66, v);
        continent += usaX * usaY;
        
        float flX = smoothstep(0.2, 0.24, u) * smoothstep(0.28, 0.25, u);
        float flY = smoothstep(0.54, 0.58, v) * smoothstep(0.64, 0.6, v);
        continent += flX * flY * 0.8;
        
        float mexX = smoothstep(0.08, 0.14, u) * smoothstep(0.22, 0.16, u);
        float mexY = smoothstep(0.48, 0.52, v) * smoothstep(0.6, 0.56, v);
        continent += mexX * mexY * 0.9;
        
        float caX = smoothstep(0.14, 0.18, u) * smoothstep(0.24, 0.2, u);
        float caY = smoothstep(0.44, 0.48, v) * smoothstep(0.54, 0.5, v);
        continent += caX * caY * 0.75;
        
        float akX = smoothstep(0.0, 0.06, u) * smoothstep(0.14, 0.08, u);
        float akY = smoothstep(0.7, 0.74, v) * smoothstep(0.84, 0.8, v);
        continent += akX * akY * 0.85;
        
        float grX = smoothstep(0.28, 0.34, u) * smoothstep(0.42, 0.36, u);
        float grY = smoothstep(0.74, 0.78, v) * smoothstep(0.9, 0.86, v);
        continent += grX * grY * 0.9;
        
        // AMÉRICA DEL SUR
        float sanX = smoothstep(0.18, 0.24, u) * smoothstep(0.32, 0.26, u);
        float sanY = smoothstep(0.42, 0.46, v) * smoothstep(0.52, 0.48, v);
        continent += sanX * sanY * 0.9;
        
        float brX = smoothstep(0.22, 0.3, u) * smoothstep(0.42, 0.34, u);
        float brY = smoothstep(0.3, 0.38, v) * smoothstep(0.5, 0.44, v);
        continent += brX * brY;
        
        float argX = smoothstep(0.18, 0.24, u) * smoothstep(0.32, 0.26, u);
        float argY = smoothstep(0.12, 0.2, v) * smoothstep(0.38, 0.3, v);
        continent += argX * argY * 0.9;
        
        // OCEANÍA
        float ausX = smoothstep(0.78, 0.86, u) * smoothstep(0.95, 0.88, u);
        float ausY = smoothstep(0.22, 0.3, v) * smoothstep(0.44, 0.36, v);
        continent += ausX * ausY;
        
        float nzX = smoothstep(0.9, 0.94, u) * smoothstep(0.98, 0.95, u);
        float nzY = smoothstep(0.22, 0.28, v) * smoothstep(0.38, 0.32, v);
        continent += nzX * nzY * 0.75;
        
        float indoX = smoothstep(0.74, 0.8, u) * smoothstep(0.9, 0.84, u);
        float indoY = smoothstep(0.42, 0.46, v) * smoothstep(0.52, 0.48, v);
        continent += indoX * indoY * 0.8;
        
        float phX = smoothstep(0.8, 0.84, u) * smoothstep(0.88, 0.85, u);
        float phY = smoothstep(0.48, 0.52, v) * smoothstep(0.58, 0.54, v);
        continent += phX * phY * 0.7;
        
        // POLOS
        float antY = smoothstep(0.0, 0.1, v);
        continent += antY * 0.85;
        
        float arcY = smoothstep(0.95, 0.9, v);
        continent += arcY * 0.6;
        
        return clamp(continent, 0.0, 1.0);
      }
      
      void main() {
        float continentMask = getContinentMask(vPosition);
        
        float edgeNoise = snoise(vPosition * 10.0) * 0.12;
        continentMask = smoothstep(0.15, 0.45, continentMask + edgeNoise);
        
        vec3 oceanBright = vec3(1.0, 0.4, 0.0);
        vec3 oceanDark = vec3(0.85, 0.2, 0.0);
        vec3 continentLight = vec3(0.55, 0.18, 0.02);
        vec3 continentDark = vec3(0.3, 0.1, 0.0);
        vec3 lavaHot = vec3(1.0, 0.95, 0.3);
        vec3 lavaGlow = vec3(1.0, 0.55, 0.0);
        
        float flow1 = snoise(vPosition * 4.0 + vec3(time * 0.12, time * 0.08, time * 0.1));
        float flow2 = snoise(vPosition * 6.0 + vec3(-time * 0.08, time * 0.15, -time * 0.06));
        float flowIntensity = (flow1 + flow2) * 0.5 + 0.5;
        
        float cracks = abs(snoise(vPosition * 14.0 + time * 0.15));
        cracks = 1.0 - smoothstep(0.0, 0.06, cracks);
        
        float hotSpots = snoise(vPosition * 6.0 + time * 0.25);
        hotSpots = pow(max(hotSpots, 0.0), 4.0);
        
        vec3 oceanColor = mix(oceanDark, oceanBright, flowIntensity);
        oceanColor = mix(oceanColor, lavaHot, cracks * 0.85);
        oceanColor = mix(oceanColor, lavaHot, hotSpots * 0.6);
        
        float detail = snoise(vPosition * 18.0) * 0.5 + 0.5;
        vec3 landColor = mix(continentDark, continentLight, detail);
        
        float landCracks = abs(snoise(vPosition * 22.0 + time * 0.08));
        landCracks = 1.0 - smoothstep(0.0, 0.04, landCracks);
        landColor = mix(landColor, lavaGlow, landCracks * 0.7);
        
        vec3 color = mix(oceanColor, landColor, continentMask);
        
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
        color += lavaGlow * fresnel * 0.45;
        
        // PULSO DE LUZ RÁPIDO
        float pulse1 = sin(time * 8.0) * 0.15;
        float pulse2 = sin(time * 12.0) * 0.1;
        float pulse3 = sin(time * 3.0) * 0.08;
        float combinedPulse = 1.0 + pulse1 + pulse2 + pulse3;
        
        color *= combinedPulse * lightPulse;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const globeGeometry = new THREE.SphereGeometry(1, 128, 128)
    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        time: { value: 0 },
        lightPulse: { value: 1.0 }
      },
      vertexShader: globeVertexShader,
      fragmentShader: globeFragmentShader,
    })
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    globe.rotation.x = 0.25
    scene.add(globe)

    // Atmósfera
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        time: { value: 0 },
        lightPulse: { value: 1.0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float lightPulse;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glowColor = vec3(1.0, 0.42, 0.0);
          float pulse = sin(time * 8.0) * 0.2 + sin(time * 12.0) * 0.15 + 0.85;
          gl_FragColor = vec4(glowColor * lightPulse, intensity * 0.6 * pulse * lightPulse);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // PALABRAS DE LAVA
    const words = new THREE.Group()
    scene.add(words)
    wordsRef.current = words

    interface WordData {
      mesh: THREE.Mesh
      velocity: THREE.Vector3
      rotationSpeed: THREE.Vector3
      life: number
      maxLife: number
      text: string
      baseScale: number
    }
    
    const wordDataArray: WordData[] = []
    
    const spawnWord = () => {
      const text = LAVA_WORDS[Math.floor(Math.random() * LAVA_WORDS.length)]
      const texture = createTextTexture(text)
      
      const textWidth = 0.3 + (text.length * 0.07)
      const geometry = new THREE.PlaneGeometry(textWidth, 0.15)
      
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      
      const wordMesh = new THREE.Mesh(geometry, material)
      
      // La mayoría salen del frente del globo (hacia la cámara) para llenar la pantalla
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.6 // 0 a ~108° = frente del globo (z positivo)
      const r = 1.1
      
      wordMesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
      
      wordMesh.lookAt(wordMesh.position.clone().multiplyScalar(2))
      
      const baseScale = 0.7 + Math.random() * 0.4
      wordMesh.scale.setScalar(baseScale)
      
      // Velocidad hacia la cámara / bordes (despacio)
      const velocity = wordMesh.position.clone().normalize().multiplyScalar(0.024 + Math.random() * 0.016)
      velocity.x += (Math.random() - 0.5) * 0.008
      velocity.y += (Math.random() - 0.5) * 0.008
      velocity.z += (Math.random() - 0.5) * 0.008
      
      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.04
      )
      
      words.add(wordMesh)
      
      wordDataArray.push({
        mesh: wordMesh,
        velocity,
        rotationSpeed,
        life: 0,
        maxLife: 180 + Math.random() * 80,
        text,
        baseScale,
      })
    }

    // Chispas
    const sparkGeometry = new THREE.BufferGeometry()
    const sparkCount = 350
    const sparkPositions = new Float32Array(sparkCount * 3)
    const sparkVelocities: number[] = []
    
    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.03
      
      sparkPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      sparkPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      sparkPositions[i * 3 + 2] = r * Math.cos(phi)
      
      sparkVelocities.push(
        (Math.random() - 0.5) * 0.03,
        Math.random() * 0.035,
        (Math.random() - 0.5) * 0.03
      )
    }
    
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3))
    
    const sparkMaterial = new THREE.PointsMaterial({
      color: 0xffbb00,
      size: 0.022,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
    
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial)
    scene.add(sparks)

    // Iluminación
    scene.add(new THREE.AmbientLight(0xff6b35, 0.5))
    
    const light1 = new THREE.PointLight(0xff4500, 3, 10)
    light1.position.set(3, 2, 3)
    scene.add(light1)
    
    const light2 = new THREE.PointLight(0xffaa00, 2, 10)
    light2.position.set(-2, -1, 3)
    scene.add(light2)

    // Animación
    let spawnTimer = 0
    
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      timeRef.current += 0.016

      // Pulso de luz rápido
      const basePulse = 1.0
      const fastPulse = Math.sin(timeRef.current * 10) * 0.2
      const veryFastPulse = Math.sin(timeRef.current * 15) * 0.15
      const randomFlicker = (Math.random() - 0.5) * 0.1
      lightIntensityRef.current = basePulse + fastPulse + veryFastPulse + randomFlicker

      if (globe.material instanceof THREE.ShaderMaterial) {
        globe.material.uniforms.time.value = timeRef.current
        globe.material.uniforms.lightPulse.value = lightIntensityRef.current
      }
      if (atmosphere.material instanceof THREE.ShaderMaterial) {
        atmosphere.material.uniforms.time.value = timeRef.current
        atmosphere.material.uniforms.lightPulse.value = lightIntensityRef.current
      }

      light1.intensity = 3 * lightIntensityRef.current
      light2.intensity = 2 * lightIntensityRef.current

      globe.rotation.y += 0.0035
      atmosphere.rotation.y += 0.0025

      // Spawn palabras más frecuente
      spawnTimer++
      if (spawnTimer > 12 && wordDataArray.length < 40) {
        spawnWord()
        spawnTimer = 0
      }

      // Actualizar palabras
      for (let i = wordDataArray.length - 1; i >= 0; i--) {
        const wd = wordDataArray[i]
        wd.life++
        
        wd.mesh.position.add(wd.velocity)
        wd.mesh.rotation.z += wd.rotationSpeed.z
        
        // Billboard - siempre mira a la cámara
        wd.mesh.lookAt(camera.position)
        
        // Escalar mientras se aleja – crece mucho hasta llenar la pantalla
        const lifeRatio = wd.life / wd.maxLife
        const growScale = 1 + lifeRatio * 6 // Crece hasta 7x, ocupa toda la vista
        wd.mesh.scale.setScalar(wd.baseScale * growScale)
        
        // Fade out
        if (lifeRatio > 0.6 && wd.mesh.material instanceof THREE.MeshBasicMaterial) {
          wd.mesh.material.opacity = 1 - ((lifeRatio - 0.6) / 0.4)
        }
        
        if (wd.life > wd.maxLife) {
          words.remove(wd.mesh)
          wd.mesh.geometry.dispose()
          if (wd.mesh.material instanceof THREE.Material) {
            wd.mesh.material.dispose()
          }
          wordDataArray.splice(i, 1)
        }
      }

      // Actualizar chispas
      const sp = sparks.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < sparkCount; i++) {
        sp[i * 3] += sparkVelocities[i * 3]
        sp[i * 3 + 1] += sparkVelocities[i * 3 + 1]
        sp[i * 3 + 2] += sparkVelocities[i * 3 + 2]
        
        const dist = Math.sqrt(sp[i * 3] ** 2 + sp[i * 3 + 1] ** 2 + sp[i * 3 + 2] ** 2)
        
        if (dist > 5) {
          const t = Math.random() * Math.PI * 2
          const p = Math.acos(2 * Math.random() - 1)
          const r = 1.03
          sp[i * 3] = r * Math.sin(p) * Math.cos(t)
          sp[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
          sp[i * 3 + 2] = r * Math.cos(p)
        }
      }
      sparks.geometry.attributes.position.needsUpdate = true
      sparks.rotation.y += 0.0015

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      
      wordDataArray.forEach(wd => {
        wd.mesh.geometry.dispose()
        if (wd.mesh.material instanceof THREE.Material) {
          wd.mesh.material.dispose()
        }
      })
      
      renderer.dispose()
      globeGeometry.dispose()
      globeMaterial.dispose()
      atmosphereGeometry.dispose()
      atmosphereMaterial.dispose()
      sparkGeometry.dispose()
      sparkMaterial.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute inset-0 transition-all duration-700"
      style={{
        opacity: Math.max(opacity, 0.1),
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 0 100px rgba(255, 107, 53, 0.7)) drop-shadow(0 0 200px rgba(255, 69, 0, 0.5))`,
      }}
    />
  )
}

export function Hero() {
  const scrollProgress = useScrollProgress()
  const floatParticles = useParticlePositions(40)
  const explosionParticles = useExplosionPositions(60)
  
  const sphereOpacity = scrollProgress < 0.5 ? Math.max(1 - (scrollProgress * 2), 0.3) : 0
  const sphereScale = 1 + (scrollProgress * 0.5)
  const exploded = scrollProgress >= 0.5
  
  const bgGradient = exploded
    ? 'from-orange-500/20 to-gray-900'
    : 'from-gray-900 via-gray-800 to-gray-900'
  
  return (
    <section className={`relative min-h-screen overflow-hidden transition-all duration-1000 bg-gradient-to-b ${bgGradient}`}>
      {/* GLOBO - OCUPA TODO EL HERO */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
        {!exploded ? (
          <LavaGlobe opacity={sphereOpacity} scale={sphereScale} />
        ) : (
          <div className="relative w-full h-full">
            {explosionParticles.map((pos, i) => (
              <div
                key={i}
                className="absolute font-bold"
                style={{
                  top: '50%',
                  left: '50%',
                  fontSize: `${16 + Math.random() * 24}px`,
                  color: '#ffaa00',
                  textShadow: '0 0 20px #ff4400, 0 0 40px #ff6600, 0 0 60px #ff3300',
                  animation: `explode 2.5s ease-out ${i * 0.03}s forwards`,
                  '--tx': `${pos.tx}vw`,
                  '--ty': `${pos.ty}vh`,
                } as React.CSSProperties}
              >
                {pos.word}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <HeroContent />
      </div>
      
      {floatParticles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {floatParticles.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
                background: 'radial-gradient(circle, #ffcc00, #ff4500)',
                boxShadow: '0 0 8px #ff4500, 0 0 15px #ff6b35',
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
