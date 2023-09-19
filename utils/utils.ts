import { useEffect, useState } from 'react';

export const getMedal = (top: number) =>
  top == 0 ? '🥇' : top == 1 ? '🥈' : top == 2 ? '🥉' : '';

export const formatAddress = (address: string, symbols = 3): string => {
  if (symbols <= 0) return '';
  if (symbols * 2 >= address.length) return address;

  const left = address.slice(0, symbols);
  const right = address.slice(-symbols);

  return `${left}...${right}`;
};

export const competitionNames: { [id: number]: string } = {
  0: 'Farm Winter 2023',
  1: 'Farm Spring 2022',
  2: 'Farm Autumn 2022',
  3: 'Moonwell Contest',
  4: 'Sidechain Oracles Contest',
  5: 'Lido Contest',
  6: 'Farm Spring 2023',
};

export const guessCompetitionName = (id: number) => {
  return competitionNames?.[id] || '???';
};

export const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
