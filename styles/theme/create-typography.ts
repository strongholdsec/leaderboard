import { Theme } from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

interface Config {
  theme: Theme;
}

export const createTypography = ({ theme }: Config): TypographyOptions => {
  return {
    fontFamily:
      '"Gilroy", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '16',
      fontWeight: 600,
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
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.55,
    },
    subtitle1: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: '11px',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    h1: {
      fontWeight: 600,
      fontSize: '42px',
      lineHeight: 1.23,
    },
    h2: {
      fontWeight: 600,
      fontSize: '36px',
      lineHeight: 1.23,
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '22px',
      lineHeight: 1.35,
    },
    h3: {
      fontWeight: 600,
      fontSize: '28px',
      lineHeight: 1.23,
    },
    h5: {
      fontWeight: 600,
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
