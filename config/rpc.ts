export const getBackendRPCPath = (): string => {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/rpc`;
};
