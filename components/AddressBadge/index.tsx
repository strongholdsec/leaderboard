import { ForwardedRef, forwardRef } from 'react';

import { AccountIcon, AccountProps } from 'components/AccountIcon';

import { formatAddress } from 'utils/utils';

import { IdenticonBadgeStyle, AddressWrapperStyle } from './styles';

export type AddressBadgeProps = AccountProps & {
  name: string;
  symbols?: number;
};

export const AddressBadge = forwardRef(
  (
    {
      symbols = 3,
      height,
      address,
      paperStyles,
      svgStyles,
      name,
      avatar,
      ...rest
    }: AddressBadgeProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <IdenticonBadgeStyle {...rest} ref={ref}>
        <AccountIcon
          height={height}
          avatar={avatar}
          address={address}
          paperStyles={paperStyles}
          svgStyles={svgStyles}
        />
        {symbols > 0 ? (
          <AddressWrapperStyle>
            {name || formatAddress(address, symbols)}
          </AddressWrapperStyle>
        ) : (
          ''
        )}
      </IdenticonBadgeStyle>
    );
  },
);
AddressBadge.displayName = 'AddressBadge';
