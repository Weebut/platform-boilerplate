import { useEffect } from 'react';

interface ThemeProviderProps {
  children?: any;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && isDark)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light';

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark';

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme');
  }, []);

  return children;
}
