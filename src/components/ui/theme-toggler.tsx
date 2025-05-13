import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { themesConfig } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function ThemeModeToggle() {
  const { theme, setTheme, effectiveMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration mismatch doesn't occur
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:border-primary hover:bg-primary/10 focus:ring-primary/20 relative overflow-hidden rounded-full border-2 transition-all duration-300 focus:ring-2"
        >
          <Sun
            className={cn(
              'h-[1.3rem] w-[1.3rem] transition-all duration-500',
              effectiveMode === 'light'
                ? 'scale-100 rotate-0'
                : 'scale-0 -rotate-90',
            )}
          />
          <Moon
            className={cn(
              'absolute h-[1.3rem] w-[1.3rem] transition-all duration-500',
              effectiveMode === 'dark'
                ? 'scale-100 rotate-0'
                : 'scale-0 rotate-90',
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background/90 animate-in slide-in-from-top-5 fade-in-50 rounded-xl border-2 shadow-lg backdrop-blur-md duration-300"
      >
        {themesConfig.map((item, index) => {
          if (item.type === 'separator') {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }
          const { value, label, Icon } = item;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'flex cursor-pointer items-center gap-2 transition-colors',
                theme === value ? 'bg-primary/10 font-medium' : '',
              )}
            >
              <Icon className="mr-2 h-4 w-4" /> {label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
