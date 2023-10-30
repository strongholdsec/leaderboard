import { createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material/styles/createTheme';

import { createComponents } from './create-components';
import { createPalette } from './create-pallete';
import { createTypography } from './create-typography';

const baseTheme = createTheme();

export const createOptions = (): ThemeOptions => {
  const palette = createPalette();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const components = createComponents({ palette, theme: baseTheme });

  const typographyCreated = createTypography({ theme: baseTheme });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    ...baseTheme,
    components: {
      ...baseTheme.components,
      ...components,
    },
    direction: 'ltr',
    typography: {
      ...baseTheme.typography,
      ...typographyCreated,
    },
    palette: {
      ...baseTheme.palette,
      ...palette,
    },
  };
};
