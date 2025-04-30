export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  tags: string[];
  featured?: boolean;
  fullDescription?: string;
  features?: string[];
  screenshots?: string[];
  videoUrl?: string;
  documentation?: string;
}

const projects: Project[] = [
  {
    id: "portfolio-2024",
    title: "Portfolio 2024",
    description: "Mi portfolio personal desarrollado con Next.js y Tailwind CSS",
    imageUrl: "/images/projects/portfolio.png", 
    demoUrl: "https://portfolio-felipevega.vercel.app/",
    codeUrl: "https://github.com/felipevega-dev/Portfolio",
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion"],
    fullDescription: "Portfolio personal construido con React, Next.js y Tailwind CSS. Este sitio muestra mis proyectos, habilidades y experiencia como desarrollador de software. Implementa un diseño moderno con animaciones fluidas usando Framer Motion y un sistema de internacionalización completo.",
    features: [
      "Diseño completamente responsive optimizado para móviles y desktop",
      "Animaciones fluidas con Framer Motion",
      "Modo claro/oscuro adaptado a las preferencias del sistema",
      "Internacionalización con soporte para inglés y español",
      "Diálogos interactivos tipo RPG para las tecnologías",
      "Optimización SEO y de rendimiento"
    ],
    screenshots: [
      "/images/projects/portfolio2024/screenshot1.png",
      "/images/projects/portfolio2024/screenshot2.png"
    ]
  },
  {
    id: "featuring",
    title: "Featuring - App para músicos",
    description: "Aplicación móvil para conectar músicos y facilitar colaboraciones artísticas. Incluye publicaciones, videos cortos, sistema de match, perfiles y valoraciones.",
    imageUrl: "/images/projects/featuring.png",
    codeUrl: "https://github.com/felipevega-dev/Featuring",
    tags: ["React", "React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "NativeWind"],
    fullDescription: "Featuring es una aplicación móvil desarrollada con React Native y Expo, diseñada específicamente para músicos que buscan colaborar. La plataforma permite a los artistas conectarse, compartir contenido musical, realizar colaboraciones y recibir valoraciones de la comunidad. Incluye un completo panel de administración para gestionar el contenido de la plataforma.",
    features: [
      "Sistema de perfiles para artistas con valoraciones y estadísticas",
      "Feed de publicaciones para compartir música y videos cortos",
      "Sistema de match basado en preferencias musicales y filtros",
      "Colaboraciones entre artistas con sistema de valoración mutua",
      "Reproductor de audio y video integrado",
      "Notificaciones push para nuevas interacciones",
      "Panel de administración completo para gestionar contenido",
      "Integración con APIs de divisas para pagos internacionales",
      "Nivel premium con características adicionales",
      "Sistema de reportes y moderación de contenido"
    ],
    screenshots: [
      "/images/projects/featuring/screenshot1.png",
      "/images/projects/featuring/screenshot2.png"
    ],
    videoUrl: "https://youtube.com/embed/example1"
  },
  {
    id: "ikintsugi-theme",
    title: "Ikintsugi Theme",
    description: "Tema personalizado para WordPress desarrollado con Sage, implementando un diseño proporcionado por el cliente. Incluye animaciones, diseño responsive y alto rendimiento.",
    imageUrl: "/images/projects/ikintsugi.png",
    demoUrl: "https://ikintsugi.cl",
    codeUrl: "https://github.com/felipevega-dev/IkintsugiTheme",
    tags: ["WordPress", "PHP", "Blade", "Tailwind", "JavaScript", "Vite", "Sage", "Laragon"],
    featured: true,
    fullDescription: "Tema personalizado para WordPress desarrollado desde cero para la institución Ikintsugi. Implementado con Sage, un starter theme que utiliza Laravel Blade y modern frontend tooling. El diseño se basó en especificaciones proporcionadas por la diseñadora del cliente, y se implementó con un enfoque en rendimiento, accesibilidad y experiencia de usuario.",
    features: [
      "Implementación exacta del diseño Figma proporcionado por el cliente",
      "Diseño completamente responsive para todas las pantallas",
      "Optimización de rendimiento con puntuación alta en PageSpeed",
      "Animaciones sutiles para mejorar la experiencia de usuario",
      "Configuración de bloques de Gutenberg personalizados",
      "Uso de TailwindCSS para estilos consistentes y mantenibles",
      "Workflow moderno con Vite para desarrollo rápido",
      "Templates Blade organizados y reutilizables",
      "Optimización SEO siguiendo mejores prácticas"
    ],
    screenshots: [
      "/images/projects/ikintsugi/screenshot1.png",
      "/images/projects/ikintsugi/screenshot2.png"
    ]
  },
  {
    id: "plugin-reservas",
    title: "Plugin de Reservas para WooCommerce",
    description: "Plugin que permite a los usuarios reservar productos y a los administradores llevar un conteo de reservas por talla y productos.",
    imageUrl: "/images/projects/plugin-waitlist.png",
    codeUrl: "https://github.com/felipevega-dev/PluginWaitlist",
    tags: ["WordPress", "PHP", "JavaScript", "CSS", "WooCommerce", "Composer"],
    fullDescription: "Plugin de WordPress desarrollado para extender WooCommerce, permitiendo a los clientes reservar productos mediante un formulario, confirmar reserva, ser notificados al correo, y al administrador gestionar toda esta data.",
    features: [
      "Conteo efectivo de subtotales",
      "Sistema de multiples productos mediante formulario",
      "Panel de administración con estadísticas y filtros",
      "Notificaciones automáticas por email cuando su reserva es efectuada",
      "Soporte para productos con variaciones (tallas, colores, etc.)",
      "Estadísticas detalladas por productos y variaciónes",
      "Exportación de datos a Excel",
      "Gestión de usuarios y sus reservas"
    ],
    screenshots: [
      "/images/projects/plugin-reservas/screenshot1.png",
      "/images/projects/plugin-reservas/screenshot2.png"
    ]
  },
  {
    id: "plugin-waitlist",
    title: "Plugin de Lista de espera para WooCommerce",
    description: "Plugin que permite a los usuarios suscribirse a productos sin stock en WooCommerce, con notificaciones automáticas y un panel de administración completo para gestionar suscripciones.",
    imageUrl: "/images/projects/plugin-reservas.png",
    codeUrl: "https://github.com/felipevega-dev/PluginReservas",
    tags: ["WordPress", "PHP", "JavaScript", "CSS", "WooCommerce", "Composer"],
    featured: true,
    fullDescription: "Plugin de WordPress desarrollado para extender WooCommerce, permitiendo a los clientes suscribirse a productos sin stock. El sistema gestiona las notificaciones automáticas cuando el producto vuelve a estar disponible y proporciona un completo panel de administración para analizar las suscripciones y tendencias de productos.",
    features: [
      "Integración con el inventario de WooCommerce",
      "Sistema de suscripción a productos sin stock",
      "Panel de administración con estadísticas y filtros",
      "Notificaciones automáticas por email cuando se repone el stock",
      "Plantillas de email personalizables",
      "Soporte para productos con variaciones (tallas, colores, etc.)",
      "Estadísticas detalladas por producto y variación",
      "Exportación de datos a Excel",
      "Gestión de usuarios y sus suscripciones",
      "Configuración flexible del sistema"
    ],
    screenshots: [
      "/images/projects/plugin-reservas/screenshot1.png",
      "/images/projects/plugin-reservas/screenshot2.png"
    ]
  },
  {
    id: "harrys-ecommerce",
    title: "Harry's Boutique: Ecommerce",
    description: "Frontend de Ecommerce para Empresa Harry's Boutique de venta de prendas para mascotas.",
    imageUrl: "/images/projects/harrysboutique.png",
    codeUrl: "https://github.com/felipevega-dev/HBEcommerceFullStack",
    tags: ["Vite", "JavaScript", "TailwindCSS", "React", "MercadoPago"],
    fullDescription: "Sistema frontend de comercio electronico funcional, con estilos personalizados y elegantes, animaciones suaves, filtros y conexión a un backend dedicado.",
    features: [
      "Integración con el inventario de WooCommerce",
      "Sistema de suscripción a productos sin stock",
      "Panel de administración con estadísticas y filtros",
      "Notificaciones automáticas por email cuando se repone el stock",
      "Plantillas de email personalizables",
      "Soporte para productos con variaciones (tallas, colores, etc.)",
      "Estadísticas detalladas por producto y variación",
      "Exportación de datos a Excel",
      "Gestión de usuarios y sus suscripciones",
      "Configuración flexible del sistema"
    ],
    screenshots: [
      "/images/projects/plugin-reservas/screenshot1.png",
      "/images/projects/plugin-reservas/screenshot2.png"
    ]
  }
];

// Función para obtener proyectos por tecnología
export const getProjectsByTechnology = (tech: string): Project[] => {
  return projects.filter(project => 
    project.tags.some(tag => 
      tag.toLowerCase() === tech.toLowerCase()
    )
  );
};

// Función para buscar proyectos por texto
export const searchProjects = (searchTerm: string): Project[] => {
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) || 
    project.description.toLowerCase().includes(term) ||
    project.tags.some(tag => tag.toLowerCase().includes(term)) ||
    (project.fullDescription && project.fullDescription.toLowerCase().includes(term))
  );
};

export default projects; 