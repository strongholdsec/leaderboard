import { Theme, useMediaQuery } from '@mui/material';

import { FC } from 'react';

import { navItems } from 'config/nav';

import { MobileNav } from './mobile-nav';
import { useMobileNav } from './mobile-nav/use-mobile-nav';
import { TopNav } from './top-nav';

export const Navigation: FC = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav onMobileNav={mobileNav.handleOpen} navItems={navItems} />
      {!lgUp && (
        <MobileNav
          onClose={mobileNav.handleClose}
          open={mobileNav.open}
          navItems={navItems}
        />
      )}
    </>
  );
};
