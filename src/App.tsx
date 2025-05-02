import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import useSoundEffect from './hooks/useSoundEffect'
import Header from './components/layout/Header'
import ProjectDetail from './components/ProjectDetail'
import Footer from './components/layout/Footer'
import SEOHead from './components/SEOHead'
import './i18n/config'

// Layout component to wrap the main content
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Technologies from './components/sections/Technologies'
import Contact from './components/sections/Contact'
import { createContext } from 'react'

// Crear contexto de sonido
interface SoundContextType {
  play: () => void
}

export const SoundContext = createContext<SoundContextType>({
  play: () => {} // No-op default function
})

// Layout component to wrap the main content
const HomePage = () => {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />  
      <Technologies />
      <Contact />
    </>
  )
}

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-xl mt-4 mb-8">Página no encontrada</p>
      <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Volver al inicio
      </a>
    </div>
  </div>
)

function App() {
  const [_isFirstLoad, setIsFirstLoad] = useState(true)
  const { play, SoundTrigger } = useSoundEffect()

  // Disable loader after initial load
  useEffect(() => {
    setTimeout(() => {
      setIsFirstLoad(false)
    }, 0)
  }, [])

  return (
    <SoundContext.Provider value={{ play }}>
      <Router>
        <div className="app min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <SEOHead />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <SoundTrigger />
    </SoundContext.Provider>
  )
}

export default App
