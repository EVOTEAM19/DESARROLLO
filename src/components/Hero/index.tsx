'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { HeroContent } from './HeroContent'

const TEXTURE_SRC = '/generated/earth-equirect.jpg'
const COUNT = 40000 // miles de trozos
const R = 1.0
const CAM_Z = 3.4

const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Globo terráqueo 3D real hecho de miles de trozos (puntos en el espacio) que,
 * al hacer scroll, convergen desde una nube dispersa hasta formar el planeta
 * redondo, que gira lentamente. Sin sombras: lienzo transparente.
 */
function useEarthGlobe(progress: MotionValue<number>) {
  const mountRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let raf = 0
    let disposed = false
    let ready = false

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = CAM_Z

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    const pr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(pr)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    group.rotation.z = 0.16 // ligera inclinación tipo eje terrestre
    scene.add(group)

    // Buffers
    const positions = new Float32Array(COUNT * 3)
    const aColor = new Float32Array(COUNT * 3)
    const aSize = new Float32Array(COUNT)
    const starts = new Float32Array(COUNT * 3)
    const finals = new Float32Array(COUNT * 3)
    const delays = new Float32Array(COUNT)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1))

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: true,
      depthWrite: true,
      uniforms: { uProj: { value: 1000 }, uOpacity: { value: 1 } },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        uniform float uProj;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uProj / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;
        void main() {
          // trozo redondo, limpio, sin borde oscuro
          vec2 c = gl_PointCoord - 0.5;
          float r2 = dot(c, c);
          if (r2 > 0.25) discard;            // círculo limpio
          float hi = 1.0 + (0.18 - r2 * 0.7); // leve realce central (brillo de cuenta), nunca oscuro
          gl_FragColor = vec4(vColor * clamp(hi, 1.0, 1.16), uOpacity);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    points.visible = false // hasta que cargue la textura (evita parpadeo en el centro)
    group.add(points)

    // Planeta LISO (esfera con textura) al que se funden los trozos -> queda perfecto
    const sphereGeo = new THREE.SphereGeometry(0.998, 128, 96)
    let sphereMat: THREE.ShaderMaterial | null = null
    let sphere: THREE.Mesh | null = null
    let sphereTex: THREE.Texture | null = null

    // Carga de textura -> muestreo de color por píxel
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (disposed) return
      const cv = document.createElement('canvas')
      const tw = (cv.width = img.width)
      const th = (cv.height = img.height)
      const ctx = cv.getContext('2d', { willReadFrequently: true })!
      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(0, 0, tw, th).data

      const golden = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        // Distribución uniforme en esfera (fibonacci)
        const y = 1 - (i / (COUNT - 1)) * 2
        const rad = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = golden * i
        const x = Math.cos(theta) * rad
        const z = Math.sin(theta) * rad

        finals[ix] = x * R
        finals[ix + 1] = y * R
        finals[ix + 2] = z * R

        // UV equirectangular desde la dirección
        const lon = Math.atan2(z, x)
        const lat = Math.asin(Math.max(-1, Math.min(1, y)))
        const u = 0.5 - lon / (Math.PI * 2)
        const v = 0.5 - lat / Math.PI
        const px = Math.min(tw - 1, Math.max(0, (u * tw) | 0))
        const py = Math.min(th - 1, Math.max(0, (v * th) | 0))
        const p = (py * tw + px) * 4
        // realce suave (un poco más vivo sobre fondo blanco, tono Apple)
        let r = data[p] / 255
        let g = data[p + 1] / 255
        let b = data[p + 2] / 255
        r = Math.min(1, r * 1.12 + 0.02)
        g = Math.min(1, g * 1.15 + 0.04)
        b = Math.min(1, b * 1.2 + 0.09)
        aColor[ix] = r
        aColor[ix + 1] = g
        aColor[ix + 2] = b

        // trozos solapados -> planeta sólido sin huecos blancos
        aSize[i] = 0.020 + Math.random() * 0.012

        // Nube de partida: cáscara esférica dispersa que llena la pantalla
        let dx = Math.random() * 2 - 1
        let dy = Math.random() * 2 - 1
        let dz = Math.random() * 2 - 1
        const dl = Math.hypot(dx, dy, dz) || 1
        const sr = R * (1.5 + Math.random() * 1.1)
        starts[ix] = (dx / dl) * sr
        starts[ix + 1] = (dy / dl) * sr
        starts[ix + 2] = (dz / dl) * sr

        delays[i] = Math.random() * 0.28

        // posición inicial = dispersa (se ven los trozos al entrar)
        positions[ix] = starts[ix]
        positions[ix + 1] = starts[ix + 1]
        positions[ix + 2] = starts[ix + 2]
      }

      geometry.attributes.position.needsUpdate = true
      geometry.attributes.aColor.needsUpdate = true
      geometry.attributes.aSize.needsUpdate = true
      points.visible = true

      // Esfera lisa con la MISMA textura (alineada con los trozos) + limbo + atmósfera
      sphereTex = new THREE.Texture(img)
      sphereTex.colorSpace = THREE.NoColorSpace
      sphereTex.wrapS = THREE.RepeatWrapping
      sphereTex.needsUpdate = true
      sphereMat = new THREE.ShaderMaterial({
        transparent: true,
        depthTest: true,
        depthWrite: true,
        uniforms: { map: { value: sphereTex }, uOpacity: { value: 0 }, uBoost: { value: 1.12 } },
        vertexShader: `
          varying vec2 vUv;
          varying float vNz;
          void main() {
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vec3 n = normalize(normalMatrix * normal);
            vNz = max(dot(n, normalize(-mv.xyz)), 0.0);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          uniform float uOpacity;
          uniform float uBoost;
          varying vec2 vUv;
          varying float vNz;
          void main() {
            vec3 col = texture2D(map, vUv).rgb * uBoost;
            float f = pow(1.0 - vNz, 3.0);      // borde (limbo)
            float k = f * 0.6;
            col = col * (1.0 - k) + col * 0.78 * k;   // oscurece levemente el borde -> 3D
            col += vec3(0.10, 0.32, 0.75) * (f * 0.6); // atmósfera azul en el borde
            gl_FragColor = vec4(col, uOpacity);
          }
        `,
      })
      sphere = new THREE.Mesh(sphereGeo, sphereMat)
      sphere.renderOrder = -1
      sphere.visible = false
      group.add(sphere)

      ready = true
    }
    img.src = TEXTURE_SRC

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const vFOV = THREE.MathUtils.degToRad(camera.fov)
      const visH = 2 * Math.tan(vFOV / 2) * CAM_Z
      const visW = visH * camera.aspect
      // Escala el globo para que SIEMPRE quepa entero (ancho y alto) con margen,
      // y lo baja un poco para dejar sitio al texto y no cortarse por arriba.
      const gr = Math.min(0.43 * visW, 0.33 * visH)
      group.scale.setScalar(gr)
      group.position.y = -0.07 * visH
      // tamaño de punto en píxeles físicos -> aSize es tamaño "de mundo"
      material.uniforms.uProj.value = (h * renderer.getPixelRatio()) / (2 * Math.tan(vFOV / 2))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const clock = new THREE.Clock()
    let lastT = -1
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)

      if (ready) {
        const sp = progressRef.current.get()
        // Montaje completo a 0.6 del scroll
        const globalT = clamp01(sp / 0.6)
        if (Math.abs(globalT - lastT) > 0.0004) {
          lastT = globalT
          const pos = geometry.attributes.position.array as Float32Array
          for (let i = 0; i < COUNT; i++) {
            const ix = i * 3
            let lt = (globalT - delays[i]) / 0.72
            lt = lt < 0 ? 0 : lt > 1 ? 1 : lt
            const e = easeInOutCubic(lt)
            pos[ix] = starts[ix] + (finals[ix] - starts[ix]) * e
            pos[ix + 1] = starts[ix + 1] + (finals[ix + 1] - starts[ix + 1]) * e
            pos[ix + 2] = starts[ix + 2] + (finals[ix + 2] - starts[ix + 2]) * e
          }
          geometry.attributes.position.needsUpdate = true
        }

        // Fundido: trozos -> planeta liso perfecto (0.6 .. 0.76)
        const partOp = 1 - clamp01((sp - 0.62) / 0.14)
        material.uniforms.uOpacity.value = partOp
        material.depthWrite = sp < 0.61
        points.visible = partOp > 0.002
        if (sphereMat && sphere) {
          const so = clamp01((sp - 0.6) / 0.14)
          sphereMat.uniforms.uOpacity.value = so
          sphere.visible = so > 0.001
        }

        // gira siempre; un poco más mientras se monta
        group.rotation.y += dt * (0.16 + (1 - globalT) * 0.12)
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      sphereGeo.dispose()
      sphereMat?.dispose()
      sphereTex?.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return mountRef
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const mountRef = useEarthGlobe(scrollYProgress)

  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -40])
  const mktOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1])
  const mktY = useTransform(scrollYProgress, [0.8, 0.92], [28, 0])
  const glowOpacity = useTransform(scrollYProgress, [0.58, 0.78], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" />

        {/* halo atmosférico (sin sombra gris) */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78vh] w-[78vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.16),rgba(10,132,255,0.05)_45%,transparent_66%)] blur-2xl"
        />

        {/* Lienzo del globo 3D */}
        <div ref={mountRef} className="absolute inset-0" />

        {/* Titular inicial con halo blanco localizado (se ven los trozos alrededor) */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-x-0 top-0 z-20 px-4 pt-[7rem] sm:pt-28">
          <div className="relative mx-auto max-w-4xl">
            <div className="pointer-events-none absolute inset-x-[-12%] -top-[18%] bottom-[-42%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95),rgba(255,255,255,0.78)_42%,transparent_70%)]" />
            <div className="relative">
              <HeroContent />
            </div>
          </div>
        </motion.div>

        {/* Remate de marketing al formarse la Tierra */}
        <motion.div style={{ opacity: mktOpacity, y: mktY }} className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-[7rem] text-center sm:pt-28">
          <div className="relative mx-auto max-w-3xl">
            <div className="pointer-events-none absolute inset-x-[-14%] -top-[40%] bottom-[-60%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92),rgba(255,255,255,0.6)_45%,transparent_72%)]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sin fronteras</p>
              <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-gray-900 sm:text-6xl text-balance">
                Tu idea no tiene límites.<br />
                <span className="text-gradient">Tu software, tampoco.</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Pista de scroll */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-[0.18em]">Desliza para crear un mundo</span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-300 p-1">
            <span className="h-2 w-1 rounded-full bg-blue-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
