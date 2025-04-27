import { useTranslation } from 'react-i18next'

const Services = () => {
  const { t } = useTranslation()

  const services = [
    {
      title: t('services.webDev.title'),
      description: t('services.webDev.description'),
      icon: '/icons/web-dev.svg',  // Modern web development icon
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js']
    },
    {
      title: t('services.mobileDev.title'),
      description: t('services.mobileDev.description'),
      icon: '/icons/mobile-dev.svg',  // Mobile development icon
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      title: t('services.uiDesign.title'),
      description: t('services.uiDesign.description'),
      icon: '/icons/ui-design.svg',  // UI/UX design icon
      technologies: ['Figma', 'Adobe XD', 'Tailwind', 'Material-UI']
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <img src={service.icon} alt={service.title} className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 