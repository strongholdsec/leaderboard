import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import BaseTooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';
import React from 'react';

import { forwardRef } from 'react';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <BaseTooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    fontSize: '14px',
  },
}));

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, title, ...props }, ref) => (
    <HtmlTooltip
      ref={ref}
      title={
        <Card
          raised
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 30px',
          }}
        >
          <CardContent sx={{ p: 3 }}>{title}</CardContent>
        </Card>
      }
      {...props}
    >
      <Box sx={{ cursor: 'pointer' }}>{children}</Box>
    </HtmlTooltip>
  ),
);

Tooltip.displayName = 'Tooltip';
