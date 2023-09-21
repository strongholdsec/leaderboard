import { Hex, hexToString } from 'viem';

import { ITokenParams } from 'types';

export const parseTokenParams = (params: readonly Hex[]): ITokenParams => {
  const data = params.map((token) => hexToString(token, { size: 32 }));

  switch (data.length) {
    // CTF, Audit, critical, high, medium, low
    case 6:
      return {
        CTF: parseInt(data[0]),
        audit: parseInt(data[1]),
        critical: parseInt(data[2]),
        high: parseInt(data[3]),
        medium: parseInt(data[4]),
        low: parseInt(data[5]),
      };
    // critical, high, medium, low
    case 4:
      return {
        CTF: 0,
        audit: 0,
        critical: parseInt(data[0]),
        high: parseInt(data[1]),
        medium: parseInt(data[2]),
        low: parseInt(data[3]),
      };
    default:
      return {
        CTF: 0,
        audit: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      };
  }
};
