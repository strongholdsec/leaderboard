import { Icon, Stack } from '@mui/material';

import { socials } from 'config/socials';
import React from 'react';

export const Socials = React.memo(() => (
  <Stack pb={2} spacing={1} direction="row">
    {socials.map((item) => (
      <a
        key={item.icon}
        target="_blank"
        rel="noreferrer noopener"
        href={item.link}
      >
        <Icon
          sx={{
            height: 32,
            width: 32,
          }}
          component="img"
          src={item.icon}
        />
      </a>
    ))}
  </Stack>
));

Socials.displayName = 'Socials';
