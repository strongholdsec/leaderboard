import { ForwardedRef, forwardRef } from 'react';

import { formatAddress } from 'utils/utils';

import { IdenticonBadgeStyle, AddressWrapperStyle } from './styles';
import { Identicon, IdenticonProps } from '../Identicon';

export type AddressBadgeProps = {
  name: string;
  avatar: string;
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
      name,
      avatar,
      ...rest
    }: AddressBadgeProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <IdenticonBadgeStyle {...rest} ref={ref}>
        {avatar != '' ? (
          <img
            alt={'avatar'}
            src={avatar}
            style={{ width: 24, height: 24, borderRadius: 20 }}
          ></img>
        ) : (
          <Identicon
            address={address}
            diameter={diameter}
            paperStyles={paperStyles}
            svgStyles={svgStyles}
          />
        )}

        {name || symbols > 0 ? (
          <AddressWrapperStyle>
            {name ? name : formatAddress(address, symbols)}
          </AddressWrapperStyle>
        ) : (
          ''
        )}
      </IdenticonBadgeStyle>
    );
  },
);
AddressBadge.displayName = 'AddressBadge';
