import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import React, { useMemo } from 'react';

import { useAuditorContacts } from 'hooks/useAuditorContacts';
import { useAuditorResults } from 'hooks/useAuditorResults';
import { useLastContestsAuditorResults } from 'hooks/useLastContestsAuditorResults';

import { ProfileData } from './profileData';
import { Account } from '../account';

interface ProfileProps {
  address: string;
}

const Profile: React.FC<ProfileProps> = ({ address }) => {
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const { data: auditorData, isLoading } = useAuditorResults(address);

  const { data: auditorLastData, isLoading: isLastDataLoading } =
    useLastContestsAuditorResults(address);

  const { data: auditorsContacts } = useAuditorContacts();
  const auditorContacts = auditorsContacts?.[address];

  const achievements = useMemo(() => {
    const placesContests = auditorData.contestsData.competitions
      ?.filter((result) => result.rank.userRank && result.rank.userRank <= 3)
      // The results are filtered, so rank.user cannot be undefined, but ts doestn't undestand this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort((a, b) => a.rank.userRank - b.rank.userRank)
      .map((result) => ({
        value: result.rank.userRank,
        title: result.competition.name,
      }));

    const placesFarms = auditorData.farmsData.competitions
      ?.filter((result) => result.rank.userRank && result.rank.userRank <= 3)
      // The results are filtered, so rank.user cannot be undefined, but ts doestn't undestand this
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort((a, b) => a.rank.userRank - b.rank.userRank)
      .map((result) => ({
        value: result.rank.userRank,
        title: result.competition.name,
      }));

    return [...(placesContests || []), ...(placesFarms || [])];
  }, [
    auditorData.contestsData.competitions,
    auditorData.farmsData.competitions,
  ]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={3}>
          <Account
            avatar={auditorData.auditorInfo?.profile.avatar}
            address={address}
            name={auditorData.auditorInfo?.profile.name}
            socials={{
              telegram: auditorContacts?.['telegram'],
              twitter: auditorContacts?.['twitter'],
              github: auditorContacts?.['github'],
            }}
            rank={{
              allTimeRank: auditorData.rank,
              allTimeUsers: auditorData.usersTotal,
              recentRank: auditorLastData.lastContestsRank,
              recentUsers: auditorLastData.lastContestsUsers,
            }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            achievements={achievements}
            isLoading={isLoading || isLastDataLoading}
          />
        </Grid>
        <Grid item md={12} lg={9}>
          {!onlyMediumScreen && <ProfileData address={address} />}
        </Grid>
      </Grid>

      {onlyMediumScreen && <ProfileData address={address} />}
    </>
  );
};

export default Profile;
