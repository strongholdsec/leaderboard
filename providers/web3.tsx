'use client';
import { polygon, mainnet } from '@wagmi/core/chains';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import React, { FC, PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { getBackendRPCPath } from '../config/rpc';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, mainnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `${getBackendRPCPath()}/${chain.id}`
      })
    }),
    publicProvider(),
  ],
);

const client = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: process.env.NEXT_PUBLIC_WALLECTCONNECT_PROJECT_ID!,
    chains,
  }),
  publicClient,
  webSocketPublicClient,
});

const ethereumClient = new EthereumClient(client, chains);

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={client}>{children}</WagmiConfig>
      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLECTCONNECT_PROJECT_ID!}
        ethereumClient={ethereumClient}
      />
    </>
  );
};
