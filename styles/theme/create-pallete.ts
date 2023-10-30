import { alpha } from '@mui/material/styles';

import { neutral } from './colors';
const blackBase = '#222222';

export const createPalette = () => {
  return {
    background: {
      default: '#f5f5f5',
      paper: neutral[0],
    },
    divider: '#2D3748',
    neutral,
    grey: neutral,
    black: {
      main: blackBase,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: '#fff',
    },
    gold: '#dccf81',
    silver: '#b0b4bb',
    bronze: '#ba875e',
    border: {
      main: blackBase,
      light: '#efefef',
    },
    text: {
      primary: blackBase,
      secondary: '#757a85',
      disabled: 'rgba(255, 255, 255, 0.48)',
    },
  };
};
