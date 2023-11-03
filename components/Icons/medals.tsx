import Box from '@mui/material/Box';
import Image from 'next/image';
import React from 'react';

import ContesterIcon from 'assets/icons/contester.svg';
import Place1Icon from 'assets/icons/place[1].svg';
import Place2Icon from 'assets/icons/place[2].svg';
import Place3Icon from 'assets/icons/place[3].svg';
import Place4Icon from 'assets/icons/place[4].svg';
import Place5Icon from 'assets/icons/place[5].svg';
import Place6Icon from 'assets/icons/place[6].svg';

interface MedalIconProps {
  place: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  size?: number;
}

const medalsMap = {
  1: Place1Icon,
  2: Place2Icon,
  3: Place3Icon,
  4: Place4Icon,
  5: Place5Icon,
  6: Place6Icon,
  0: ContesterIcon,
};

export const MedalIcon: React.FC<MedalIconProps> = ({ place, size = 24 }) => {
  let color = '';
  switch (place) {
    case 0:
      color = 'black.main';
      break;
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
      color = 'metal';
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
        alt={`Place Icon ${place}`}
        src={medalsMap[place]}
        color={color}
      />
    </Box>
  );
};
