import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { socials } from 'config/socials';
import Image from 'next/image';
import React, { FC } from 'react';

type SocialIconProps = {
  src: string;
  link: string;
};

export const SocialIcon: FC<SocialIconProps> = ({ src, link }) => (
  <IconButton target="_blank" rel="noreferrer noopener" href={link}>
    <Image alt="Social-icon" height={32} width={32} src={src} />
  </IconButton>
);

export const Socials = React.memo(() => (
  <Stack pb={2} direction="row">
    {socials.map((item) => {
      return <SocialIcon key={item.link} link={item.link} src={item.icon} />;
    })}
  </Stack>
));

Socials.displayName = 'Socials';
