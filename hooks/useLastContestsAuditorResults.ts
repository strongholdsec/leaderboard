import { useMemo, useState } from 'react';

import { descendingComparator } from 'utils/tableUtils';

import { useLastContestsResults } from './useLastContestsResults';

export const useLastContestsAuditorResults = (address: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: lastContestsResults, isLoading: isLastContestsResultsLoading } =
    useLastContestsResults();

  const [lastContestsRank, lastContestsTotal] = useMemo(() => {
    setIsLoading(true);

    const index = lastContestsResults
      ?.sort((a, b) => descendingComparator(a, b, 'total'))
      .findIndex((item) => item.address === address);
    if (!index && index !== 0) return [undefined, undefined];

    const lastContestsRank = index + 1;
    const lastContestsTotal = lastContestsResults?.[index].total;

    setIsLoading(false);

    return [lastContestsRank, lastContestsTotal];
  }, [address, lastContestsResults]);

  return {
    data: { lastContestsRank, lastContestsTotal },
    isLoading: isLoading || isLastContestsResultsLoading,
  };
};
