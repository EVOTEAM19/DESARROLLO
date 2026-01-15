'use client'

import { useState, useEffect } from 'react'
import { HeroContent } from './HeroContent'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// Generar valores aleatorios estables para partículas (solo en cliente)
function useParticlePositions(count: number) {
  const [positions, setPositions] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])
  
  useEffect(() => {
    // Solo generar en el cliente
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

// Generar posiciones de explosión estables
function useExplosionPositions(count: number) {
  const [positions, setPositions] = useState<Array<{ tx: number; ty: number }>>([])
  
  useEffect(() => {
    setPositions(
      Array.from({ length: count }, () => ({
        tx: Math.random() * 200 - 100,
        ty: Math.random() * 200 - 100,
      }))
    )
  }, [count])
  
  return positions
}

export function Hero() {
  const scrollProgress = useScrollProgress()
  const floatParticles = useParticlePositions(30)
  const explosionParticles = useExplosionPositions(50)
  
  // Opacidad de la esfera según scroll - SIEMPRE VISIBLE AL INICIO
  const sphereOpacity = scrollProgress < 0.5 ? Math.max(1 - (scrollProgress * 2), 0.3) : 0
  const sphereScale = 1 + (scrollProgress * 0.5)
  const exploded = scrollProgress >= 0.5
  
  // Cambiar fondo según scroll
  const bgGradient = exploded
    ? 'from-orange-500/20 to-gray-900'
    : 'from-gray-900 via-gray-800 to-gray-900'
  
  return (
    <section className={`relative min-h-screen overflow-hidden transition-all duration-1000 bg-gradient-to-b ${bgGradient}`}>
      {/* ===== ESFERA ANIMADA CSS ===== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {!exploded ? (
          // Esfera normal - SIEMPRE DEBE ESTAR VISIBLE
          <div
            className="relative w-[600px] h-[600px] transition-all duration-700 ease-out"
            style={{
              opacity: Math.max(sphereOpacity, 0.7), // Mínimo 70% de opacidad para que sea visible
              transform: `scale(${sphereScale})`,
            }}
          >
            {/* Glow exterior - MUY VISIBLE */}
            <div 
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.5) 0%, rgba(255, 107, 53, 0.3) 40%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
              }}
            />
            
            {/* Anillos orbitales - 3 anillos naranjas */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full border-2 border-orange-500/40 animate-spin-slow"
                style={{
                  animationDelay: `${i * 1}s`,
                  animationDuration: `${15 + i * 5}s`,
                  transform: `translate(-50%, -50%) scale(${1 + i * 0.15}) rotateX(60deg)`,
                }}
              />
            ))}
            
            {/* Esfera central - NÚCLEO NARANJA BRILLANTE */}
            <div 
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px]"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Wireframe effect - 3 capas de círculos naranjas */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/60 animate-spin-slow" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full border-2 border-orange-500/50 animate-spin-reverse" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-orange-500/40 animate-spin-slow" style={{ animationDuration: '25s' }} />
              
              {/* Núcleo brillante NARANJA */}
              <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 opacity-80 animate-pulse-glow shadow-2xl" 
                style={{
                  boxShadow: '0 0 60px rgba(255, 107, 53, 0.8), 0 0 120px rgba(255, 107, 53, 0.4)',
                }}
              />
              
              {/* Grid lines (wireframe) - 8 líneas naranjas */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-l-2 border-orange-500/30"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    borderRadius: '50%',
                  }}
                />
              ))}
            </div>
            
            {/* Partículas orbitando - 12 puntos naranjas */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-500 rounded-full animate-orbit"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${8 + (i % 3) * 2}s`,
                }}
              />
            ))}
          </div>
        ) : (
          // Partículas dispersas (explosión)
          <div className="relative w-full h-full">
            {explosionParticles.map((pos, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-500 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  animation: `explode 1s ease-out ${i * 0.02}s forwards`,
                  '--tx': `${pos.tx}vw`,
                  '--ty': `${pos.ty}vh`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Contenido del Hero */}
      <div className="relative z-10">
        <HeroContent />
      </div>
      
      {/* Partículas flotantes de fondo - 30 puntos naranjas pequeños */}
      {floatParticles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {floatParticles.map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
