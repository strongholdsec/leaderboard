import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { EventArgs, EventNames } from 'eventemitter3';

import { Hex } from 'viem';

import { usePublicClient } from 'wagmi';

import { MultiEnsResolverContractConfig } from 'abis/MultiEnsResolver';
import { SBTContractConfig } from 'abis/SBT';

import { parseAvatarLink } from 'utils/parseAvatarLink';

import { IAuditorResult, ICompetitionAuditor } from '../types';
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

type CompetitionResult = { [id: number]: ICompetitionAuditor[] };

export type CompetitonResults = {
  resultsByCompetition: CompetitionResult | undefined;
  totalResults: IAuditorResult[] | undefined;
};

export const useCompetitionsResults = (): UseQueryResult<
  CompetitonResults,
  Error
> => {
  const client = usePublicClient();
  const clientMainnet = usePublicClient({ chainId: 1 });

  // TODO: Update res on new events
  // useContractEvent({
  //   ...SBTTransferEventDetails,
  //   listener(setContactLog) {
  //   },
  // });
  // Turns out we don't realy need constant updating of that info,
  // because it fills out only after a contest, not during one

  return useQuery<CompetitonResults, Error, CompetitonResults>(
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
        const competitionResults: { [id: number]: ICompetitionAuditor[] } = {};

        const seenMints: { [mintId: string]: boolean } = {};

        for (const mint of mintLogs) {
          const { to, id, value } = mint['args'];
          if (!seenMints[`${to}_${id}`]) {
            ids.push(id!);
            users.push(to!);
            values.push(value!);
            if (!uniqueUsers.includes(to!)) {
              uniqueUsers.push(to!);
            }
            seenMints[`${to}_${id}`] = true;
          }
        }

        const tokenDatas = await client.readContract({
          ...SBTGetTokensDetails,
          args: [ids, users],
        });

        tokenDatas.forEach((tokenData, i) => {
          const competitionId = Number(ids[i]);
          const weightedAmount = tokenData.weight * values[i];
          const params = parseTokenParams(tokenData.params);

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
              profile: {
                address: users[i],
                name: '',
                avatar: '',
              },
              address: users[i],
              total: weightedAmount,
              critical: params.critical,
              high: params.high,
              medium: params.medium,
              low: params.low,
              rewards: params.rewards,
              uniqueCritical: params.uniqueCritical,
              uniqueHigh: params.uniqueHigh,
              uniqueMedium: params.uniqueMedium,
              uniqueLow: params.uniqueLow,
              competitions: 1,
              competitionsInfo: [competitionInfo],
            };
          } else {
            userResults[users[i]].total += weightedAmount;
            userResults[users[i]].critical += params.critical;
            userResults[users[i]].high += params.high;
            userResults[users[i]].medium += params.medium;
            userResults[users[i]].low += params.low;
            userResults[users[i]].rewards += params.rewards;
            userResults[users[i]].competitions += 1;
            userResults[users[i]].uniqueCritical += params.uniqueCritical;
            userResults[users[i]].uniqueHigh += params.uniqueHigh;
            userResults[users[i]].uniqueMedium += params.uniqueMedium;
            userResults[users[i]].uniqueLow += params.uniqueLow;

            userResults[users[i]].competitionsInfo.push(competitionInfo);
          }

          const participantInfo = {
            address: users[i],
            amount: values[i],
            weight: tokenData.weight,
            weightedAmount,
          };

          if (!competitionResults[competitionId]) {
            competitionResults[competitionId] = [participantInfo];
          } else {
            competitionResults[competitionId].push(participantInfo);
          }
        });

        const EnsResolveAddressesDetails = {
          ...MultiEnsResolverContractConfig,
          functionName: 'resolveAddresses' as const,
        };

        const [names, avatars] = (await clientMainnet.readContract({
          ...EnsResolveAddressesDetails,
          args: [uniqueUsers, ['avatar']],
        })) as [string[], string[]];

        const packedResults = uniqueUsers.map((address, i) => {
          userResults[address].profile.name = names[i];
          userResults[address].profile.avatar = parseAvatarLink(avatars[i][0]);
          return userResults[address];
        });

        // Sort all competition scores for every competition
        // TODO: are we going with weightedAmount or with amount?
        competitionIds.map((id) =>
          competitionResults[id].sort((a, b) =>
            a.weightedAmount < b.weightedAmount
              ? -1
              : a.weightedAmount > b.weightedAmount
              ? 1
              : 0,
          ),
        );

        const packedCompetitionResults = competitionIds.reduce(
          (acc, val) => ({ ...acc, [val]: competitionResults[val] }),
          {} as CompetitionResult,
        );

        return {
          resultsByCompetition: packedCompetitionResults,
          totalResults: packedResults,
        };
      } catch (error) {
        console.warn(error);
        return {
          totalResults: undefined,
          resultsByCompetition: undefined,
        };
      }
    },
    {
      ...STRATEGY_LAZY,
    },
  );
};
