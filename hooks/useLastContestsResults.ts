import { compareAsc } from 'date-fns';
import { useMemo, useState } from 'react';

import { LAST_CONTESTS_IDS_NUMBER } from 'config/constants';

import { useContests } from './useCompetitionsInfo';
import { useCompetitionsResults } from './useCompetitionsResults';

export const useLastContestsResults = () => {
  const { data, isLoading: isContestResultsLoading } = useCompetitionsResults();
  const contests = useContests();

  const [isLoading, setIsLoading] = useState(false);

  const returnValue = useMemo(() => {
    if (!contests.data || !data?.totalResults)
      return { lastContestIds: undefined, lastContestsResults: undefined };

    setIsLoading(true);

    const lastContestIds = contests.data
      .sort((a, b) => compareAsc(a.endDate, b.endDate))
      .slice(-LAST_CONTESTS_IDS_NUMBER)
      .map((elem) => elem.id);

    const lastContestsResults = data?.totalResults.map((auditorResult) => {
      const auditorRes = auditorResult.competitionsInfo.reduce(
        (accumulator, currentValue) => {
          if (lastContestIds.includes(currentValue.id)) {
            accumulator.total += currentValue.weightedAmount;
            accumulator.rewards += currentValue.params.rewards;
            accumulator.critical += currentValue.params.critical;
            accumulator.high += currentValue.params.high;
            accumulator.medium += currentValue.params.medium;
            accumulator.low += currentValue.params.low;
            accumulator.contests += 1;
          }
          return accumulator;
        },
        {
          total: BigInt(0),
          rewards: 0,
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          contests: 0,
        },
      );

      return {
        ...auditorResult,
        ...auditorRes,
      };
    });

    setIsLoading(false);

    return {
      lastContestIds,
      lastContestsResults,
    };
  }, [contests.data, data?.totalResults]);

  return {
    data: returnValue,
    isLoading: isContestResultsLoading || isLoading,
  };
};
