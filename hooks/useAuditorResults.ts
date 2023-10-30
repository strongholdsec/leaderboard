import { CompetitionInfo } from 'config/competitions';
import { useMemo, useState } from 'react';

import { descendingComparator } from 'utils/tableUtils';

import { IAuditorResult } from 'types';

import { useCompetitionsInfo } from './useCompetitionsInfo';
import { useContestResults } from './useContestResults';

export type AuditorContestsResult = {
  contest: CompetitionInfo;
  rank: {
    user: number | undefined;
    total: number | undefined;
  };
  points: bigint;
  rewards: number;
  findings: {
    issues: [number, number, number, number];
    uniqueFindings: [number, number, number, number];
  };
};

export type AuditorFarmsResult = {
  contest: CompetitionInfo;
  rank: {
    user: number | undefined;
    total: number | undefined;
  };
  CTFPoints: number;
  auditPoints: number;
  findings: {
    issues: [number, number, number, number];
    uniqueFindings: [number, number, number, number];
  };
};

type ReturnValue = {
  rank: number | undefined;
  top: number | undefined;
  auditorFarmsResults: AuditorFarmsResult[] | undefined;
  auditorContestsResuls: AuditorContestsResult[] | undefined;
  auditorResults: IAuditorResult | undefined;
};

export const useAuditorResults = (address: string) => {
  const { data: contestsInfo, isLoading: isContestInfoLoading } =
    useCompetitionsInfo();
  const { data: contestsResults, isLoading: isContestResultsLoading } =
    useContestResults();

  const [isLoading, setIsLoading] = useState(false);
  const returnData: ReturnValue = useMemo(() => {
    const returnValue: ReturnValue = {
      rank: undefined,
      top: undefined,
      auditorContestsResuls: undefined,
      auditorFarmsResults: undefined,
      auditorResults: undefined,
    };

    setIsLoading(true);
    const index = contestsResults?.totalResults
      ?.sort((a, b) => descendingComparator(a, b, 'total'))
      .findIndex((item) => item.address === address);
    if ((!index && index !== 0) || index === -1) return returnValue;

    returnValue.rank = index + 1;
    const auditorResults = contestsResults?.totalResults?.[index];

    if (
      !auditorResults ||
      !contestsResults.totalResults ||
      !contestsResults.resultsByCompetition
    )
      return returnValue;

    returnValue.top =
      (returnValue.rank / contestsResults?.totalResults?.length) * 100;

    const auditorFarmsResults: AuditorFarmsResult[] = [];
    const auditorContestsResuls: AuditorContestsResult[] = [];

    returnValue.auditorResults = auditorResults;

    auditorResults.competitionsInfo.forEach((result) => {
      const contestInfo = contestsInfo?.[result.id];
      const contestData = contestsResults.resultsByCompetition?.[result.id];

      const index = contestData
        ?.sort((a, b) => descendingComparator(a, b, 'weightedAmount'))
        .findIndex((item) => item.address === address);

      const rank =
        (!index && index !== 0) || index === -1 ? undefined : index + 1;

      if (contestInfo?.type === 'farm') {
        auditorFarmsResults.push({
          contest: contestInfo,
          rank: { user: rank, total: contestData?.length },
          CTFPoints: result.params.CTF,
          auditPoints: result.params.audit,
          findings: {
            issues: [
              result.params.critical,
              result.params.high,
              result.params.medium,
              result.params.low,
            ],
            uniqueFindings: [0, 0, 0, 0],
          },
        });
      }

      if (contestInfo?.type === 'contest')
        auditorContestsResuls.push({
          contest: contestInfo,
          rank: { user: rank, total: contestData?.length },
          points: result.weightedAmount,
          rewards: result.params.rewards,
          findings: {
            issues: [
              result.params.critical,
              result.params.high,
              result.params.medium,
              result.params.low,
            ],
            uniqueFindings: [0, 0, 0, 0],
          },
        });
    });

    returnValue.auditorContestsResuls = auditorContestsResuls;
    returnValue.auditorFarmsResults = auditorFarmsResults;

    setIsLoading(false);

    return returnValue;
  }, [
    address,
    contestsInfo,
    contestsResults?.resultsByCompetition,
    contestsResults?.totalResults,
  ]);

  return {
    isLoading: isLoading || isContestInfoLoading || isContestResultsLoading,
    data: returnData,
  };
};
