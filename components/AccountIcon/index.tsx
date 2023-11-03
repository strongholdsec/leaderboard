'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { FC } from 'react';

import { Identicon, IdenticonProps } from '../Identicon';

export type AccountProps = {
  avatar?: string;
  height:
    | {
        xs: number;
        sm: number;
        md: number;
        lg: number;
      }
    | number;
} & IdenticonProps;

export const AccountIcon: FC<AccountProps> = ({
  avatar,
  height,
  paperStyles,
  svgStyles,
  address,
}) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  let heightParsed = 0;
  if (typeof height === 'object') {
    heightParsed = onlySmallScreen
      ? height.sm - 10
      : onlyMediumScreen
      ? height.md - 8
      : onlyLargeScreen
      ? height.lg - 6
      : height.xs - 4;
  } else if (typeof height === 'number') {
    heightParsed = height - 4;
  }

  return (
    <Box width={height} height={height}>
      {avatar ? (
        <img
          alt="avatar"
          src={avatar}
          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
        ></img>
      ) : (
        <Identicon
          address={address}
          diameter={heightParsed}
          paperStyles={{
            height: '100%',
            borderRadius: '50%',
            ...paperStyles,
          }}
          svgStyles={svgStyles}
        />
      )}
    </Box>
  );
};
