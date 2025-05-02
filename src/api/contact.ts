import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  projectScope?: string;
  message: string;
  allowFollowUp?: boolean;
  language?: string; // Para determinar el idioma de los textos
}

export async function handleContactForm(formData: ContactFormData) {
  // Validaciones adicionales de seguridad
  if (!formData.name || !formData.email || !formData.message) {
    throw new Error('All fields are required');
  }

  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Invalid email address');
  }

  // Validar teléfono si se proporciona
  if (formData.phone && !formData.phone.match(/^\+?[0-9]{8,15}$/)) {
    throw new Error('Invalid phone number');
  }

  // Protección anti-spam simple (se podría mejorar con captcha)
  if (formData.message.includes('http') || formData.message.toLowerCase().includes('viagra')) {
    throw new Error('Message appears to be spam');
  }

  // Determinar textos según idioma (por defecto español)
  const isEnglish = formData.language === 'en';
  
  const texts = {
    notProvided: isEnglish ? 'Not provided' : 'No proporcionado',
    notSpecified: isEnglish ? 'Not specified' : 'No especificado',
    yes: isEnglish ? 'Yes' : 'Sí',
    no: isEnglish ? 'No' : 'No'
  };

  // Mapear los tipos de proyecto a textos en español
  const getProjectTypeText = (type: string | undefined) => {
    if (!type) return texts.notSpecified;
    
    const projectTypeMap: Record<string, string> = {
      'website': isEnglish ? 'Website' : 'Sitio web',
      'webapp': isEnglish ? 'Web application' : 'Aplicación web',
      'ecommerce': isEnglish ? 'Online store' : 'Tienda online',
      'mobile': isEnglish ? 'Mobile app' : 'App móvil',
      'other': isEnglish ? 'Other' : 'Otro'
    };
    
    return projectTypeMap[type] || type;
  };
  
  // Mapear los tamaños de proyecto a textos en español
  const getProjectScopeText = (scope: string | undefined) => {
    if (!scope) return texts.notSpecified;
    
    const projectScopeMap: Record<string, string> = {
      'small': isEnglish ? 'Small (simple, few pages)' : 'Pequeño (simple, pocas páginas)',
      'medium': isEnglish ? 'Medium (standard functionality)' : 'Mediano (funcionalidades estándar)',
      'large': isEnglish ? 'Large (advanced features)' : 'Grande (funcionalidades avanzadas)',
      'enterprise': isEnglish ? 'Enterprise (high complexity)' : 'Corporativo (alto nivel de complejidad)'
    };
    
    return projectScopeMap[scope] || scope;
  };

  try {
    // Estas variables deberían ponerse en variables de entorno (.env)
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || texts.notProvided,
        project_type: getProjectTypeText(formData.projectType),
        project_scope: getProjectScopeText(formData.projectScope),
        message: formData.message,
        allow_follow_up: formData.allowFollowUp ? texts.yes : texts.no
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 