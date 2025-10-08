import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          
          console.log('Toggle theme:', state.theme, '→', newTheme);
          
          // Simply add or remove the 'dark' class
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          console.log('HTML classes:', document.documentElement.className);
          
          return { theme: newTheme };
        });
      },

      setTheme: (theme: 'light' | 'dark') => {
        console.log('Set theme:', theme);
        
        // Simply add or remove the 'dark' class
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        console.log('HTML classes:', document.documentElement.className);
        
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
