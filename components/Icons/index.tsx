import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';

const ExclamationIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </SvgIcon>
  );
};

export default ExclamationIcon;
