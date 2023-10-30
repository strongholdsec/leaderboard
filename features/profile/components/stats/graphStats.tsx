import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import { guessCompetitionName } from 'config/competitions';
import numeral from 'numeral';
import type { FC } from 'react';

import { Chart } from 'components/Chart';

const useChartOptions = (): ApexOptions => {
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
        formatter: (id) => guessCompetitionName(id - 1),
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
};

export const GraphStats: FC<GraphStatsProps> = ({ points, data }) => {
  const chartOptions = useChartOptions();

  const chartHeight = 155;
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
          <Box sx={{ position: 'absolute' }}>
            <Typography variant="caption">Total Points</Typography>
            <Typography variant="h3">{formattedPoints}</Typography>
          </Box>

          <Box
            sx={{
              height: chartHeight,
              position: 'relative',
            }}
          >
            <Chart
              height={chartHeight}
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
};
