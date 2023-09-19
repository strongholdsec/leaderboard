import { neutral } from './colors';

export const createPalette = () => {
  return {
    background: {
      default: '#f5f5f5',
      paper: neutral[0],
    },
    divider: '#2D3748',
    neutral,
    grey: neutral,
    text: {
      primary: '#222222',
      secondary: '#757a85',
      disabled: 'rgba(255, 255, 255, 0.48)',
    },
  };
};
