export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  tags: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "portfolio-2025",
    title: "Portfolio 2025",
    description: "Mi portfolio personal desarrollado con Next.js y Tailwind CSS",
    imageUrl: "/images/projects/portfolio.png", 
    demoUrl: "https://portfolio-felipevega.vercel.app/",
    codeUrl: "https://github.com/felipevega-dev/Portfolio",
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion"],
    featured: true
  },
  {
    id: "featuring",
    title: "Featuring - App para músicos",
    description: "Aplicación móvil para conectar músicos y facilitar colaboraciones artísticas. Incluye publicaciones, videos cortos, sistema de match, perfiles y valoraciones.",
    imageUrl: "/images/projects/featuring.png",
    codeUrl: "https://github.com/felipevega-dev/Featuring",
    tags: ["React", "React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "NativeWind"],
    featured: true
  },
  {
    id: "ikintsugi-theme",
    title: "Ikintsugi Theme",
    description: "Tema personalizado para WordPress desarrollado con Sage, implementando un diseño proporcionado por el cliente. Incluye animaciones, diseño responsive y alto rendimiento.",
    imageUrl: "/images/projects/ikintsugi.png",
    demoUrl: "https://ikintsugi.cl",
    codeUrl: "https://github.com/felipevega-dev/IkintsugiTheme",
    tags: ["WordPress", "PHP", "Blade", "Tailwind", "JavaScript", "Vite", "Sage", "Laragon"]
  },
  {
    id: "plugin-reservas",
    title: "Plugin de Reservas para WooCommerce",
    description: "Plugin que permite a los usuarios suscribirse a productos sin stock en WooCommerce, con notificaciones automáticas y un panel de administración completo para gestionar suscripciones.",
    imageUrl: "/images/projects/plugin-reservas.png",
    codeUrl: "https://github.com/felipevega-dev/PluginReservas",
    tags: ["WordPress", "PHP", "JavaScript", "CSS", "WooCommerce", "Composer"]
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

export default projects; 