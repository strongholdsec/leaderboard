import { IContest } from "types";
import { mainnet, polygon } from "wagmi/chains";

export const contests: IContest[] = [
    {
        id: 0,
        name: 'Farm Winter 2023',
        isFarm: true,
    },
    {
        id: 1,
        name: 'Farm Spring 2022',
        isFarm: true,
    },
    {
        id: 2,
        name: 'Farm Autumn 2022',
        isFarm: true,
    },
    {
        id: 3,
        name: 'Moonwell Contest',
        isFarm: false,
        fundUSD: 5000
    },
    {
        id: 4,
        name: 'Sidechain Oracles Contest',
        isFarm: false,
        fundUSD: 22500
    },
    {
        id: 5,
        name: 'Lido Contest',
        isFarm: false,
        fundUSD: 40000,
        bountyInfo: {
            chainId: mainnet.id,
            contractAddress: '0x6Ad587d6F15835C42d84B2E8d3b5b46DdA2c7957',
            tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            tokenDecimals: 18,
            tokenSymbol: 'DAI',
        }
    },
    {
        id: 6,
        name: 'Farm Spring 2023',
        isFarm: true,
    },
    {
        id: 7,
        name: 'Fathom Contest',
        isFarm: false,
        fundUSD: 5000,
        bountyInfo: {
            chainId: polygon.id,
            contractAddress: '0xaed2fc142fe31f3ed741f001a3c12f682c2daef0',
            tokenAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
            tokenDecimals: 6,
            tokenSymbol: 'USDT',
        }
    }
];
