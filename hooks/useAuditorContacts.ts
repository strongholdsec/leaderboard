import {
  UseQueryResult,
  useQuery,
  QueryObserver,
  useQueryClient,
} from '@tanstack/react-query';
import { ContactContractConfig } from 'abis/Contacts';

import { useEffect, useState } from 'react';
import { STRATEGY_CONSTANT } from 'utils/cacheStrategies';
import { hexToString } from 'viem';
import { useContractEvent, usePublicClient } from 'wagmi';

import { IAuditorContacts } from './types';

const ContactRequestDetails = {
  ...ContactContractConfig,
  eventName: 'ContactsSet',
};

const parseContactDetails = (contactInfo: any) => {
  const { socialNetwork, contact } = contactInfo.args;

  const socialData = {};
  for (let i = 0; i < socialNetwork.length; i++) {
    const network = hexToString(socialNetwork[i], { size: 32 });
    const parsedLink = hexToString(contact[i], { size: 32 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socialData[network] =
      parsedLink === '\x00'
        ? undefined
        : parsedLink
            .replace('@', '')
            .replace('https://t.me/', '')
            .replace('https://twitter.com/', '')
            .replace('https://github.com/', '');
  }

  return socialData;
};

const AuditorContactsQueryKey = ['query:contracts'];

const useAuditorsContactsRPCData = () => {
  const client = usePublicClient();

  // TODO: fix type problems
  return useQuery<IAuditorContacts, Error>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryKey: AuditorContactsQueryKey,
    queryFn: async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const filter = await client.createContractEventFilter({
          ...ContactRequestDetails,
          fromBlock: 'earliest',
          toBlock: 'latest',
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const logs = await client.getFilterLogs({ filter });
        const newContacts: IAuditorContacts = {};
        logs.forEach((contactInfo) => {
          const { auditor } = contactInfo['args'];
          if (auditor) {
            const auditorData = newContacts[auditor] ?? {};
            const newData = parseContactDetails(contactInfo);
            newContacts[auditor] = {
              ...auditorData,
              ...newData,
            };
          }
        });

        return newContacts;
      } catch (error) {
        console.warn(error);
      }
    },
    ...STRATEGY_CONSTANT,
  });
};

export const useAuditorContacts = (): UseQueryResult<
  IAuditorContacts,
  Error
> => {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useContractEvent({
    ...ContactRequestDetails,
    listener(setContactLog: any) {
      const { auditor } = setContactLog['args'];
      const newData = parseContactDetails(setContactLog);

      queryClient.setQueryData(
        AuditorContactsQueryKey,
        (prevData: IAuditorContacts | undefined) => ({
          ...(prevData ?? {}),
          [auditor]: newData,
        }),
      );
    },
  });

  const result = useAuditorsContactsRPCData();

  const [contacts, setContacts] = useState<IAuditorContacts>(() => {
    const data = queryClient.getQueryData<IAuditorContacts>(
      AuditorContactsQueryKey,
    );
    return data ?? {};
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const observer = new QueryObserver<IAuditorContacts>(queryClient, {
      queryKey: AuditorContactsQueryKey,
      // Pass the exact same caching properties here as to useQuery
      ...STRATEGY_CONSTANT,
    });

    const unsubscribe = observer.subscribe((result) => {
      if (result.data) setContacts(result.data);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    ...result,
    data: contacts,
  };
};
