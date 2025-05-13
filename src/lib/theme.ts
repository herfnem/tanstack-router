import { Moon, Sun, Laptop } from 'lucide-react';

export const DEFAULT_THEME = 'claude-system';
export const THEME_STORAGE_KEY = 'vite-ui-theme-multi';

type ThemeConfigItem =
  | {
      type: 'theme';
      value: Theme;
      label: string;
      Icon: typeof Sun;
    }
  | { type: 'separator' };

export type Theme =
  | 'caffine-light'
  | 'caffine-dark'
  | 'caffine-system'
  | 'claude-light'
  | 'claude-dark'
  | 'claude-system'
  | 'catppuccin-light'
  | 'catppuccin-dark'
  | 'catppuccin-system';

export const classList = [
  'theme-caffine',
  'theme-claude',
  'theme-catppuccin',
  'light',
  'dark',
];

export const themesConfig: ThemeConfigItem[] = [
  { type: 'theme', value: 'caffine-light', label: 'Caffine Light', Icon: Sun },
  { type: 'theme', value: 'caffine-dark', label: 'Caffine Dark', Icon: Moon },
  {
    type: 'theme',
    value: 'caffine-system',
    label: 'Caffine System',
    Icon: Laptop,
  },
  { type: 'separator' },
  { type: 'theme', value: 'claude-light', label: 'Claude Light', Icon: Sun },
  { type: 'theme', value: 'claude-dark', label: 'Claude Dark', Icon: Moon },
  {
    type: 'theme',
    value: 'claude-system',
    label: 'Claude System',
    Icon: Laptop,
  },
  { type: 'separator' },
  {
    type: 'theme',
    value: 'catppuccin-light',
    label: 'Catppuccin Light',
    Icon: Sun,
  },
  {
    type: 'theme',
    value: 'catppuccin-dark',
    label: 'Catppuccin Dark',
    Icon: Moon,
  },
  {
    type: 'theme',
    value: 'catppuccin-system',
    label: 'Catppuccin System',
    Icon: Laptop,
  },
];
