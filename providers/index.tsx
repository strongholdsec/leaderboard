'use client';
import { ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import StyledComponentsRegistry from 'theme/registry';

import { GlobalStyle, themeOptions } from 'styles';

import { QueryProvider } from './query';
import { Web3Provider } from './web3';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={themeOptions}>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <QueryProvider>
          <Web3Provider>{children}</Web3Provider>
        </QueryProvider>
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
};
