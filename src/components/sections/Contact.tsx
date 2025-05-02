import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaMapMarkerAlt, FaLaptopCode } from 'react-icons/fa'
import { MdEmail, MdSend } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { api } from '../../api' // Importamos la API

// Límites para prevenir spam
const SUBMISSION_LIMIT = 3; // Máximo número de envíos permitidos
const SUBMISSION_TIMEOUT = 60 * 60 * 1000; // 1 hora en milisegundos
const COOLDOWN_PERIOD = 60 * 1000; // 1 minuto en milisegundos

const Contact = () => {
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectScope: '',
    message: '',
    allowFollowUp: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [submissionCount, setSubmissionCount] = useState(0)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  const [cooldownActive, setCooldownActive] = useState(false)

  lastSubmissionTime
  // Cargar el contador de envíos al iniciar
  useEffect(() => {
    const storedCount = localStorage.getItem('submissionCount');
    const storedTime = localStorage.getItem('lastSubmissionTime');
    
    if (storedCount) {
      setSubmissionCount(parseInt(storedCount, 10));
    }
    
    if (storedTime) {
      const timeValue = parseInt(storedTime, 10);
      setLastSubmissionTime(timeValue);
      
      // Verificar si debemos resetear el contador (ha pasado más de SUBMISSION_TIMEOUT)
      if (Date.now() - timeValue > SUBMISSION_TIMEOUT) {
        resetSubmissionLimits();
      }
    }
  }, []);

  // Resetear los límites de envío
  const resetSubmissionLimits = () => {
    setSubmissionCount(0);
    setLastSubmissionTime(0);
    localStorage.removeItem('submissionCount');
    localStorage.removeItem('lastSubmissionTime');
  };

  // Actualizar los límites de envío
  const updateSubmissionLimits = () => {
    const newCount = submissionCount + 1;
    const now = Date.now();
    
    setSubmissionCount(newCount);
    setLastSubmissionTime(now);
    
    localStorage.setItem('submissionCount', newCount.toString());
    localStorage.setItem('lastSubmissionTime', now.toString());
    
    // Activar periodo de enfriamiento entre envíos
    setCooldownActive(true);
    setTimeout(() => {
      setCooldownActive(false);
    }, COOLDOWN_PERIOD);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Validar email
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = t('contact.form.validation.emailInvalid');
    }
    
    // Validar teléfono (opcional, pero si se proporciona debe ser válido)
    if (formData.phone && !formData.phone.match(/^\+?[0-9]{8,15}$/)) {
      errors.phone = t('contact.form.validation.phoneInvalid');
    }
    
    // Validar que el mensaje no esté vacío y tenga longitud suficiente
    if (formData.message.trim().length < 10) {
      errors.message = t('contact.form.validation.messageShort');
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar los límites de envío
    if (submissionCount >= SUBMISSION_LIMIT) {
      setValidationErrors({
        form: t('contact.form.validation.tooManySubmissions')
      });
      return;
    }
    
    if (cooldownActive) {
      setValidationErrors({
        form: t('contact.form.validation.tooFrequent')
      });
      return;
    }
    
    // Validar el formulario
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setValidationErrors({});

    try {
      // Añadir el idioma actual al envío
      await api.contact.sendMessage({
        ...formData,
        language: i18n.language // Enviamos el idioma actual
      });
      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '',
        projectType: '',
        projectScope: '',
        message: '',
        allowFollowUp: true
      });
      
      // Actualizar los límites de envío después de un envío exitoso
      updateSubmissionLimits();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = 
      e.target.type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : e.target.value
        
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
    
    // Limpiar error cuando el usuario corrige el campo
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  }

  const projectTypes = [
    { value: '', label: t('contact.form.projectType.select') },
    { value: 'website', label: t('contact.form.projectType.website') },
    { value: 'webapp', label: t('contact.form.projectType.webapp') },
    { value: 'ecommerce', label: t('contact.form.projectType.ecommerce') },
    { value: 'mobile', label: t('contact.form.projectType.mobile') },
    { value: 'other', label: t('contact.form.projectType.other') }
  ]

  const projectScopes = [
    { value: '', label: t('contact.form.projectScope.select') },
    { value: 'small', label: t('contact.form.projectScope.small') },
    { value: 'medium', label: t('contact.form.projectScope.medium') },
    { value: 'large', label: t('contact.form.projectScope.large') },
    { value: 'enterprise', label: t('contact.form.projectScope.enterprise') }
  ]

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
    }
  ]

  return (
    <section id="contact" className="py-20 mb-0 relative overflow-hidden">
     
      
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
              
              {/* Santiago, Chile map */}
              <div className="h-40 bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106551.15722433096!2d-70.6930362182308!3d-33.47278700311063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2ses!4v1624132241539!5m2!1ses!2ses" 
                  className="w-full h-full border-0" 
                  loading="lazy"
                  title="Santiago de Chile map"
                  style={{ filter: document.documentElement.classList.contains('dark') ? 'invert(0.9) hue-rotate(180deg)' : 'none' }}
                ></iframe>
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
              
              {validationErrors.form && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{validationErrors.form}</p>
                </div>
              )}
              
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
                    {validationErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                    )}
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
                      className={`w-full px-4 py-3 rounded-lg border ${
                        validationErrors.email 
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder="john@example.com"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        validationErrors.phone 
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder="+56 9 1234 5678"
                    />
                    {validationErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('contact.form.projectType.label')}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                    >
                      {projectTypes.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="projectScope" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.form.projectScope.label')}
                  </label>
                  <select
                    id="projectScope"
                    name="projectScope"
                    value={formData.projectScope}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
                  >
                    {projectScopes.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                    className={`w-full px-4 py-3 rounded-lg border ${
                      validationErrors.message 
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'
                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors resize-none`}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                  {validationErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>
                  )}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="allowFollowUp"
                      name="allowFollowUp"
                      type="checkbox"
                      checked={formData.allowFollowUp}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="allowFollowUp" className="font-medium text-gray-700 dark:text-gray-300">
                      {t('contact.form.allowFollowUp')}
                    </label>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {t('contact.form.allowFollowUpHint')}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || cooldownActive || submissionCount >= SUBMISSION_LIMIT}
                  className={`w-full py-3 px-6 text-white font-medium rounded-lg flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${(isSubmitting || cooldownActive || submissionCount >= SUBMISSION_LIMIT) ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.form.sending')}
                    </>
                  ) : cooldownActive ? (
                    t('contact.form.pleaseTryAgainSoon')
                  ) : submissionCount >= SUBMISSION_LIMIT ? (
                    t('contact.form.limitReached')
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