import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import StarIcon from 'assets/icons/star.svg';

interface MedalIconProps {
  place: 1 | 2 | 3;
  size?: number;
}

export const MedalIcon: React.FC<MedalIconProps> = ({ place, size = 24 }) => {
  let color = '';
  switch (place) {
    case 1:
      color = 'gold';
      break;
    case 2:
      color = 'silver';
      break;
    case 3:
      color = 'bronze';
      break;
    default:
      color = 'action';
      break;
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
      }}
    >
      <Image
        height={size}
        width={size}
        alt="Star Icon"
        src={StarIcon.src}
        color={color}
      />
    </Box>
  );
};
