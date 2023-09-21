import { PaletteOptions } from '@mui/material';
import type { Components } from '@mui/material/styles/components';
import { tableCellClasses } from '@mui/material/TableCell';

interface Config {
  palette: PaletteOptions;
}

export const createComponents = ({ palette }: Config): Components => {
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
  };
};
