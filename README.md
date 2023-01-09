# Capx Liquid Subgraph

[Capx Liquid](https://liquid.capx.fi/) is a decentralized platform that allows project teams, investors, and other vesting token holders to vest tokens using a "Smart Vesting Contract". This subgraph dynamically tracks any vesting schedule created by project teams, investors, or token holders, maintaining the state of vesting schedules.

## Contracts

#### Master
Emits the data corresponding to every new Project/Protocol On-boarded on the Capx Liquid platform.
#### Controller
Emits all the WVTs (derivatives) information such as unlock time for the vesting schedule, the holders, etc for the project/protocol On-boarded on the Capx Liquid platform.
#### Vesting
Emits all the vesting locks created by the project/protocol On-boarded on the Capx Liquid platform.

## Example Query
#### Querying Derivatives Information of Capx Liquid subgraph

This query fetches aggregated data from all derivatives created by the protocol for each project. 

```graphql
{
  projects{
    id
    projectOwnerAddress
    projectTokenAddress
    projectTokenTicker
    projectTokenDecimal
    derivatives {
        id
        wrappedTokenTicker
        unlockTime
        totalSupply
        holders {
            address
            tokenAmount
        }
    }
  }
}
```
## Query URLs

#### Ethereum 
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Liquid Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-eth   |

#### Binance Smart Chain (BSC) 
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Liquid Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-bsc   |

#### Matic (Polygon)
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Liquid Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-matic   |

#### Avalanche 
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Liquid Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-avax   |

#### Fantom 
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Liquid Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-ftm   |


## Contract Address

#### Ethereum 
| Contract Name     | Contract Addresss  |
|---------------------|--------------------------------------------------------------------|
| Master      | [0xd297b094607DE535378000Fa6fc45e71627Fc839](https://etherscan.io/address/0xd297b094607DE535378000Fa6fc45e71627Fc839)	 |
| Controller  | [0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07](https://etherscan.io/address/0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07)	 |
| Vesting     | [0x5d985753aE3691a0A94d38eC2F12793006097416](https://etherscan.io/address/0x5d985753aE3691a0A94d38eC2F12793006097416)	 |

#### Binance Smart Chain (BSC) 
| Contract Name     | Contract Addresss  |
|---------------------|--------------------------------------------------------------------|
| Master      | [0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07](https://bscscan.com/address/0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07)	 |
| Controller  | [0x316717ecEff2D3a612Deba49B5A21430c78D22f2](https://bscscan.com/address/0x316717ecEff2D3a612Deba49B5A21430c78D22f2)	 |
| Vesting     | [0x1428c7f929b3Ac5d5c6619FC3F9C722d2cfC66A5](https://bscscan.com/address/0x1428c7f929b3Ac5d5c6619FC3F9C722d2cfC66A5)	 |

#### Matic (Polygon)
| Contract Name     | Contract Addresss  |
|---------------------|--------------------------------------------------------------------|
| Master      | [0xd297b094607DE535378000Fa6fc45e71627Fc839](https://polygonscan.com/address/0xd297b094607DE535378000Fa6fc45e71627Fc839)	 |
| Controller  | [0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07](https://polygonscan.com/address/0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07)	 |
| Vesting     | [0x5d985753aE3691a0A94d38eC2F12793006097416](https://polygonscan.com/address/0x5d985753aE3691a0A94d38eC2F12793006097416)	 |

#### Avalanche 
| Contract Name     | Contract Addresss  |
|---------------------|--------------------------------------------------------------------|
| Master      | [0xd297b094607DE535378000Fa6fc45e71627Fc839](https://snowtrace.io/address/0xd297b094607DE535378000Fa6fc45e71627Fc839)	 |
| Controller  | [0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07](https://snowtrace.io/address/0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07)	 |
| Vesting     | [0x5d985753aE3691a0A94d38eC2F12793006097416](https://snowtrace.io/address/0x5d985753aE3691a0A94d38eC2F12793006097416)	 |

#### Fantom 
| Contract Name     | Contract Addresss  |
|---------------------|--------------------------------------------------------------------|
| Master      | [0xd297b094607DE535378000Fa6fc45e71627Fc839](https://ftmscan.com/address/0xd297b094607DE535378000Fa6fc45e71627Fc839)	 |
| Controller  | [0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07](https://ftmscan.com/address/0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07)	 |
| Vesting     | [0x5d985753aE3691a0A94d38eC2F12793006097416](https://ftmscan.com/address/0x5d985753aE3691a0A94d38eC2F12793006097416)	 |



## Query URLs (Deprecated)

#### Ethereum

| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-eth-master	 |
| Controller Subgraph | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-eth-controller	 |
| Vesting Subgraph    | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-eth-vesting	 |

#### Binance Smart Chain (BSC)
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-bsc-master	 |
| Controller Subgraph | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-bsc-controller	 |
| Vesting Subgraph    | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-bsc-vesting	 |
#### Matic (Polygon)
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-matic-master |
| Controller Subgraph | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-matic-controller	 |
| Vesting Subgraph    | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-matic-vesting	 |
#### Avalanche
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-avax-master	 |
| Controller Subgraph | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-avax-controller	 |
| Vesting Subgraph    | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-avax-vesting	 |
#### Fantom
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-ftm-master	 |
| Controller Subgraph | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-ftm-controller	 |
| Vesting Subgraph    | https://api.thegraph.com/subgraphs/name/capxdev/capx-liquid-ftm-vesting	 |
