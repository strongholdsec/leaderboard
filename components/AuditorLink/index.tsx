import Link from 'next/link';

import { formatAddress } from 'utils/utils';

import { AuditorLinkContainer } from './styled';

export const AuditorLink = ({ address }: { address: string }) => {
  return (
    <AuditorLinkContainer>
      <Link
        href={{ pathname: '/auditor/[address]', query: { address } }}
        as={`/auditor/${address}`}
      >
        {formatAddress(address)}
      </Link>
    </AuditorLinkContainer>
  );
};
