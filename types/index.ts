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

export interface ICompetitionResults {
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
    address: Hex;
  };
  address: Hex;
  total: bigint;
  critical: number;
  high: number;
  medium: number;
  low: number;
  uniqueCritical: number;
  uniqueHigh: number;
  uniqueMedium: number;
  uniqueLow: number;
  rewards: number;
  competitions: number;
  competitionsInfo: ICompetitionResults[];
}

export interface ICompetitionAuditor {
  address: Hex;
  amount: bigint;
  weight: bigint;
  weightedAmount: bigint;
}

export interface IAuditorContacts {
  [auditor: string]: { [socialNetwork: string]: string };
}

export type CompetitionResult = { [id: number]: ICompetitionAuditor[] };

export type CompetitonResults = {
  resultsByCompetition: CompetitionResult | undefined;
  totalResults: IAuditorResult[] | undefined;
};
