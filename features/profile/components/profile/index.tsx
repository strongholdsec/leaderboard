import { Tabs } from '@mui/base/Tabs';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import React, { useMemo } from 'react';

import { Tab, TabPanel, TabsList } from 'components/Tabs';

import { useAuditorContacts } from 'hooks/useAuditorContacts';
import { useAuditorResults } from 'hooks/useAuditorResults';
import { useCompetitionIds } from 'hooks/useCompetitionIds';
import { useLastContestsAuditorResults } from 'hooks/useLastContestsAuditorResults';

import { Account } from '../account';
import { ContestTable } from '../contests';
import { FarmsTable } from '../farms';
import { Stats } from '../stats';

interface ProfileProps {
  address: string;
}

const Profile: React.FC<ProfileProps> = ({ address }) => {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { data: auditorData, isLoading } = useAuditorResults(address);

  const { data: auditorLastData } = useLastContestsAuditorResults(address);

  const { data: auditorsContacts } = useAuditorContacts();
  const auditorContacts = auditorsContacts?.[address];

  const TablePanels = useMemo(
    () => (
      <Box sx={{ marginTop: 8 }}>
        <Tabs defaultValue={0}>
          <TabsList>
            <Tab value={0}>Contests</Tab>
            <Tab value={1}>Farms</Tab>
          </TabsList>
          <TabPanel value={0}>
            {auditorData.auditorContestsResuls &&
            auditorData.auditorContestsResuls.length > 0 ? (
              <ContestTable
                rows={auditorData.auditorContestsResuls}
                isLoading={isLoading}
              />
            ) : (
              <Typography p={3}>No Contests</Typography>
            )}
          </TabPanel>
          <TabPanel value={1}>
            {auditorData.auditorFarmsResults &&
            auditorData.auditorFarmsResults.length > 0 ? (
              <FarmsTable
                rows={auditorData.auditorFarmsResults}
                isLoading={isLoading}
              />
            ) : (
              <Typography p={3}>No Contests</Typography>
            )}
          </TabPanel>
        </Tabs>
      </Box>
    ),
    [
      auditorData.auditorContestsResuls,
      auditorData.auditorFarmsResults,
      isLoading,
    ],
  );

  const competitionIds = useCompetitionIds();
  const pointsArray = useMemo(() => {
    return (
      competitionIds.data?.map((id) => {
        const found = auditorData.auditorResults?.competitionsInfo.find(
          (competition) => competition.id === id,
        );
        if (found) return parseFloat(found.weightedAmount.toString());
        else return 0;
      }) || []
    );
  }, [auditorData.auditorResults?.competitionsInfo, competitionIds.data]);

  const achievements = useMemo(() => {
    const placesContests = auditorData.auditorContestsResuls
      ?.filter((result) => result.rank.user && result.rank.user <= 3)
      // The results are filtered, so rank.user cannot be undefined, but ts doestn't undestand this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort((a, b) => a.rank.user - b.rank.user)
      .map((result) => ({
        value: result.rank.user,
        title: result.contest.name,
      }));

    const placesFarms = auditorData.auditorFarmsResults
      ?.filter((result) => result.rank.user && result.rank.user <= 3)
      // The results are filtered, so rank.user cannot be undefined, but ts doestn't undestand this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort((a, b) => a.rank.user - b.rank.user)
      .map((result) => ({
        value: result.rank.user,
        title: result.contest.name,
      }));

    return [...(placesContests || []), ...(placesFarms || [])];
  }, [auditorData.auditorContestsResuls, auditorData.auditorFarmsResults]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={3}>
          <Account
            avatar={auditorData.auditorResults?.profile.avatar}
            address={address}
            name={auditorData.auditorResults?.profile.name}
            socials={{
              telegram: auditorContacts?.['telegram'],
              twitter: auditorContacts?.['twitter'],
              github: auditorContacts?.['github'],
            }}
            rank={{
              allTime: auditorData.rank,
              n90days: auditorLastData.lastContestsRank,
              top: auditorData.top,
            }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            achievements={achievements}
          />
        </Grid>
        <Grid item md={12} lg={9}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stats
              findings={[
                auditorData.auditorResults?.critical ?? 0,
                auditorData.auditorResults?.high ?? 0,
                auditorData.auditorResults?.medium ?? 0,
                auditorData.auditorResults?.low ?? 0,
              ]}
              uniqueFindings={[3, 1, 1, 5]}
              rewards={auditorData.auditorResults?.rewards ?? 0}
              points={auditorData.auditorResults?.total ?? 0n}
              recentPoints={auditorLastData.lastContestsTotal ?? 0n}
              contests={auditorData.auditorResults?.contests ?? 0}
              pointsArray={pointsArray}
            />
          )}

          {!onlyMediumScreen && TablePanels}
        </Grid>
      </Grid>

      {onlyMediumScreen && TablePanels}
    </>
  );
};

export default Profile;
