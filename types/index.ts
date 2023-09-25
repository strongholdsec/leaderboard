import { Hex } from 'viem';

export type ITokenParams = {
  CTF: number;
  audit: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export interface ICompetitionInfo {
  id: number;
  amount: bigint;
  weight: bigint;
  weightedAmount: bigint;
  params: ITokenParams;
}

export interface IAuditorResult {
  address: Hex;
  total: bigint;
  critical: number;
  high: number;
  medium: number;
  low: number;
  contests: number;
  raisedUSD: number;
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

interface IContestBountyInfo {
  chainId: number;
  contractAddress: Hex;
  tokenAddress: Hex;  // @todo consider to store token infos by networks in config
  tokenDecimals: number;  //  @todo And link only token address here
  tokenSymbol: string;
}

export interface IContest {
  id: number;
  name: string;
  /* Farms are training contests with CTF but with no payments */
  isFarm: boolean;
  /* Total fund allocated for the competition in USD if allocated */
  fundUSD?: number;
  /* Optional additional bounty information used in rewards claim */
  bountyInfo?: IContestBountyInfo;
}
