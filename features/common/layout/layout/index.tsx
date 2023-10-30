import { Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Container maxWidth="lg" component="main" sx={{ pt: 22, pb: 6 }}>
    {children}
  </Container>
);
