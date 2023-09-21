'use client';

import { Stack } from '@mui/material';
import { useAuditorContacts } from 'hooks/useAuditorContacts';
import Image from 'next/image';
import { FC, useMemo } from 'react';

type SocialIconProps = {
  link: string;
};

export const Telegram: FC<SocialIconProps> = ({ link }) => (
  <a href={`https://t.me/${link}`}>
    <Image
      src="/icons/telegram.svg"
      alt="Telegram"
      width={16}
      height={16}
      style={{ cursor: 'pointer' }}
    ></Image>
  </a>
);

export const Twitter: FC<SocialIconProps> = ({ link }) => (
  <a href={`https://twitter.com/${link}`}>
    <Image
      src="/icons/twitter.svg"
      alt="Twitter"
      width={16}
      height={16}
      style={{ cursor: 'pointer' }}
    ></Image>
  </a>
);

export const Github: FC<SocialIconProps> = ({ link }) => (
  <a href={`https://github.com/${link}`}>
    <Image
      src="/icons/github.svg"
      alt="Github"
      width={16}
      height={16}
      style={{ cursor: 'pointer' }}
    ></Image>
  </a>
);

type SocialProps = {
  address: string;
};

export const Socials: FC<SocialProps> = ({ address }) => {
  const auditorContacts = useAuditorContacts();
  const { telegram, github, twitter } = useMemo(
    () => auditorContacts.data?.[address] ?? {},
    [auditorContacts.data, address],
  );

  return (
    <Stack direction="row" spacing={1}>
      {telegram && <Telegram link={telegram} />}
      {twitter && <Twitter link={twitter} />}
      {github && <Github link={github} />}
    </Stack>
  );
};
