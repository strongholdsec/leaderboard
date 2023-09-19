import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

import LogoIcon from 'assets/logo.svg';

import { LogoStyle } from './logoStyles';

const Logo: FC<BoxProps> = (props) => (
  <Box {...props}>
    <LogoStyle src={LogoIcon.src} alt="Stronghold Logo" />
  </Box>
);

export default Logo;
