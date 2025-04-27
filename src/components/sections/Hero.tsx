import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text, useTexture } from '@react-three/drei'
import { useTranslation } from 'react-i18next'
import { useSpring } from '@react-spring/web'
import Particles from '@tsparticles/react'
import { loadSlim } from 'tsparticles-slim'
import { useCallback, useRef } from 'react'
import * as THREE from 'three'
import type { Engine, ISourceOptions } from '@tsparticles/engine'

const CodeCube = () => {
  const [springs] = useSpring(() => ({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { mass: 2, tension: 170, friction: 12 }
  }))

  // Create a texture with code snippets
  const texture = useTexture('/code-texture.png')

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh scale={new THREE.Vector3().setScalar(springs.scale.get())}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          map={texture}
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#4F46E5"
        />
      </mesh>
      <Text
        position={[0, 0, 1.1]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {"<Developer/>"}
      </Text>
    </Float>
  )
}

const Hero = () => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesOptions: ISourceOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#4F46E5"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#4F46E5",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce"
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab"
        },
        onClick: {
          enable: true,
          mode: "push"
        }
      }
    },
    retina_detect: true
  }

  return (
    <section ref={containerRef} className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Particles Background */}
      <Particles className="absolute inset-0" init={particlesInit} options={particlesOptions} />

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.greeting')}{' '}
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                animate={{ 
                  backgroundPosition: ["0%", "100%"],
                  filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                Felipe Vega
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.role')}
            </motion.p>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.a
                href="/CV-FelipeVega.pdf"
                className="relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-indigo-600 rounded-lg group focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-purple-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="relative">{t('hero.downloadCV')}</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="relative inline-flex items-center px-8 py-3 overflow-hidden border-2 border-indigo-600 rounded-lg group focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative group-hover:text-white">{t('hero.contact')}</span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          <div className="relative h-[400px] lg:h-[600px]">
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center lg:justify-end lg:pr-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative w-48 h-48">
                <img
                  src="/profile.jpg"
                  alt="Felipe Vega"
                  className="rounded-full object-cover w-full h-full border-4 border-indigo-600 shadow-lg"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-indigo-400"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <CodeCube />
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
              />
            </Canvas>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero 