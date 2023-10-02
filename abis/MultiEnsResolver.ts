import { MULTI_ENS_RESOLVER_ADDRESS } from "config/contracts";

const MULTI_ENS_RESOLVER_ABI = [
    {
        inputs: [
            {
                internalType: "address[]",
                name: "addresses",
                type: "address[]"
            },
            {
                internalType: "string[]",
                name: "textFields",
                type: "string[]"
            }
        ],
        name: "resolveAddresses",
        outputs: [
            {
                internalType: "string[]",
                name: "names",
                type: "string[]"
            },
            {
                internalType: "string[][]",
                name: "textRecords",
                type: "string[][]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
];

export const MultiEnsResolverContractConfig = {
  address: MULTI_ENS_RESOLVER_ADDRESS,
  abi: MULTI_ENS_RESOLVER_ABI,
} as const;
