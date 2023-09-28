import { LAST_CONTESTS_IDS_NUMBER } from 'config/constants';

import { IAuditorResult } from '../types';

export const getLastContestsResults = (
  data: IAuditorResult[],
  contestsIds: number[],
): IAuditorResult[] => {
  const lastContestIds = contestsIds.slice(-LAST_CONTESTS_IDS_NUMBER);

  return data.map((auditorResult) => {
    const lastContestResults = auditorResult.competitionsInfo.reduce(
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
      ...lastContestResults,
    };
  });
};
