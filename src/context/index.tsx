import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';

// Componente que combina todos los proveedores de contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
};

// Re-exportar hooks para fácil acceso
export { useTheme } from './ThemeContext';
export { useLanguage } from './LanguageContext'; 