import { useMemo, useState } from 'react';

import { IAuditorResult } from 'types';
import { descendingComparator } from 'utils/tableUtils';

import { useCompetitionsInfo } from './useCompetitionsInfo';
import { useCompetitionsResults } from './useCompetitionsResults';

export type CompetitionData = {
  competition: {
    id: number;
    name: string | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    imageSrc: string | undefined;
    type: 'farm' | 'contest' | undefined;
  };

  points: number;
  rewards: number;

  rank: {
    userRank: number | undefined;
    users: number | undefined;
  };

  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    uniqueCritical: number;
    uniqueHigh: number;
    uniqueMedium: number;
    uniqueLow: number;
  };
};

export type CompetitionTotal = {
  critical: number;
  high: number;
  medium: number;
  low: number;
  uniqueCritical: number;
  uniqueHigh: number;
  uniqueMedium: number;
  uniqueLow: number;
  rewards: number;
  points: number;
  competitions: CompetitionData[];
};

type ReturnValue = {
  rank: number | undefined;
  usersTotal: number | undefined;
  auditorInfo: IAuditorResult | undefined;
  totalData: CompetitionTotal;
  contestsData: CompetitionTotal;
  farmsData: CompetitionTotal;
};

export const useAuditorResults = (address: string) => {
  const { data: contestsInfo, isLoading: isContestInfoLoading } =
    useCompetitionsInfo();
  const { data: competitionsResults, isLoading: isCompetitionsResultsLoading } =
    useCompetitionsResults();

  const [isLoading, setIsLoading] = useState(false);
  const returnData: ReturnValue = useMemo(() => {
    const initialData = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      uniqueCritical: 0,
      uniqueHigh: 0,
      uniqueMedium: 0,
      uniqueLow: 0,
      rewards: 0,
      points: 0,
    };

    const returnValue: ReturnValue = {
      rank: undefined,
      usersTotal: undefined,
      totalData: { ...initialData, competitions: [] },
      contestsData: { ...initialData, competitions: [] },
      farmsData: { ...initialData, competitions: [] },
      auditorInfo: undefined,
    };

    setIsLoading(true);
    const index = competitionsResults?.totalResults
      ?.sort((a, b) => descendingComparator(a, b, 'total'))
      .findIndex((item) => item.address === address);
    if ((!index && index !== 0) || index === -1) return returnValue;

    returnValue.rank = index + 1;
    const auditorResults = competitionsResults?.totalResults?.[index];

    if (
      !auditorResults ||
      !competitionsResults.totalResults ||
      !competitionsResults.resultsByCompetition
    )
      return returnValue;

    returnValue.auditorInfo = auditorResults;
    returnValue.usersTotal = competitionsResults.totalResults.length;

    returnValue.totalData.critical = auditorResults.critical || 0;
    returnValue.totalData.high = auditorResults.high || 0;
    returnValue.totalData.medium = auditorResults.medium || 0;
    returnValue.totalData.low = auditorResults.low || 0;
    returnValue.totalData.uniqueCritical = auditorResults.uniqueCritical || 0;
    returnValue.totalData.uniqueHigh = auditorResults.uniqueHigh || 0;
    returnValue.totalData.uniqueMedium = auditorResults.uniqueMedium || 0;
    returnValue.totalData.uniqueLow = auditorResults.uniqueLow || 0;
    returnValue.totalData.points = Number(auditorResults.total) || 0;
    returnValue.totalData.rewards = Number(auditorResults.rewards) || 0;

    returnValue.totalData.competitions = auditorResults.competitionsInfo.map(
      (competition) => {
        const info = contestsInfo?.[competition.id];
        const competitionData =
          competitionsResults.resultsByCompetition?.[competition.id];

        const index = competitionData
          ?.sort((a, b) => descendingComparator(a, b, 'weightedAmount'))
          .findIndex((item) => item.address === address);

        const rank =
          (!index && index !== 0) || index === -1 ? undefined : index + 1;

        return {
          competition: {
            name: info?.name,
            startDate: info?.startDate,
            endDate: info?.endDate,
            imageSrc: info?.imageSrc,
            type: info?.type,
            id: competition.id,
          },
          rank: { userRank: rank, users: competitionData?.length },
          rewards: competition.params.rewards,
          points: Number(competition.weightedAmount),
          findings: {
            critical: competition.params.critical,
            high: competition.params.high,
            medium: competition.params.medium,
            low: competition.params.low,
            uniqueCritical: competition.params.uniqueCritical,
            uniqueHigh: competition.params.uniqueHigh,
            uniqueMedium: competition.params.uniqueMedium,
            uniqueLow: competition.params.uniqueLow,
          },
        };
      },
    );

    returnValue.totalData.competitions.forEach((competiton) => {
      if (competiton.competition.type === 'contest') {
        returnValue.contestsData.competitions.push(competiton);
      } else if (competiton.competition.type === 'farm') {
        returnValue.farmsData.competitions.push(competiton);
      }
    });

    const mapParams = (competitons: CompetitionData[]) =>
      competitons.reduce(
        (acc, value) => {
          return {
            critical: acc.critical + value.findings.critical,
            high: acc.high + value.findings.high,
            medium: acc.medium + value.findings.medium,
            low: acc.low + value.findings.low,
            uniqueCritical: acc.uniqueCritical + value.findings.uniqueCritical,
            uniqueHigh: acc.uniqueHigh + value.findings.uniqueHigh,
            uniqueMedium: acc.uniqueMedium + value.findings.uniqueMedium,
            uniqueLow: acc.uniqueLow + value.findings.uniqueLow,
            rewards: acc.rewards + value.rewards,
            points: acc.points + value.points,
          };
        },
        {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          uniqueCritical: 0,
          uniqueHigh: 0,
          uniqueMedium: 0,
          uniqueLow: 0,
          rewards: 0,
          points: 0,
        },
      );

    returnValue.contestsData = {
      ...returnValue.contestsData,
      ...mapParams(returnValue.contestsData.competitions),
    };

    returnValue.farmsData = {
      ...returnValue.farmsData,
      ...mapParams(returnValue.farmsData.competitions),
    };

    setIsLoading(false);

    return returnValue;
  }, [
    address,
    contestsInfo,
    competitionsResults?.resultsByCompetition,
    competitionsResults?.totalResults,
  ]);

  return {
    isLoading:
      isLoading || isContestInfoLoading || isCompetitionsResultsLoading,
    data: returnData,
  };
};
