import { type ThemeDefinition } from 'vuetify';
import { darkTheme } from './dark_theme';
import { lightTheme } from './light_theme';
import { deepFreeze } from '@/utils/u';

type Themes = Record<string, ThemeDefinition>;

interface ThemeDetail {
    name: string;
    icon?: string;
}

type ThemeDetailRecordRaw = Record<keyof typeof themes, ThemeDetail>;

const themes = {
    dark: darkTheme,
    light: lightTheme,
} satisfies Themes;

const themeDetailRecord = deepFreeze<ThemeDetailRecordRaw>({
    dark: {
        name: 'Dark',
    },
    light: {
        name: 'Light',
    },
}) as RecordToSignature<ThemeDetailRecordRaw>;

export { themes, themeDetailRecord };
