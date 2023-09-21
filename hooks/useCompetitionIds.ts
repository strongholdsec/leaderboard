import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { usePublicClient } from 'wagmi';

import { SBTContractConfig } from '../abis/SBT';
import { STRATEGY_IMMUTABLE } from '../utils/cacheStrategies';

const SBTGetIdsDetails = {
  ...SBTContractConfig,
  functionName: 'getIds' as const,
};

export const useCompetitionIds = (): UseQueryResult<
  number[] | undefined,
  Error
> => {
  const client = usePublicClient();

  return useQuery<number[] | undefined, Error, number[] | undefined>(
    ['swr:competitions-ids'],
    async () => {
      try {
        const data = await client.readContract(SBTGetIdsDetails);
        return data.map((num: bigint) => Number(num));
      } catch (error) {
        console.warn(error);
      }
    },
    STRATEGY_IMMUTABLE,
  );
};
