'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import numeral from 'numeral';
import { FC } from 'react';

import { useCompetitionIds } from 'hooks/useCompetitionIds';

import { GraphStats } from './graphStats';
import { ChartSeries, IssuesStats } from './issuesStats';

type StatsSmallCardProps = {
  value: number | string;
  title: string;
};

const StatsSmallCard: FC<StatsSmallCardProps> = ({ value, title }) => (
  <Card sx={{ minWidth: 275 }} raised={false}>
    <CardContent sx={{ ':last-child': { paddingBottom: 2 } }}>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h3">{value}</Typography>
    </CardContent>
  </Card>
);

type StatsProps = {
  findings: ChartSeries;
  uniqueFindings: ChartSeries;
  rewards: number;
  points: bigint;
  recentPoints: bigint;
  contests: number;
  pointsArray: number[];
};

export const Stats: FC<StatsProps> = ({
  findings,
  uniqueFindings,
  rewards,
  points,
  recentPoints,
  contests,
  pointsArray,
}) => {
  const formattedRewards = numeral(rewards).format('$0,0.00');
  const formattedPoints = numeral(points).format('0,0');
  const formattedRecentPoints = numeral(recentPoints).format('0,0');

  const allContests = useCompetitionIds();

  const numberedPoints = Number(points);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <GraphStats data={pointsArray} points={numberedPoints} />
      </Grid>
      <Grid item xs={12} md={6}>
        <IssuesStats findings={findings} uniqueFindings={uniqueFindings} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsSmallCard value={formattedRewards} title="Total Rewards" />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsSmallCard
          value={`${formattedRecentPoints} / ${formattedPoints}`}
          title="Last 3 contests / Total Points"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsSmallCard
          value={`${contests} / ${allContests.data?.length ?? 0}`}
          title="Events"
        />
      </Grid>
    </Grid>
  );
};
