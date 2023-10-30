import { Hex } from 'viem';

export type ITokenParams = {
  CTF: number;
  audit: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  rewards: number;
  uniqueCritical: number;
  uniqueHigh: number;
  uniqueMedium: number;
  uniqueLow: number;
};

export interface ICompetitionInfo {
  id: number;
  amount: bigint;
  weight: bigint;
  weightedAmount: bigint;
  params: ITokenParams;
}

export interface IAuditorResult {
  profile: {
    name: string;
    avatar: string;
    address: Hex
  },
  address: Hex;
  total: bigint;
  critical: number;
  high: number;
  medium: number;
  low: number;
  rewards: number;
  contests: number;
  competitionsInfo: ICompetitionInfo[];
}

export interface ICompetitionTopAuditor {
  address: Hex;
  amount: bigint;
  weight: bigint;
  weightedAmount: bigint;
}
export interface ICompetitionTop {
  id: number;
  top: ICompetitionTopAuditor[];
}

export interface IAuditorContacts {
  [auditor: string]: { [socialNetwork: string]: string };
}
