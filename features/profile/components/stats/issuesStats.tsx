import QuestionIcon from '@mui/icons-material/HelpOutline';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import type { FC } from 'react';

import { Tooltip } from 'components/Tooltip';

import { UNIQUE_FINDINGS_TOOLPIP } from 'config/text';
import { issues } from 'styles/theme/colors';

export type ChartSeries = [number, number, number, number];

const Chart = dynamic(() => import('components/Chart'), {
  ssr: false,
  loading: () => null,
});

const labels: string[] = ['Critical', 'High', 'Medium', 'Low'];
const colors = [issues.critical, issues.high, issues.medium, issues.low];

const useChartOptions = (): ApexOptions => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '85%',
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: '28px',
              fontFamily: 'Gilroy',
              fontWeight: 600,
              offsetY: 8,
            },
            total: {
              show: true,
              showAlways: true,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

type CaptionedTypographyProps = {
  title: string | number;
  caption: React.ReactNode;
};

const CaptionedTypography = ({ title, caption }: CaptionedTypographyProps) => (
  <Typography
    sx={{ position: 'relative', display: 'inline-block' }}
    mb={3}
    pr={3}
    component="div"
    variant="caption"
  >
    {title}
    <Typography
      sx={{
        position: 'absolute',
        top: 0,
        right: 20,
        transform: 'translateX(100%)',
      }}
      mb={3}
      variant="subtitle2"
      component="div"
    >
      {caption}
    </Typography>
  </Typography>
);

type FindinfsProps = {
  findings: ChartSeries;
  uniqueFindings: ChartSeries;
  uniqieTooltip?: boolean;
};

export const Findings: FC<FindinfsProps> = ({
  findings,
  uniqueFindings,
  uniqieTooltip = false,
}) => (
  <Box>
    <Box>
      <CaptionedTypography
        title="Findings"
        caption={
          uniqieTooltip ? (
            <Tooltip title={UNIQUE_FINDINGS_TOOLPIP}>
              <Box display="flex" alignItems="center" flexDirection="row">
                (Unique&nbsp;
                <Box display="inline-block">
                  <QuestionIcon sx={{ height: '15px', width: '15px' }} />
                </Box>
                )
              </Box>
            </Tooltip>
          ) : (
            '(Unique)'
          )
        }
      />
    </Box>

    <Stack spacing={1}>
      <Stack
        component="ul"
        spacing={1}
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
        }}
      >
        {findings.map((amount, index) => {
          return (
            <Stack
              alignItems="center"
              component="li"
              direction="row"
              key={index}
              spacing={2}
            >
              <Box
                sx={{
                  backgroundColor: colors![index],
                  borderRadius: '50%',
                  height: 8,
                  width: 8,
                }}
              />
              <Typography sx={{ flexGrow: 1, minWidth: 80 }} variant="body1">
                {labels[index]}
              </Typography>
              <CaptionedTypography
                title={amount}
                caption={`(${uniqueFindings[index]})`}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  </Box>
);

export const IssuesStats: FC<FindinfsProps> = ({
  findings,
  uniqueFindings,
}) => {
  const chartOptions = useChartOptions();

  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const chartHeight = onlySmallScreen ? 125 : 155;

  return (
    <Card sx={{ height: '100%' }} raised={false}>
      <CardContent sx={{ paddingTop: 3, ':last-child': { paddingBottom: 2 } }}>
        <Stack spacing={3} direction="row" justifyContent="space-between">
          <Findings
            findings={findings}
            uniqueFindings={uniqueFindings}
            uniqieTooltip
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              width: chartHeight,
            }}
          >
            <Chart
              height={chartHeight}
              width={chartHeight}
              options={chartOptions}
              series={findings}
              type="donut"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
