'use client';

import { useRouter } from 'next/navigation';

import { FC } from 'react';

import { isAddress } from 'viem';

import Profile from '../profile';
type PageProps = {
  address: string;
};

export const Page: FC<PageProps> = ({ address }) => {
  const isValidAddress = isAddress(address);

  const router = useRouter();
  if (!isValidAddress) {
    router.push('/404');
    return null;
  }

  return <Profile address={address} />;
};
