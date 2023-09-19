import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { usePublicClient } from 'wagmi';

import { SBTContractConfig } from '../abis/SBT';
import { STRATEGY_IMMUTABLE } from '../utils/cacheStrategies';

const SBTGetIdsDetails = {
  ...SBTContractConfig,
  functionName: 'getIds',
};

export const useCompetitionIds = (): UseQueryResult<number[]> => {
  const client = usePublicClient();

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryKey: ['swr:competitions-ids'],
    queryFn: async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const data = await client.readContract(SBTGetIdsDetails);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return data.map((num: bigint) => Number(num));
      } catch (error) {
        console.warn(error);
      }
    },
    ...STRATEGY_IMMUTABLE,
  });
};
