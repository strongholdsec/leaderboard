import { Tabs } from '@mui/base/Tabs';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import numeral from 'numeral';
import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';

import { MedalIcon } from 'components/Icons/medals';
import { Tab, TabsList } from 'components/Tabs';

import { guessCompetitionName } from 'config/competitions';
import { CompetitionTotal, useAuditorResults } from 'hooks/useAuditorResults';

import { useCompetitionIds } from 'hooks/useCompetitionIds';

import { useCompetitionsInfo } from 'hooks/useCompetitionsInfo';

import { useFirstCompletedFarm } from 'hooks/useFirstCompletedFarm';

import {
  contestsDisplatData,
  customComparators,
  farmsDisplayData,
} from './tableConfig';
import { DataTable } from '../dataTable';
import { GraphStats } from '../stats/graphStats';
import { IssuesStats } from '../stats/issuesStats';

interface ProfileDataProps {
  address: string;
}

const modeMap = {
  0: 'total',
  1: 'contest',
  2: 'farm',
};

type Mode = 0 | 1 | 2;

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

export const ProfileData: FC<ProfileDataProps> = ({ address }) => {
  const [mode, setMode] = useState<Mode>(0);

  const handleChange = useCallback(
    (_event: SyntheticEvent | null, newValue: string | number | null) => {
      setMode(newValue as Mode);
    },
    [],
  );

  const { data: auditorData, isLoading } = useAuditorResults(address);

  const data: CompetitionTotal | undefined = useMemo(() => {
    switch (mode) {
      case 0:
        return auditorData.totalData;

      case 1:
        return auditorData.contestsData;

      case 2:
        return auditorData.farmsData;

      default:
        return undefined;
    }
  }, [auditorData, mode]);

  const { data: competitionsId } = useCompetitionIds();
  const { data: competitionInfo } = useCompetitionsInfo();
  const [pointsArray, competitionsNames] = useMemo(() => {
    if (competitionsId && data?.competitions) {
      const points: number[] = [];
      const names: string[] = [];
      competitionsId.forEach((id) => {
        if (mode === 0 || competitionInfo?.[id].type === modeMap[mode]) {
          const foundCompetition = data.competitions.find(
            (competiton) => competiton.competition?.id === id,
          );
          points.push(foundCompetition?.points ?? 0);
          names.push(guessCompetitionName(id));
        }
      });

      return [points, names];
    }
    return [[], []];
  }, [competitionInfo, competitionsId, data?.competitions, mode]);

  const eventName =
    mode === 0 ? 'Contests & Farms' : mode === 1 ? 'Contests' : 'Farms';

  const formattedRewards = data ? numeral(data.rewards).format('$0,0.00') : '';

  const { data: firstCompletedFarm } = useFirstCompletedFarm(address);

  return (
    <Box>
      <Tabs defaultValue={0} onChange={handleChange}>
        <TabsList sx={{ marginBottom: 5 }}>
          <Tab value={0}>Total</Tab>
          <Tab value={1}>Contests</Tab>
          <Tab value={2}>Farms</Tab>
        </TabsList>

        {isLoading ? (
          <Box
            display="flex"
            width="100%"
            height="200px"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {data && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <GraphStats
                      labelsArray={competitionsNames}
                      data={pointsArray}
                      points={data.points}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <IssuesStats
                      findings={[
                        data.critical,
                        data.high,
                        data.medium,
                        data.low,
                      ]}
                      uniqueFindings={[
                        data.uniqueCritical,
                        data.uniqueHigh,
                        data.uniqueMedium,
                        data.uniqueLow,
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {modeMap[mode] === 'farm' ? (
                      <Card sx={{ minWidth: 275 }} raised={false}>
                        <CardContent
                          sx={{ ':last-child': { paddingBottom: 2 } }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={3}
                          >
                            <div>
                              <Typography variant="caption">
                                Contester since
                              </Typography>
                              <Typography variant="h3">
                                {firstCompletedFarm?.competition?.name ||
                                  'Farm'}
                              </Typography>
                            </div>
                            <MedalIcon place={0} size={40} />
                          </Stack>
                        </CardContent>
                      </Card>
                    ) : (
                      <StatsSmallCard
                        value={formattedRewards}
                        title="Total Rewards"
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StatsSmallCard
                      value={`${data.competitions.length} / ${
                        pointsArray.length ?? 0
                      }`}
                      title={eventName}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ marginTop: 5 }}>
                  {data.competitions.length > 0 ? (
                    <DataTable
                      displayData={
                        modeMap[mode] === 'farm'
                          ? farmsDisplayData
                          : contestsDisplatData
                      }
                      rows={data?.competitions}
                      isLoading={isLoading}
                      descendingComparators={customComparators}
                    />
                  ) : (
                    <Typography p={3}>Not Participated</Typography>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Tabs>
    </Box>
  );
};
