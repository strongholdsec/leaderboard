export const rpcUrls = {
  '1': `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
  '137': `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
} as { [chainId: string]: string };

export const getBackendRPCPath = (): string => {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/rpc`;
};
