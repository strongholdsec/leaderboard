import { Typography } from '@mui/material';

import { Leaderboard } from '../leaderboard/table';

export const Page = () => (
  <>
    <Typography mb={5} display="block" textAlign="center" variant="h1">
      Leaderboard
    </Typography>
    <Leaderboard />
  </>
);
