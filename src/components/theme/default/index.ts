import { PaletteOptions, ThemeOptions } from "@mui/material";
//import { ThemePalette } from "./palette";
import { ThemeTypography } from "./typography";
//import { ThemeShadows } from "./shadows";
import type {} from '@mui/x-data-grid/themeAugmentation';

//const themePalette = ThemePalette('light');
const themeTypography = ThemeTypography(`'Roboto', sans-serif`);
//const themeShadows = ThemeShadows(themePalette);

const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#0B3954',
    },
    secondary: {
        main: '#8ecae6',
    },
}

const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#0B3954',
    },
    secondary: {
        main: '#8ecae6',
    },
}

export const darkTheme: ThemeOptions = {
    palette: darkPalette,
    typography: themeTypography,
    components: {
        MuiAppBar: {
            defaultProps: {
                enableColorOnDark: true,
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                columnHeaderTitle: {
                    fontWeight: 'bold',
                },
            },
        },
    },
};

export const lightTheme: ThemeOptions = {
    ...darkTheme,
    palette: lightPalette,
};