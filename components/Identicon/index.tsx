import { CSSProperties, ForwardedRef, forwardRef } from 'react';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { IdenticonStyle } from './styles';

export type IdenticonProps = {
  address: string;
  diameter?: number;
  paperStyles?: CSSProperties;
  svgStyles?: CSSProperties;
};

export const Identicon = forwardRef(
  (
    { diameter = 24, address, paperStyles, svgStyles, ...rest }: IdenticonProps,
    ref?: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <IdenticonStyle {...rest} ref={ref}>
        <Jazzicon
          seed={jsNumberForAddress(address)}
          diameter={diameter}
          paperStyles={paperStyles}
          svgStyles={svgStyles}
        />
      </IdenticonStyle>
    );
  },
);
Identicon.displayName = 'Identicon';
