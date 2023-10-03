// material-ui
import { PaletteOptions, alpha } from '@mui/material/styles';

export const ThemeShadows = (palette: PaletteOptions) => {

  const defaultColor = '#333';

  const shadowGrey = palette.grey ? palette.grey[900] ?? defaultColor : defaultColor;

  return {
    button: `0 2px #0000000b`,
    text: `0 -1px 0 rgb(0 0 0 / 12%)`,
    z1: `0px 2px 8px ${alpha(shadowGrey, 0.15)}`
  };


};

