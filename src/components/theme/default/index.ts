import { ThemeOptions } from "@mui/material";
import { ThemePalette } from "./palette";
import { ThemeTypography } from "./typography";
import { ThemeShadows } from "./shadows";

const themePalette = ThemePalette('light');
const themeTypography = ThemeTypography(`'Roboto', sans-serif`);
const themeShadows = ThemeShadows(themePalette);

type CustomThemeOptions = ThemeOptions & {
    customShadows?: {
        button?: string;
        text?: string;
        z1?: string;
    };
};

export const themeOptions: CustomThemeOptions  = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1266,
            xl: 1536
        }
    },
    direction: 'ltr',
    mixins: {
        toolbar: {
            minHeight: 60,
            paddingTop: 8,
            paddingBottom: 8
        }
    },
    palette: themePalette,
    customShadows: themeShadows,
    typography: themeTypography
};