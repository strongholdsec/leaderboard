import { useMemo, useState } from 'react';

import { descendingComparator } from 'utils/tableUtils';

import { useLastContestsResults } from './useLastContestsResults';

export const useLastContestsAuditorResults = (address: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: isLastContestsResultsLoading } =
    useLastContestsResults();

  const [lastContestsRank, lastContestsUsers] = useMemo(() => {
    setIsLoading(true);

    const index = data?.lastContestsResults
      ?.sort((a, b) => descendingComparator(a, b, 'total'))
      .findIndex((item) => item.address === address);
    if (!index && index !== 0) return [undefined, undefined];

    const lastContestsRank = index + 1;
    const lastContestsUsers =
      data.lastContestsResults?.filter((competition) =>
        competition.competitionsInfo.some((r) =>
          data.lastContestIds.includes(r.id),
        ),
      ).length ?? 0;

    setIsLoading(false);

    return [lastContestsRank, lastContestsUsers];
  }, [address, data.lastContestIds, data.lastContestsResults]);

  return {
    data: { lastContestsRank, lastContestsUsers },
    isLoading: isLoading || isLastContestsResultsLoading,
  };
};
