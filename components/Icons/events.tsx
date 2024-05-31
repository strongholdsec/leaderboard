import Box from '@mui/material/Box';
import Image, { ImageProps } from 'next/image';
import React from 'react';

import { CompetitionInfo } from 'config/competitions';
import { issues } from 'styles/theme/colors';

type EventIconProps = Partial<CompetitionInfo> & {
  size?: number;
  onError?: ImageProps['onError'];
};

export const EventsIcon: React.FC<EventIconProps> = ({
  season,
  type,
  imageSrc,
  size = 24,
  onError,
}) => {
  let color = '';
  switch (season) {
    case 2022:
      color = issues.low;
      break;
    case 2023:
      color = issues.high;
      break;
    default:
      color = issues.medium;
      break;
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      {imageSrc?.endsWith('svg') ? (
        <img
          onError={onError}
          width={size}
          height={size}
          color={color}
          src={imageSrc}
          alt="Event Icon"
        />
      ) : (
        <Image
          height={size}
          width={size}
          alt={`Event Icon ${type}`}
          src={imageSrc ?? ''}
          color={color}
          onError={onError}
        />
      )}
    </Box>
  );
};
