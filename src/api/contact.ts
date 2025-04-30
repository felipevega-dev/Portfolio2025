import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function handleContactForm(formData: ContactFormData) {
  // Validaciones adicionales de seguridad
  if (!formData.name || !formData.email || !formData.message) {
    throw new Error('All fields are required');
  }

  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Invalid email address');
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
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 