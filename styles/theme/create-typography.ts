import type { TypographyOptions } from '@mui/material/styles/createTypography';

export const createTypography = (): TypographyOptions => {
  return {
    fontFamily:
      '"Gilroy", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.55,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: 700,
      fontSize: '38px',
      lineHeight: 1.23,
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2,
    },
  };
};
