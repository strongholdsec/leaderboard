'use client';

import { styled } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';
import dynamic from 'next/dynamic';
import type { Props } from 'react-apexcharts';

const ApexChart = dynamic<Props>(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null,
});

export default styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-xaxistooltip': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[16],
    borderRadius: theme.shape.borderRadius,
    border: 0,
    '&::before, &::after': {
      display: 'none',
    },
  },
  '& .apexcharts-tooltip': {
    '&.apexcharts-theme-light, &.apexcharts-theme-dark': {
      backdropFilter: 'blur(6px)',
      background: 'transparent',
      border: 0,
      boxShadow: 'none',
      '& .apexcharts-tooltip-title': {
        background: alpha(theme.palette.grey![900], 0.8),
        border: 0,
        color: theme.palette.common.white,
        margin: 0,
      },
      '& .apexcharts-tooltip-series-group': {
        background: alpha(theme.palette.grey![900], 0.7),
        border: 0,
        color: theme.palette.common.white,
      },
    },
  },
}));
