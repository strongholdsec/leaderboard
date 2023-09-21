import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { SBTContractConfig } from 'abis/SBT';

import { EventArgs, EventNames } from 'eventemitter3';
import { Hex } from 'viem';
import { usePublicClient } from 'wagmi';

import { IAuditorResult, ICompetitionTop } from '../types';
import { STRATEGY_LAZY } from '../utils/cacheStrategies';
import { parseTokenParams } from '../utils/parseTokenParams';

const SBTTransferEventDetails = {
  ...SBTContractConfig,
  eventName: 'TransferSingleStarted' as const,
};

const SBTGetTokensDetails = {
  ...SBTContractConfig,
  functionName: 'getTokensData' as const,
};

type ContestInfo = {
  competitionResults: ICompetitionTop[] | undefined;
  auditorResults: IAuditorResult[] | undefined;
};

export const useContestInfo = (): UseQueryResult<ContestInfo, Error> => {
  const client = usePublicClient();

  // TODO: Update res on new events
  // useContractEvent({
  //   ...SBTTransferEventDetails,
  //   listener(setContactLog) {
  //   },
  // });

  return useQuery<ContestInfo, Error, ContestInfo>(
    ['swr:contest'],
    async () => {
      try {
        const filter = await client.createContractEventFilter<
          typeof SBTTransferEventDetails.abi,
          EventNames<'TransferSingleStarted'>,
          EventArgs<any, any>
        >({
          ...SBTTransferEventDetails,
          fromBlock: 'earliest',
          toBlock: 'latest',
        });

        const mintLogs = await client.getFilterLogs<
          typeof SBTTransferEventDetails.abi,
          EventNames<'TransferSingleStarted'>
        >({ filter });

        const ids: bigint[] = [];
        const users: Hex[] = [];
        const values: bigint[] = [];

        const uniqueUsers: Hex[] = [];
        const competitionIds: number[] = [];

        const userResults: { [address: string]: IAuditorResult } = {};
        const competitionResults: { [id: number]: ICompetitionTop } = {};

        const seenMints: { [mintId: string]: boolean } = {};

        for (const mint of mintLogs) {
          const { to, id, value } = mint['args'];
          if (to && id && value && !seenMints[`${to}_${id}`]) {
            ids.push(id);
            users.push(to);
            values.push(value);
            if (!uniqueUsers.includes(to)) {
              uniqueUsers.push(to);
            }
            seenMints[`${to}_${id}`] = true;
          }
        }

        const tokenDatas = await client.readContract({
          ...SBTGetTokensDetails,
          args: [ids, users],
        });

        tokenDatas.forEach((tokenData, i) => {
          const weightedAmount = tokenData.weight * values[i];
          const params = parseTokenParams(tokenData.params);

          const competitionId = Number(ids[i]);
          const competitionInfo = {
            id: competitionId,
            amount: values[i],
            weight: tokenData.weight,
            params,
            weightedAmount,
          };

          if (!competitionIds.includes(competitionId))
            competitionIds.push(competitionId);

          if (!userResults[users[i]]) {
            userResults[users[i]] = {
              address: users[i],
              total: weightedAmount,
              critical: params.critical,
              high: params.high,
              medium: params.medium,
              low: params.low,
              contests: 1,
              competitionsInfo: [competitionInfo],
            };
          } else {
            userResults[users[i]].total += weightedAmount;
            userResults[users[i]].critical += params.critical;
            userResults[users[i]].high += params.high;
            userResults[users[i]].medium += params.medium;
            userResults[users[i]].low += params.low;
            userResults[users[i]].contests += 1;

            userResults[users[i]].competitionsInfo.push(competitionInfo);
          }

          const participantInfo = {
            address: users[i],
            amount: values[i],
            weight: tokenData.weight,
            weightedAmount,
          };

          if (!competitionResults[competitionId]) {
            competitionResults[competitionId] = {
              id: competitionId,
              top: [participantInfo],
            };
          } else {
            competitionResults[competitionId].top.push(participantInfo);
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
        return {
          auditorResults: undefined,
          competitionResults: undefined,
        };
      }
    },
    {
      ...STRATEGY_LAZY,
    },
  );
};
