import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Link from '@mui/material/Link';

import { FC } from 'react';

import MenuIcon from 'assets/icons/menu.svg';
import { NavItem } from 'config/nav';

import Logo from '../../logo';
import { StyledLink } from '../styled';

interface TopNavProps {
  onMobileNav?: () => void;
  navItems?: NavItem[];
}

export const TopNav: FC<TopNavProps> = (props) => {
  const { onMobileNav, navItems = [] } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Container disableGutters maxWidth="lg">
        <Toolbar
          sx={{
            height: 69,
            padding: 0,
          }}
        >
          <Box width="100%" padding={[2, 0]} component="nav">
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Link display="inline-block" href="https://strongholdsec.io">
                <Logo width={[165, 200]} />
              </Link>

              {!mdUp && (
                <IconButton
                  sx={{
                    padding: 0,
                  }}
                  onClick={onMobileNav}
                >
                  <img
                    height={28}
                    width={28}
                    src={MenuIcon.src}
                    alt="Menu Icon"
                  />
                </IconButton>
              )}

              {mdUp && (
                <Stack
                  alignItems="center"
                  justifyContent="flex-end"
                  direction="row"
                  spacing={4}
                >
                  {navItems.map((item) => (
                    <StyledLink
                      key={item.title}
                      variant="button"
                      color="text.primary"
                      href={item.path}
                    >
                      {item.title}
                    </StyledLink>
                  ))}
                </Stack>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
