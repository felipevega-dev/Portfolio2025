import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaLaptopCode } from 'react-icons/fa'
import { MdEmail, MdSend } from 'react-icons/md'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/felipevega-dev',
      icon: FaGithub,
      color: 'hover:bg-gray-800 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/felipevega-dev',
      icon: FaLinkedin,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/felipevega_dev',
      icon: FaTwitter,
      color: 'hover:bg-sky-500 hover:text-white'
    }
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-indigo-100/20 dark:from-transparent dark:via-indigo-950/20 dark:to-indigo-900/10"></div>
      
      {/* Blurred circles */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 bg-indigo-300/20 rounded-full filter blur-3xl dark:bg-indigo-700/20"></div>
      <div className="absolute bottom-1/4 -right-28 w-64 h-64 bg-purple-300/20 rounded-full filter blur-3xl dark:bg-purple-700/20"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
            {t('contact.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column with info cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Get in touch card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <MdEmail className="text-indigo-600 dark:text-indigo-400 mr-3 text-2xl" />
                {t('contact.getInTouch')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('contact.description')}
              </p>
              
              {/* Social links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Location card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 mr-3" />
                  {t('contact.location.title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2 flex items-start">
                  <span className="mr-2">📍</span>
                  {t('contact.location.based')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 flex items-start">
                  <FaLaptopCode className="mt-1 mr-2 text-indigo-500 dark:text-indigo-400" />
                  {t('contact.location.remote')}
                </p>
              </div>
              
              {/* Map image or graphic could go here */}
              <div className="h-40 bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/400x200?text=Santiago,+Chile"
                    alt="Map"
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.form.title')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 text-white font-medium rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <MdSend className="mr-2 text-lg" />
                      {t('contact.form.send')}
                    </>
                  )}
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 mt-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-green-700 text-sm font-medium flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {t('contact.form.success')}
                    </p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 mt-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-red-700 text-sm font-medium flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {t('contact.form.error')}
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact 