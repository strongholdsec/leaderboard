import {
  UseQueryResult,
  useQuery,
  QueryObserver,
  useQueryClient,
} from '@tanstack/react-query';
import { ContactContractConfig } from 'abis/Contacts';

import { EventArgs, EventNames } from 'eventemitter3';
import { useEffect, useState } from 'react';
import { STRATEGY_CONSTANT } from 'utils/cacheStrategies';
import { useContractEvent, usePublicClient } from 'wagmi';

import { IAuditorContacts } from '../types';
import { parseContactDetails } from '../utils/parseContactDetails';

const ContactRequestDetails = {
  ...ContactContractConfig,
  eventName: 'ContactsSet' as const,
};

const AuditorContactsQueryKey = ['query:contracts'];

const useAuditorsContactsRPCData = () => {
  const client = usePublicClient();

  return useQuery<IAuditorContacts, Error>(
    AuditorContactsQueryKey,
    async () => {
      try {
        const filter = await client.createContractEventFilter<
          typeof ContactRequestDetails.abi,
          EventNames<'ContactsSet'>,
          EventArgs<any, any>
        >({
          ...ContactRequestDetails,
          fromBlock: 'earliest',
          toBlock: 'latest',
        });

        const logs = await client.getFilterLogs<
          typeof ContactRequestDetails.abi,
          EventNames<'ContactsSet'>
        >({ filter });

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
        return {};
      }
    },
    STRATEGY_CONSTANT,
  );
};

export const useAuditorContacts = (): Omit<
  UseQueryResult<IAuditorContacts, Error>,
  'data'
> & { data: IAuditorContacts } => {
  const queryClient = useQueryClient();

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
    const observer = new QueryObserver<IAuditorContacts, Error>(queryClient, {
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

  return {
    ...result,
    data: contacts,
  };
};
