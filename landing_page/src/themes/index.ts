import { type ThemeDefinition } from 'vuetify';
import { darkTheme } from './dark_theme';
import { lightTheme } from './light_theme';
import { deepFreeze } from '@/utils/u';
import { useValue } from '@/utils/hooks';

type Themes = Record<string, ThemeDefinition>;

interface ThemeDetail {
    name: string;
    icon?: string;
}

type ThemeDetailRecordRaw = Record<keyof typeof themes, ThemeDetail>;

const systemThemeKey = useValue(() => {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkTheme ? 'dark' : 'light';
});

const themes = {
    systemTheme: systemThemeKey === 'light' ? lightTheme : darkTheme,
    darkTheme: darkTheme,
    lightTheme: lightTheme,
} satisfies Themes;

const themeDetailRecord = deepFreeze<ThemeDetailRecordRaw>({
    systemTheme: {
        name: 'Theo hệ thống',
        icon: 'mdi-theme-light-dark',
    },
    darkTheme: {
        name: 'Tối',
        icon: 'mdi-weather-night',
    },
    lightTheme: {
        name: 'Sáng',
        icon: 'mdi-white-balance-sunny',
    },
}) as RecordToSignature<ThemeDetailRecordRaw>;

const themeDetailList = useValue(() => {
    const result: { key: string; detail: ThemeDetail }[] = [];

    for (const key in themeDetailRecord) {
        result.push({ key, detail: themeDetailRecord[key] });
    }
    return result;
});

export { themes, themeDetailRecord, themeDetailList };
