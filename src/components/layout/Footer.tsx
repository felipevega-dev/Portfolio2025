import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// Sonido de subida de nivel
const LEVEL_UP_SOUND = 'https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3'

// Items del inventario serán proyectos
const INVENTORY_ITEMS = [
  { id: 1, name: 'Portfolio', image: '/projects/portfolio.jpg', url: '/projects/portfolio' },
  { id: 2, name: 'E-commerce', image: '/projects/ecommerce.jpg', url: '/projects/ecommerce' },
  { id: 3, name: 'Dashboard', image: '/projects/dashboard.jpg', url: '/projects/dashboard' },
  { id: 4, name: 'Mobile App', image: '/projects/mobile.jpg', url: '/projects/mobile' },
  { id: 5, name: 'API', image: '/projects/api.jpg', url: '/projects/api' },
  { id: 6, name: 'Game', image: '/projects/game.jpg', url: '/projects/game' },
  { id: 7, name: 'Blog', image: '/projects/blog.jpg', url: '/projects/blog' },
  { id: 8, name: 'ML Project', image: '/projects/ml.jpg', url: '/projects/ml' }
]

// Tipos para las estadísticas
type Stats = {
  scrollSpeed: number;
  cursorSize: number;
  cursorSpeed: number;
  clickPower: number;
}

const Footer = () => {
  const { t } = useTranslation()
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [currentXP, setCurrentXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const levelUpSound = useRef<HTMLAudioElement | null>(null)
  
  // Estadísticas del jugador
  const [stats, setStats] = useState<Stats>({
    scrollSpeed: 1,
    cursorSize: 1,
    cursorSpeed: 1,
    clickPower: 1
  })
  
  // Puntos de estadística disponibles
  const [statPoints, setStatPoints] = useState(0)

  // Calcular XP máximo basado en nivel (fórmula exponencial común en RPGs)
  const maxXP = Math.floor(100 * Math.pow(1.5, level - 1))

  // Inicializar sonido
  useEffect(() => {
    levelUpSound.current = new Audio(LEVEL_UP_SOUND)
    levelUpSound.current.volume = 0.2 // Volumen bajo para no ser intrusivo
    
    // Aplicar estadísticas al DOM
    document.documentElement.style.setProperty('--cursor-size', `${stats.cursorSize}rem`)
    document.documentElement.style.setProperty('--scroll-multiplier', `${stats.scrollSpeed}`)
    
    return () => {
      if (levelUpSound.current) {
        levelUpSound.current.pause()
        levelUpSound.current = null
      }
    }
  }, [])

  // Efecto para aplicar cambios de estadísticas
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-size', `${stats.cursorSize}rem`)
    document.documentElement.style.setProperty('--scroll-multiplier', `${stats.scrollSpeed}`)
  }, [stats])

  // Sistema de XP y subida de nivel
  useEffect(() => {
    let lastInteraction = Date.now()
    let xpInterval: number

    const addXP = (amount: number) => {
      setCurrentXP(prev => {
        const newXP = prev + amount
        const currentMaxXP = Math.floor(100 * Math.pow(1.5, level - 1))
        
        // Subir de nivel si alcanzamos el máximo de XP
        if (newXP >= currentMaxXP) {
          const remainingXP = newXP - currentMaxXP
          setLevel(prevLevel => prevLevel + 1)
          setStatPoints(prev => prev + 3) // Dar puntos de estadística al subir de nivel
          setShowLevelUp(true)
          
          // Reproducir sonido de subida de nivel
          if (levelUpSound.current) {
            levelUpSound.current.currentTime = 0
            levelUpSound.current.play().catch(e => console.error("Error reproduciendo sonido:", e))
          }
          
          // Ocultar notificación después de 3 segundos
          setTimeout(() => setShowLevelUp(false), 3000)
          
          return remainingXP
        }
        
        return newXP
      })
    }

    // Eventos que dan XP
    const xpEvents = {
      scroll: () => addXP(1 * stats.scrollSpeed),
      click: () => addXP(5 * stats.clickPower),
      mousemove: () => {
        if (Date.now() - lastInteraction > 2000) {
          addXP(1)
          lastInteraction = Date.now()
        }
      }
    }

    // Agregar event listeners
    Object.entries(xpEvents).forEach(([event, handler]) => {
      window.addEventListener(event, handler)
    })

    // XP pasivo cada 5 segundos
    xpInterval = setInterval(() => {
      addXP(2)
    }, 5000)

    return () => {
      Object.entries(xpEvents).forEach(([event, handler]) => {
        window.removeEventListener(event, handler)
      })
      clearInterval(xpInterval)
    }
  }, [level, stats])

  // Incrementar una estadística
  const incrementStat = (stat: keyof Stats) => {
    if (statPoints > 0) {
      setStats(prev => ({
        ...prev,
        [stat]: prev[stat] + 0.1
      }))
      setStatPoints(prev => prev - 1)
    }
  }

  const socialLinks = [
    { name: 'GitHub', icon: '🗡️', url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: '🛡️', url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', icon: '📜', url: 'https://twitter.com/yourusername' }
  ]

  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2">
      {/* Sonido de nivel */}
      <audio src={LEVEL_UP_SOUND} ref={levelUpSound} />
      
      {/* Notificación de subida de nivel */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            className="fixed bottom-20 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold">{t('footer.levelUp')}</p>
                <p>{t('footer.newLevel', { level })}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto">
        {/* XP Bar */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 font-bold">Lvl {level}</span>
          <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentXP / maxXP) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-sm text-gray-400">{currentXP}/{maxXP} XP</span>
        </div>

        {/* RPG Menu Bar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rpg-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-xs">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button
              onClick={() => {
                setIsInventoryOpen(!isInventoryOpen)
                setIsStatsOpen(false)
              }}
              className="rpg-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">🎒</span>
              <span className="text-xs">{t('footer.inventory')}</span>
            </motion.button>
            <motion.button
              onClick={() => {
                setIsStatsOpen(!isStatsOpen)
                setIsInventoryOpen(false)
              }}
              className="rpg-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">📊</span>
              <span className="text-xs">{t('footer.stats')}</span>
            </motion.button>
            <motion.button
              className="rpg-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">📋</span>
              <span className="text-xs">{t('footer.quests')}</span>
            </motion.button>
          </div>
        </div>

        {/* Inventory Panel - Ahora más compacto y con proyectos */}
        {isInventoryOpen && (
          <motion.div
            className="fixed bottom-14 left-0 right-0 bg-gray-800/95 backdrop-blur-sm p-4 border-t-2 border-indigo-500 z-50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '160px', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-8 gap-3 h-full overflow-y-auto">
              {INVENTORY_ITEMS.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  className="relative aspect-square bg-gray-700/50 rounded-lg border-2 border-gray-600 hover:border-indigo-500 transition-colors overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 p-1 text-center text-xs font-medium">
                    {item.name}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Panel */}
        {isStatsOpen && (
          <motion.div
            className="fixed bottom-14 left-0 right-0 bg-gray-800/95 backdrop-blur-sm p-4 border-t-2 border-indigo-500 z-50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '160px', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="container mx-auto h-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{t('footer.stats')}</h3>
                <div className="bg-indigo-500/20 px-2 py-1 rounded-md text-sm">
                  {t('footer.statPoints')}: <span className="font-bold text-yellow-400">{statPoints}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{t('footer.scrollSpeed')}</span>
                    <span className="text-indigo-400 font-bold">{stats.scrollSpeed.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full mt-1 mb-1">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(stats.scrollSpeed / 5) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    className="w-full text-center text-xs bg-indigo-600/30 hover:bg-indigo-600/50 py-1 rounded disabled:opacity-50"
                    onClick={() => incrementStat('scrollSpeed')}
                    disabled={statPoints <= 0}
                  >
                    +
                  </button>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{t('footer.cursorSize')}</span>
                    <span className="text-indigo-400 font-bold">{stats.cursorSize.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full mt-1 mb-1">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(stats.cursorSize / 5) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    className="w-full text-center text-xs bg-indigo-600/30 hover:bg-indigo-600/50 py-1 rounded disabled:opacity-50"
                    onClick={() => incrementStat('cursorSize')}
                    disabled={statPoints <= 0}
                  >
                    +
                  </button>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{t('footer.cursorSpeed')}</span>
                    <span className="text-indigo-400 font-bold">{stats.cursorSpeed.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full mt-1 mb-1">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(stats.cursorSpeed / 5) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    className="w-full text-center text-xs bg-indigo-600/30 hover:bg-indigo-600/50 py-1 rounded disabled:opacity-50"
                    onClick={() => incrementStat('cursorSpeed')}
                    disabled={statPoints <= 0}
                  >
                    +
                  </button>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{t('footer.clickPower')}</span>
                    <span className="text-indigo-400 font-bold">{stats.clickPower.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full mt-1 mb-1">
                    <div 
                      className="h-full bg-indigo-500 rounded-full" 
                      style={{ width: `${(stats.clickPower / 5) * 100}%` }}
                    ></div>
                  </div>
                  <button 
                    className="w-full text-center text-xs bg-indigo-600/30 hover:bg-indigo-600/50 py-1 rounded disabled:opacity-50"
                    onClick={() => incrementStat('clickPower')}
                    disabled={statPoints <= 0}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </footer>
  )
}

export default Footer 