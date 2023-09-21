import { Box, Typography } from '@mui/material';

import React from 'react';

import { Socials } from '../socials';

export const Footer = React.memo(() => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        pb: 15,
        pt: 15,
      }}
      component="footer"
      flexDirection="column"
    >
      <Socials />
      <Typography pt={2} variant="caption" color="text.secondary">
        © 2023 Stronghold Security
      </Typography>
    </Box>
  );
});

Footer.displayName = 'Footer';
