import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import ProjectDetail from './components/ProjectDetail'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Technologies from './components/sections/Technologies'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import GitHubActivity from './components/GitHubActivity'
import SEOHead from './components/SEOHead'
import './i18n/config'

// Layout component to wrap the main content
const Layout = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <Skills />
        <Technologies />
        <Projects />
        <GitHubActivity username="felipevega-dev" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
