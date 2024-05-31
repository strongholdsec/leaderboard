import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

import numeral from 'numeral';
import type { FC } from 'react';

import React from 'react';

const Chart = dynamic(() => import('components/Chart'), {
  ssr: false,
  loading: () => null,
});

type UseChartOptions = (labelsArray?: string[]) => ApexOptions;

const useChartOptions: UseChartOptions = (labelsArary) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: false,
        // labels numerations starts with 1
        formatter: labelsArary ? (id) => labelsArary[id - 1] : undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
      type: 'gradient',
    },
    grid: {
      borderColor: theme.palette.grey[200],
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 6,
      strokeColors: theme.palette.grey[200],
      strokeWidth: 3,
    },
    stroke: {
      curve: 'smooth',
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  };
};

type GraphStatsProps = {
  points: number;
  data: number[];
  labelsArray?: string[];
};

export const GraphStats: FC<GraphStatsProps> = React.memo(
  ({ points, data, labelsArray }) => {
    const chartOptions = useChartOptions(labelsArray);

    const chartHeight = 155;
    const charWidth = '100%';
    const formattedPoints = numeral(points).format('0,0');
    return (
      <Card raised={false}>
        <CardContent
          sx={{
            position: 'relative',
            paddingTop: 3,
            ':last-child': { paddingBottom: 2 },
          }}
        >
          <Stack spacing={3} direction="column" justifyContent="space-between">
            <Box sx={{ position: 'absolute', zIndex: 1 }}>
              <Typography variant="caption">Total Points</Typography>
              <Typography variant="h3">{formattedPoints}</Typography>
            </Box>

            <Box
              sx={{
                height: chartHeight,
                position: 'relative',
                touchAction: 'none',
              }}
            >
              <Chart
                height={chartHeight}
                width={charWidth}
                options={chartOptions}
                series={[
                  {
                    name: 'Points',
                    data,
                  },
                ]}
                type="area"
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  },
);

GraphStats.displayName = 'GraphStats';
