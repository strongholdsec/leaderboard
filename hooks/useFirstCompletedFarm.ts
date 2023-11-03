import compareDesc from 'date-fns/compareDesc';
import { useMemo } from 'react';

import { useAuditorResults } from './useAuditorResults';

export const useFirstCompletedFarm = (address: string) => {
  const { data: auditorData, isLoading } = useAuditorResults(address);

  const firstCompletedFarm = useMemo(() => {
    return auditorData?.farmsData.competitions.length >= 1
      ? auditorData.farmsData.competitions.sort((a, b) =>
          compareDesc(a.competition?.endDate ?? 0, b.competition?.endDate ?? 0),
        )[0]
      : undefined;
  }, [auditorData.farmsData.competitions]);

  return { data: firstCompletedFarm, isLoading };
};
