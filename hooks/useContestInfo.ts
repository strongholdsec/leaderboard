import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SBTContractConfig } from 'abis/SBT';

import { usePublicClient } from 'wagmi';

import { IAuditorResult, ICompetitionTop } from './types';
import { STRATEGY_LAZY } from '../utils/cacheStrategies';

const SBTTransferEventDetails = {
  ...SBTContractConfig,
  eventName: 'TransferSingleStarted',
};

const SBTGetTokensDetails = {
  ...SBTContractConfig,
  functionName: 'getTokensData',
};

type ContestInfo = {
  competitionResults: ICompetitionTop[] | undefined;
  auditorResults: IAuditorResult[] | undefined;
};

export const useContestInfo = (): UseQueryResult<ContestInfo> => {
  const client = usePublicClient();

  // TODO: Update res on new events
  // useContractEvent({
  //   ...SBTTransferEventDetails,
  //   listener(setContactLog) {
  //   },
  // });

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryKey: ['swr:contest'],
    queryFn: async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filter = await client.createContractEventFilter({
          ...SBTTransferEventDetails,
          fromBlock: 'earliest',
          toBlock: 'latest',
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const mintLogs = await client.getFilterLogs({ filter });

        const ids: number[] = [];
        const users: string[] = [];
        const values: bigint[] = [];

        const uniqueUsers: string[] = [];
        const competitionIds: number[] = [];

        const userResults: { [address: string]: IAuditorResult } = {};
        const competitionResults: { [id: number]: ICompetitionTop } = {};

        const seenMints: { [mintId: string]: boolean } = {};

        for (const mint of mintLogs) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { to, id, value } = mint.args;
          if (!seenMints[`${to}_${id}`]) {
            ids.push(id);
            users.push(to);
            values.push(value);
            if (!uniqueUsers.includes(to)) {
              uniqueUsers.push(to);
            }
            seenMints[`${to}_${id}`] = true;
          }
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tokenDatas = await client.readContract({
          ...SBTGetTokensDetails,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          args: [ids, users],
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tokenDatas.forEach((tokenData, i) => {
          const weightedAmount = tokenData.weight * values[i];
          const competitionInfo = {
            id: ids[i],
            amount: values[i],
            weight: tokenData.weight,
            params: tokenData.params,
            weightedAmount,
          };

          if (!competitionIds.includes(competitionInfo.id))
            competitionIds.push(competitionInfo.id);

          if (!userResults[users[i]]) {
            userResults[users[i]] = {
              address: users[i],
              total: weightedAmount,
              competitions: [competitionInfo],
            };
          } else {
            userResults[users[i]].total += weightedAmount;
            userResults[users[i]].competitions.push(competitionInfo);
          }

          const participantInfo = {
            address: users[i],
            amount: values[i],
            weight: tokenData.weight,
            weightedAmount,
          };

          if (!competitionResults[ids[i]]) {
            competitionResults[ids[i]] = {
              id: ids[i],
              top: [participantInfo],
            };
          } else {
            competitionResults[ids[i]].top.push(participantInfo);
          }
        });

        const packedResults = uniqueUsers.map(
          (address) => userResults[address],
        );

        competitionIds.map((id) =>
          competitionResults[id].top.sort((a, b) =>
            a.weightedAmount < b.weightedAmount
              ? -1
              : a.weightedAmount > b.weightedAmount
              ? 1
              : 0,
          ),
        );

        const packedCompetitionResults = competitionIds.map(
          (id) => competitionResults[id],
        );

        return {
          competitionResults: packedCompetitionResults,
          auditorResults: packedResults,
        };
      } catch (error) {
        console.warn(error);
      }
    },
    ...STRATEGY_LAZY,
  });
};
