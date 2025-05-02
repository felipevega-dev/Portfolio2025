import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  projectScope?: string;
  message: string;
  allowFollowUp?: boolean;
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

  try {
    // Estas variables deberían ponerse en variables de entorno (.env)
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No proporcionado',
        project_type: formData.projectType || 'No especificado',
        project_scope: formData.projectScope || 'No especificado',
        message: formData.message,
        allow_follow_up: formData.allowFollowUp ? 'Sí' : 'No'
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 