import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import format from 'date-fns/format';
import { ForwardedRef, forwardRef, useState } from 'react';

import { EventsIcon } from 'components/Icons/events';

import { CompetitionInfo } from 'config/competitions';

export type ContestBadgeProps = Partial<CompetitionInfo>;

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
    { name, startDate, endDate, imageSrc, type, season }: ContestBadgeProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    const startFormatted = startDate ? format(startDate, 'd MMM, yyyy') : '';
    const endFormatted = endDate ? format(endDate, 'd MMM, yyyy') : '';

    const [imageLoadingError, setImageError] = useState(false);

    return (
      <Stack direction="row" alignItems="center" spacing={2} ref={ref}>
        {' '}
        {imageSrc && !imageLoadingError ? (
          <EventsIcon
            size={42}
            type={type}
            season={season}
            imageSrc={imageSrc}
            onError={() => setImageError(true)}
          />
        ) : (
          <Avatar
            {...stringAvatar(name || 'Contest')}
            sx={{ width: 42, height: 42 }}
            alt={name}
            src={imageSrc}
          />
        )}
        <Box>
          <Typography variant="caption">{name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {startFormatted} - {endFormatted}
          </Typography>
        </Box>
      </Stack>
    );
  },
);
ContestBadge.displayName = 'ContestBadge';
