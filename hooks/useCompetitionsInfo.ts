import { CompetitionInfo, getCompetitionInfo } from 'config/competitions';
import { useMemo } from 'react';

import { useCompetitionIds } from './useCompetitionIds';

type CompetitionInfos = CompetitionInfo[] | undefined;

type CompetitionsInfoReturn = {
  data: CompetitionInfos;
  isLoading: boolean;
};

export const useCompetitionsInfo = (): CompetitionsInfoReturn => {
  const { data: competitionIds, isLoading } = useCompetitionIds();

  const competitionsInfo = useMemo(() => {
    const competitionInfos = competitionIds?.map((element) => {
      const competitionInfo = getCompetitionInfo(element);

      if (!competitionInfo) {
        console.warn(`Could not retrieve info for competition: ${element}`);
      }
      return competitionInfo;
    });
    return competitionInfos;
  }, [competitionIds]);

  return { data: competitionsInfo, isLoading };
};

export const useContests = (): CompetitionsInfoReturn => {
  const { data: competitionInfos, isLoading } = useCompetitionsInfo();

  const contestsInfo = useMemo(() => {
    return competitionInfos?.filter((element) => element.type === 'contest');
  }, [competitionInfos]);

  return { data: contestsInfo, isLoading };
};

export const useFarms = (): CompetitionsInfoReturn => {
  const { data: competitionInfos, isLoading } = useCompetitionsInfo();

  const farmsInfos = useMemo(() => {
    return competitionInfos?.filter((element) => element.type === 'farm');
  }, [competitionInfos]);

  return { data: farmsInfos, isLoading };
};
