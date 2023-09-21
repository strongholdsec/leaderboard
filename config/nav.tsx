export interface NavItem {
  external?: boolean;
  path?: string;
  title: string;
}

export const homeLink = 'https://strongholdsec.io';

export const navItems: NavItem[] = [
  {
    title: 'Reports',
    path: 'https://strongholdsec.io/#reports',
  },
  {
    title: 'Referral club',
    path: 'https://strongholdsec.io/referral-club',
  },
  {
    title: 'Leaderboard',
    path: 'https://leaderboard.strongholdsec.io',
  },
];
