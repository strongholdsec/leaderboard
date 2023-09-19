import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';

import { StyledLink } from './styled';
import Logo from '../logo';

export const Navigation = () => {
  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Container disableGutters maxWidth="lg">
        <Toolbar
          sx={{
            height: 69,
            padding: 0,
          }}
        >
          <Box width="100%" padding={2} component="nav">
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Link display="inline-block" href="/https://strongholdsec.io">
                <Logo width={200} />
              </Link>
              <Stack
                alignItems="center"
                justifyContent="flex-end"
                direction="row"
                spacing={4}
              >
                <StyledLink
                  variant="button"
                  color="text.primary"
                  href="/https://strongholdsec.io/#reports"
                >
                  Reports
                </StyledLink>
                <StyledLink
                  variant="button"
                  color="text.primary"
                  href="https://strongholdsec.io/referral-club"
                >
                  Referral Club
                </StyledLink>
                <StyledLink
                  variant="button"
                  color="text.primary"
                  href="https://leaderboard.strongholdsec.io"
                >
                  Leaderboard
                </StyledLink>
              </Stack>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
