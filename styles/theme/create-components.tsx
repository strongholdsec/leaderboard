import { PaletteOptions, Theme } from '@mui/material';
import type { Components } from '@mui/material/styles/components';
import { tableCellClasses } from '@mui/material/TableCell';

interface Config {
  palette: PaletteOptions;
  theme: Theme;
}

export const createComponents = ({ palette, theme }: Config): Components => {
  return {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '0 5px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '15px 16px',
          borderBottom: 'none',
          [`&.${tableCellClasses.body}`]: {
            backgroundColor: palette.background?.default,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '18px',
          },
          [`&.${tableCellClasses.body}:first-of-type`]: {
            borderRadius: '8px 0 0 8px',
          },
          [`&.${tableCellClasses.body}:last-of-type`]: {
            borderRadius: '0 8px 8px 0',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '18px',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: palette.background?.default,
          fontSize: '14px',
          fontWeight: 400,
        },
        input: {
          padding: '16px 48px 16px 20px',
        },
        notchedOutline: {
          border: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          borderColor: palette?.grey?.[200],
          borderStyle: 'solid',
          borderWidth: '1px',
          boxShadow: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 40px',
          [theme.breakpoints.down('sm')]: {
            padding: '16px',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: palette?.background?.default,
        },
        sizeMedium: {
          fontSize: '18px',
          fontWeight: 600,
          padding: '4px 8px',
        },
        sizeSmall: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
  };
};
