import { alpha, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { homeLink, NavItem } from 'config/nav';
import PropTypes from 'prop-types';
import type { FC } from 'react';

import CloseIcon from 'assets/icons/close.svg';

import { Socials } from '../../socials';
import { StyledLink } from '../styled';

const MOBILE_NAV_WIDTH = 260;

interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  navItems?: NavItem[];
}

export const MobileNav: FC<MobileNavProps> = (props) => {
  const { open, onClose, navItems = [] } = props;

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      BackdropProps={{
        sx: {
          backgroundColor: alpha('#000', 0.1),
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          boxSizing: 'border-box',
          pt: 3,
          pl: 1,
          width: MOBILE_NAV_WIDTH,
        },
      }}
      variant="temporary"
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 0,
        }}
        onClick={onClose}
      >
        <img height={28} width={28} src={CloseIcon.src} alt="Menu Icon" />
      </IconButton>

      <Stack sx={{ height: '100%' }}>
        <Stack
          component="nav"
          spacing={2}
          sx={{
            flexGrow: 1,
            px: 2,
            mt: 2,
          }}
        >
          <StyledLink
            variant="button"
            color="text.primary"
            href={homeLink}
            sx={{
              fontWeight: 500,
            }}
          >
            Main
          </StyledLink>
          {navItems.map((item) => (
            <StyledLink
              key={item.title}
              variant="button"
              color="text.primary"
              href={item.path}
              sx={{
                fontWeight: 500,
              }}
            >
              {item.title}
            </StyledLink>
          ))}
        </Stack>
        <Box pl={2} pb={2}>
          <Socials />
        </Box>
      </Stack>
    </Drawer>
  );
};

MobileNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  navItems: PropTypes.array,
};
