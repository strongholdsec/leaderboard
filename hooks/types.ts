export interface ICompetitionInfo {
  id: number;
  amount: bigint;
  weight: bigint;
  weightedAmount: bigint;
  params: string[];
}

export interface IAuditorResult {
  address: string;
  total: bigint;
  competitions: ICompetitionInfo[];
}

export interface ICompetitionTopAuditor {
  address: string;
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
