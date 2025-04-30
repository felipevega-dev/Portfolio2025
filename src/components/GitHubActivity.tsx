import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa'
import { useTheme } from '../context'

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

interface GitHubActivityProps {
  username: string
  limit?: number
}

const GitHubActivity = ({ username, limit = 6 }: GitHubActivityProps) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Usar el token de GitHub si está disponible para evitar límites de tasa
        const headers: Record<string, string> = {}
        
        if (import.meta.env.VITE_GITHUB_API_TOKEN) {
          headers.Authorization = `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        }
        
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
          { headers }
        )
        
        if (!response.ok) {
          throw new Error(`Error fetching GitHub repos: ${response.status}`)
        }
        
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        setError('Failed to fetch GitHub repositories')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username, limit])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(isDarkMode ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center py-20">
          <FaSpinner className="text-4xl text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('common.loading')}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-6 text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            {t('common.retry')}
          </button>
        </div>
      </section>
    )
  }

  if (repos.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800/20">
        <div className="container mx-auto px-6 text-center py-20">
          <p className="text-gray-600 dark:text-gray-400">No repositories found for {username}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaGithub className="text-3xl mr-3 text-gray-800 dark:text-gray-200" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('github.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    {repo.name}
                    <FaExternalLinkAlt className="ml-2 text-sm opacity-70" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {t('github.lastUpdate')}: {formatDate(repo.updated_at)}
                  </p>
                </div>
                {repo.language && (
                  <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {repo.description || t('github.noDescription')}
              </p>
              
              <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <FaStar className="mr-1" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center">
                  <FaCodeBranch className="mr-1" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity 