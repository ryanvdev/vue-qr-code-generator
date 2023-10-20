import u from '@/utils/u';
import { type ThemeDefinition } from 'vuetify';

const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#121212',
        surface: '#212121',
        'surface-bright': '#ccbfd6',
        'surface-variant': '#a3a3a3',
        'on-surface-variant': '#424242',
        primary: '#BB86FC',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC5',
        'secondary-darken-1': '#03DAC5',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        'on-background': '#fff',
        'on-surface': '#fff',
        'on-surface-bright': '#000',
        'on-primary': '#fff',
        'on-primary-darken-1': '#fff',
        'on-secondary': '#000',
        'on-secondary-darken-1': '#000',
        'on-error': '#fff',
        'on-info': '#fff',
        'on-success': '#fff',
        'on-warning': '#fff',
    },
    variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 1,
        'medium-emphasis-opacity': 0.7,
        'disabled-opacity': 0.5,
        'idle-opacity': 0.1,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.16,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#343434',
        'theme-on-code': '#CCCCCC',
    },
};

u.deepFreeze(darkTheme);

export { darkTheme };
