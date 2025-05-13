import {
  classList,
  DEFAULT_THEME,
  Theme,
  THEME_STORAGE_KEY,
} from '@/lib/theme';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderContextState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialContextState: ThemeProviderContextState = {
  theme: DEFAULT_THEME,
  setTheme: () => null,
};

const ThemeProviderContext =
  createContext<ThemeProviderContextState>(initialContextState);

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = THEME_STORAGE_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    let themeNamePart: string;
    let modeToApply: 'light' | 'dark';

    // Function to update DOM based on current theme
    const updateDOMWithTheme = (currentTheme: Theme) => {
      if (currentTheme.endsWith('-system')) {
        themeNamePart = currentTheme.replace('-system', '');
        modeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      } else {
        const parts = currentTheme.split('-');
        themeNamePart = parts[0]; // "caffine" or "claude" or ...
        modeToApply = parts[1] as 'light' | 'dark';
      }

      // Clean up old classes
      root.classList.remove(...classList);

      // Add new classes
      root.classList.add(`theme-${themeNamePart}`);
      root.classList.add(modeToApply);
    };

    updateDOMWithTheme(theme); // Apply theme on initial load and when theme state changes

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      // Only re-apply if the current theme is system-dependent
      if (theme.endsWith('-system')) {
        updateDOMWithTheme(theme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]); // Re-run effect when theme changes

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  const { theme } = context;

  // State for the effective mode (light/dark), reactive to theme and system changes
  const [effectiveMode, setEffectiveMode] = useState<'light' | 'dark'>(() => {
    if (theme.endsWith('-system')) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme.endsWith('-dark') ? 'dark' : 'light';
  });

  useEffect(() => {
    const calculateAndUpdateEffectiveMode = () => {
      if (theme.endsWith('-system')) {
        setEffectiveMode(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
        );
      } else {
        setEffectiveMode(theme.endsWith('-dark') ? 'dark' : 'light');
      }
    };

    calculateAndUpdateEffectiveMode(); // Calculate on theme change

    // Listen to system changes only if current theme is system-dependent
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    let systemChangeListener: (() => void) | null = null;

    if (theme.endsWith('-system')) {
      systemChangeListener = calculateAndUpdateEffectiveMode;
      mediaQuery.addEventListener('change', systemChangeListener);
    }

    return () => {
      if (systemChangeListener) {
        mediaQuery.removeEventListener('change', systemChangeListener);
      }
    };
  }, [theme]); // Re-calculate when theme changes

  return { ...context, effectiveMode };
};
