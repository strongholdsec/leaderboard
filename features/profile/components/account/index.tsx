import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GithubIcon, TelegramIcon, TwitterIcon } from 'config/socials';
import { SocialIcon } from 'features/common/layout/socials';

import numeral from 'numeral';
import React, { FC } from 'react';

import { formatAddress } from 'utils/utils';

import { AccountIcon } from 'components/AccountIcon';
import { MedalIcon } from 'components/Medals';

type AccountSectionProps = {
  title: string;
  children: React.ReactNode;
};

const AccountSection: FC<AccountSectionProps> = ({ title, children }) => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

type RankChipProps = {
  title: string;
  value: number | string | undefined;
  color?:
    | 'error'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'black';
};

const RankChip: FC<RankChipProps> = ({ title, value, color }) => {
  return (
    <Stack alignItems="center">
      <Chip
        sx={{ marginBottom: 1 }}
        // TODO: fix @mui palette types
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        color={color || 'default'}
        label={value || 'N/A'}
      />
      <Typography variant="caption">{title}</Typography>
    </Stack>
  );
};

type AchievementChipProps = {
  title: string;
  value: 1 | 2 | 3;
};

const AchievementChip: FC<AchievementChipProps> = ({ title, value }) => {
  return (
    <Stack alignItems="center" spacing={1} direction="row">
      <MedalIcon place={value} />
      <Chip sx={{ marginBottom: 1 }} label={title} size="small" />
    </Stack>
  );
};

type AccountProps = {
  avatar?: string;
  address: string;
  name?: string;
  socials: {
    telegram: string;
    twitter: string;
    github: string;
  };
  rank: {
    allTime: number | undefined;
    n90days: number | undefined;
    top: number | undefined;
  };
  achievements: {
    title: string;
    value: 1 | 2 | 3;
  }[];
};

export const Account: FC<AccountProps> = ({
  avatar,
  address,
  name,
  achievements,
  socials,
  rank,
}) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack mb={4} direction="column" spacing={4}>
      <Stack
        alignItems={{ xs: 'center', lg: 'flex-start' }}
        justifyContent={{ sm: 'space-between' }}
        direction={{ lg: 'column', xs: 'row' }}
        spacing={2}
      >
        <Stack
          alignItems={{ xs: 'center', lg: 'flex-start' }}
          justifyContent={{ md: 'space-between' }}
          spacing={{ xs: 4, lg: 2 }}
          direction={{ lg: 'column', xs: 'row' }}
        >
          <AccountIcon
            height={{ xs: 90, sm: 100, md: 120, lg: 130 }}
            avatar={avatar}
            address={address}
          />
          {!onlySmallScreen && (
            <Typography variant="h2">
              {name || formatAddress(address, 4)}
            </Typography>
          )}
        </Stack>

        <Stack spacing={{ xs: 1 }}>
          {onlySmallScreen && (
            <Typography variant="h2">
              {name || formatAddress(address, 4)}
            </Typography>
          )}
          {(socials.github || socials.telegram || socials.twitter) && (
            <div>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ marginLeft: -1, marginTop: -1 }}
              >
                {socials.telegram && (
                  <SocialIcon src={TelegramIcon.src} link={socials.telegram} />
                )}
                {socials.twitter && (
                  <SocialIcon src={TwitterIcon.src} link={socials.twitter} />
                )}
                {socials.github && (
                  <SocialIcon src={GithubIcon.src} link={socials.github} />
                )}
              </Stack>
            </div>
          )}
        </Stack>
      </Stack>

      <Stack
        justifyContent={{
          sm: 'space-between',
          md: 'flex-start',
        }}
        direction={{ lg: 'column', sm: 'row' }}
        spacing={{ sm: 8, lg: 5, xs: 4 }}
      >
        <AccountSection title="Rank">
          <Stack direction="row" alignItems="center" spacing={2}>
            <RankChip color="black" title="All time" value={rank.allTime} />
            <RankChip title="Last 3 contests" value={rank.n90days} />
            <RankChip
              title="Top"
              value={
                rank.top
                  ? numeral(Math.ceil(rank.top)).format('0') + '%'
                  : 'N/A'
              }
            />
          </Stack>
        </AccountSection>

        {achievements.length > 0 && (
          <AccountSection title="Achievements">
            <Stack
              direction={{ lg: 'column', md: 'row', sm: 'column' }}
              spacing={{ md: 4, xs: 2, lg: 2 }}
            >
              {achievements.map((achievement) => (
                <AchievementChip
                  key={achievement.title}
                  title={achievement.title}
                  value={achievement.value}
                />
              ))}
            </Stack>
          </AccountSection>
        )}
      </Stack>
    </Stack>
  );
};
