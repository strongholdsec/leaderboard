import { ForwardedRef, forwardRef } from 'react';

import { formatAddress } from 'utils/utils';

import { IdenticonBadgeStyle, AddressWrapperStyle } from './styles';
import { Identicon, IdenticonProps } from '../Identicon';

export type AddressBadgeProps = {
  symbols?: number;
} & IdenticonProps;

export const AddressBadge = forwardRef(
  (
    {
      symbols = 3,
      diameter,
      address,
      paperStyles,
      svgStyles,
      ...rest
    }: AddressBadgeProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <IdenticonBadgeStyle {...rest} ref={ref}>
        <Identicon
          address={address}
          diameter={diameter}
          paperStyles={paperStyles}
          svgStyles={svgStyles}
        />
        {symbols > 0 ? (
          <AddressWrapperStyle>
            {formatAddress(address, symbols)}
          </AddressWrapperStyle>
        ) : (
          ''
        )}
      </IdenticonBadgeStyle>
    );
  },
);
AddressBadge.displayName = 'AddressBadge';
