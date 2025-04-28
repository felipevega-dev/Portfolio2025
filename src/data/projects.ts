export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "portfolio-2025",
    title: "Portfolio 2025",
    description: "Mi portfolio personal desarrollado con Next.js y Tailwind CSS",
    imageUrl: "/images/projects/portfolio.png", 
    demoUrl: "https://felipecortez.dev",
    codeUrl: "https://github.com/felipecortezdev/portfolio-2025",
    tags: ["React", "Next.js", "Tailwind", "TypeScript", "Framer Motion"]
  },
  // Aquí se pueden agregar más proyectos en el futuro
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