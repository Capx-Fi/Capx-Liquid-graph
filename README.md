# Capx Liquid Subgraph

[Capx Liquid](https://liquid.capx.fi/) is a decentralized platform that allows project teams, investors, and other vesting token holders to vest tokens using a "Smart Vesting Contract". This subgraph dynamically tracks any vesting schedule created by project teams, investors, or token holders, maintaining the state of vesting schedules.

## Subgraphs

#### Master
Maintains the data corresponding to every new Project/Protocol On-boarded on the Capx Liquid platform.
#### Controller
Maintains all the WVTs (derivatives) information such as unlock time for the vesting schedule, the holders, etc for the project/protocol On-boarded on the Capx Liquid platform.
#### Vesting
Maintains all the vesting locks created by the project/protocol On-boarded on the Capx Liquid platform.

## Example Query
#### Querying Derivatives Information of Capx Liquid controller subgraph

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
