import {ETHEREUM_MAINNET, POLYGON_MAINNET} from "../constant";

export const Network = {
    polygonMainnet: "POLYGON",
    ethereumMainnet: "ETHEREUM",
    unsupportedChain: "Unsupported Chain",
};

export interface NetworkType {
    chainId: number;
    rpcUrl: string;
    baseApiUrl: string;
    baseExplorerUrl: string;
    connectInfo: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        blockExplorerUrls: string[];
        nativeCurrency: {
            symbol: string; // 2-6 characters long
            decimals: number;
        };
    };
    film?: {
        contractAddress: string;
        abi: any[];
    };
}


const networkConfig: { [x: number]: NetworkType } = {
    [ETHEREUM_MAINNET]: {
        chainId: ETHEREUM_MAINNET,
        rpcUrl: "https://eth.llamarpc.com",
        baseApiUrl: "https://blockscout.com/eth/mainnet/api",
        baseExplorerUrl: "https://etherscan.io",
        connectInfo: {
            chainId: "0x1",
            chainName: "Ethereum Mainnet",
            rpcUrls: ["https://mainnet.infura.io/v3/"],
            blockExplorerUrls: ["https://testnet.cronoscan.com/"],
            nativeCurrency: {
                symbol: "ETH", // 2-6 characters long
                decimals: 18,
            },
        },
        film: {
            contractAddress: "0xdb4Fe5a8a446Dfd2811Ec12F7ae918D75b29b1B4",
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "mintTo",
                            "type": "address"
                        }
                    ],
                    "name": "mint",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "MintNft",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        },
    },
    [POLYGON_MAINNET]: {
        chainId: POLYGON_MAINNET,
        rpcUrl: "https://rpc-mainnet.maticvigil.com",
        baseApiUrl: "https://api.polygonscan.com/api",
        baseExplorerUrl: "https://polygonscan.com",
        connectInfo: {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
            blockExplorerUrls: ["https://polygonscan.com/"],
            nativeCurrency: {
                symbol: "MATIC", // 2-6 characters long
                decimals: 18,
            },
        },
        film: {
            contractAddress: "0xEdc2E4c9fa10C4859246a876397f33273D813535",
            abi: [
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "approved",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "approved",
                            "type": "bool"
                        }
                    ],
                    "name": "ApprovalForAll",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "by",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "MintedFromEth",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "by",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "TipGiven",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "tokenIds",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "adminMintMultipleSpecificTo",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "adminMintTo",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account_",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "baseURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "claimBtgoFree",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "claimFree",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "claimReserved",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getApproved",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "operator",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getBlockTimestamp",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getBtgoClaimed",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getBtgoFreeClaimsRemaining",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getClaimFreeRemaining",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getCurrentIndex",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getMaxSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPublicMintPrice",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getReservedTokens",
                    "outputs": [
                        {
                            "internalType": "uint256[]",
                            "name": "",
                            "type": "uint256[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getTotalBtgoFreeClaimsRemaining",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "initialize",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner_",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "operator_",
                            "type": "address"
                        }
                    ],
                    "name": "isApprovedForAll",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "addr",
                            "type": "address"
                        }
                    ],
                    "name": "isContract",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "addr",
                            "type": "address"
                        }
                    ],
                    "name": "isERC721Contract",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "isPaused",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        }
                    ],
                    "name": "mintFromEth",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        }
                    ],
                    "name": "ownerOf",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "pause",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tipAmount",
                            "type": "uint256"
                        }
                    ],
                    "name": "publicMintToWithTip",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "salePrice",
                            "type": "uint256"
                        }
                    ],
                    "name": "royaltyInfo",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from_",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from_",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data_",
                            "type": "bytes"
                        }
                    ],
                    "name": "safeTransferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "operator_",
                            "type": "address"
                        },
                        {
                            "internalType": "bool",
                            "name": "approved_",
                            "type": "bool"
                        }
                    ],
                    "name": "setApprovalForAll",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "baseUri",
                            "type": "string"
                        }
                    ],
                    "name": "setBaseURI",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address[]",
                            "name": "accounts",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "amounts",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "setClaimFree",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_idx",
                            "type": "uint256"
                        }
                    ],
                    "name": "setCurrentIndex",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "setMaxSupply",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        }
                    ],
                    "name": "setPublicMintPrice",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256[]",
                                    "name": "ids",
                                    "type": "uint256[]"
                                },
                                {
                                    "internalType": "address",
                                    "name": "recipient",
                                    "type": "address"
                                }
                            ],
                            "internalType": "struct LibDiamond.ReservedTokens[]",
                            "name": "reservedTokens",
                            "type": "tuple[]"
                        }
                    ],
                    "name": "setReservedTokens",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint96",
                            "name": "fraction",
                            "type": "uint96"
                        }
                    ],
                    "name": "setRoyaltyFraction",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        }
                    ],
                    "name": "setRoyaltyReceiver",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes4",
                            "name": "_interfaceId",
                            "type": "bytes4"
                        }
                    ],
                    "name": "supportsInterface",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        }
                    ],
                    "name": "tokenURI",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount_",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from_",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to_",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenID_",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "unpause",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "withdrawEth",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_nft",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "tokenIds",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "withdrawNft",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_tokenContract",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "withdrawToken",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
        },
    }

    // [POLYGON_TESTNET]: {
    //   chainId: POLYGON_TESTNET,
    //   rpcUrl: "https://rpc-mumbai.maticvigil.com",
    //   baseApiUrl: "https://api-testnet.polygonscan.com/api",
    //   baseExplorerUrl: "https://mumbai.polygonscan.com",
    //   connectInfo: {
    //     chainId: "0x13881",
    //     chainName: "Polygon Mumbai Testnet",
    //     rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    //     blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    //     nativeCurrency: {
    //       symbol: "MATIC", // 2-6 characters long
    //       decimals: 18,
    //     },
    //   },
    //   film: {
    //     contractAddress: "0xd30ED11Dc134ebAa744CC7403914CAffEBC8b90B",
    //     abi: [
    //       {
    //         anonymous: false,
    //         inputs: [
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "owner",
    //             type: "address",
    //           },
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "approved",
    //             type: "address",
    //           },
    //           {
    //             indexed: true,
    //             internalType: "uint256",
    //             name: "tokenId",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "Approval",
    //         type: "event",
    //       },
    //       {
    //         anonymous: false,
    //         inputs: [
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "owner",
    //             type: "address",
    //           },
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "operator",
    //             type: "address",
    //           },
    //           {
    //             indexed: false,
    //             internalType: "bool",
    //             name: "approved",
    //             type: "bool",
    //           },
    //         ],
    //         name: "ApprovalForAll",
    //         type: "event",
    //       },
    //       {
    //         anonymous: false,
    //         inputs: [
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "by",
    //             type: "address",
    //           },
    //           {
    //             indexed: false,
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "MintedFromEth",
    //         type: "event",
    //       },
    //       {
    //         anonymous: false,
    //         inputs: [
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "by",
    //             type: "address",
    //           },
    //           {
    //             indexed: false,
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "TipGiven",
    //         type: "event",
    //       },
    //       {
    //         anonymous: false,
    //         inputs: [
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "from",
    //             type: "address",
    //           },
    //           {
    //             indexed: true,
    //             internalType: "address",
    //             name: "to",
    //             type: "address",
    //           },
    //           {
    //             indexed: true,
    //             internalType: "uint256",
    //             name: "tokenId",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "Transfer",
    //         type: "event",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //           {
    //             internalType: "address",
    //             name: "to",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256[]",
    //             name: "tokenIds",
    //             type: "uint256[]",
    //           },
    //         ],
    //         name: "adminMintMultipleSpecificTo",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "to",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "adminMintTo",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "operator_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "approve",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "account_",
    //             type: "address",
    //           },
    //         ],
    //         name: "balanceOf",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "baseURI",
    //         outputs: [
    //           {
    //             internalType: "string",
    //             name: "",
    //             type: "string",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "claimBtgoFree",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "claimFree",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "claimReserved",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "tokenId",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "getApproved",
    //         outputs: [
    //           {
    //             internalType: "address",
    //             name: "operator",
    //             type: "address",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "getBlockTimestamp",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "user",
    //             type: "address",
    //           },
    //         ],
    //         name: "getBtgoClaimed",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "user",
    //             type: "address",
    //           },
    //         ],
    //         name: "getBtgoFreeClaimsRemaining",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "user",
    //             type: "address",
    //           },
    //         ],
    //         name: "getClaimFreeRemaining",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "getCurrentIndex",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "getMaxSupply",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "getPublicMintPrice",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "user",
    //             type: "address",
    //           },
    //         ],
    //         name: "getReservedTokens",
    //         outputs: [
    //           {
    //             internalType: "uint256[]",
    //             name: "",
    //             type: "uint256[]",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "getTotalBtgoFreeClaimsRemaining",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "initialize",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "owner_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "address",
    //             name: "operator_",
    //             type: "address",
    //           },
    //         ],
    //         name: "isApprovedForAll",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "addr",
    //             type: "address",
    //           },
    //         ],
    //         name: "isContract",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "addr",
    //             type: "address",
    //           },
    //         ],
    //         name: "isERC721Contract",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "isPaused",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //           {
    //             internalType: "address",
    //             name: "to",
    //             type: "address",
    //           },
    //         ],
    //         name: "mintFromEth",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "name",
    //         outputs: [
    //           {
    //             internalType: "string",
    //             name: "",
    //             type: "string",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "ownerOf",
    //         outputs: [
    //           {
    //             internalType: "address",
    //             name: "",
    //             type: "address",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "pause",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "to",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "tipAmount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "publicMintToWithTip",
    //         outputs: [],
    //         stateMutability: "payable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "from_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "address",
    //             name: "to_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "safeTransferFrom",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "from_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "address",
    //             name: "to_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //           {
    //             internalType: "bytes",
    //             name: "data_",
    //             type: "bytes",
    //           },
    //         ],
    //         name: "safeTransferFrom",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "operator_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "bool",
    //             name: "approved_",
    //             type: "bool",
    //           },
    //         ],
    //         name: "setApprovalForAll",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "string",
    //             name: "baseUri",
    //             type: "string",
    //           },
    //         ],
    //         name: "setBaseURI",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address[]",
    //             name: "accounts",
    //             type: "address[]",
    //           },
    //           {
    //             internalType: "uint256[]",
    //             name: "amounts",
    //             type: "uint256[]",
    //           },
    //         ],
    //         name: "setClaimFree",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "_idx",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "setCurrentIndex",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "amount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "setMaxSupply",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "price",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "setPublicMintPrice",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             components: [
    //               {
    //                 internalType: "uint256[]",
    //                 name: "ids",
    //                 type: "uint256[]",
    //               },
    //               {
    //                 internalType: "address",
    //                 name: "recipient",
    //                 type: "address",
    //               },
    //             ],
    //             internalType: "struct LibDiamond.ReservedTokens[]",
    //             name: "reservedTokens",
    //             type: "tuple[]",
    //           },
    //         ],
    //         name: "setReservedTokens",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "bytes4",
    //             name: "_interfaceId",
    //             type: "bytes4",
    //           },
    //         ],
    //         name: "supportsInterface",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "symbol",
    //         outputs: [
    //           {
    //             internalType: "string",
    //             name: "",
    //             type: "string",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "tokenURI",
    //         outputs: [
    //           {
    //             internalType: "string",
    //             name: "",
    //             type: "string",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "totalSupply",
    //         outputs: [
    //           {
    //             internalType: "uint256",
    //             name: "",
    //             type: "uint256",
    //           },
    //         ],
    //         stateMutability: "view",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "to_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "amount_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "transfer",
    //         outputs: [
    //           {
    //             internalType: "bool",
    //             name: "",
    //             type: "bool",
    //           },
    //         ],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "from_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "address",
    //             name: "to_",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "tokenID_",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "transferFrom",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "unpause",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [],
    //         name: "withdrawEth",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "_nft",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256[]",
    //             name: "tokenIds",
    //             type: "uint256[]",
    //           },
    //         ],
    //         name: "withdrawNft",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //       {
    //         inputs: [
    //           {
    //             internalType: "address",
    //             name: "_tokenContract",
    //             type: "address",
    //           },
    //           {
    //             internalType: "uint256",
    //             name: "_amount",
    //             type: "uint256",
    //           },
    //         ],
    //         name: "withdrawToken",
    //         outputs: [],
    //         stateMutability: "nonpayable",
    //         type: "function",
    //       },
    //     ],
    //   },
    // },
};
export default networkConfig;
