import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { ForwardedRef, forwardRef } from 'react';

export type ContestBadgeProps = {
  title: string;
  startDate: Date;
  endDate: Date;
  imageSrc?: string;
};

function stringAvatar(name: string) {
  const nameParts = name.split(' ');
  return {
    children: `${nameParts.length > 0 ? nameParts[0][0] : 0}${
      nameParts.length > 1 ? name.split(' ')[1][0] : ''
    }`,
  };
}

export const ContestBadge = forwardRef(
  (
    { title, startDate, endDate, imageSrc, ...rest }: ContestBadgeProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    const startFormatted = format(startDate, 'd MMM, yyyy');
    const endFormatted = format(endDate, 'd MMM, yyyy');

    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        {...rest}
        ref={ref}
      >
        <Avatar
          {...stringAvatar(title)}
          sx={{ width: 42, height: 42 }}
          alt={title}
          src={imageSrc}
        />

        <Box>
          <Typography variant="caption">{title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {startFormatted} - {endFormatted}
          </Typography>
        </Box>
      </Stack>
    );
  },
);
ContestBadge.displayName = 'ContestBadge';
