import { Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Container
    maxWidth="xl"
    component="main"
    sx={{ pt: { lg: 22, xs: 15 }, pb: 6 }}
  >
    {children}
  </Container>
);
