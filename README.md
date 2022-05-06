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

#### Rinkeby

| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     | https://api.studio.thegraph.com/query/16341/liquid-master/v3.0.0   |
| Controller Subgraph | https://api.studio.thegraph.com/query/16341/liquid-original/v3.0.0 |
| Vesting Subgraph    | https://api.studio.thegraph.com/query/16341/liquid-vesting/v3.0.0  |

#### Binance Smart Chain (BSC)
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-master-bsc-testnet	|
| Controller Subgraph |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-original-bsc-testnet	|
| Vesting Subgraph    |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-vesting-bsc-testnet	|
#### Matic (Polygon)
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-master-mumbai-matic	|
| Controller Subgraph |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-original-mumbai-matic	|
| Vesting Subgraph    |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-vesting-mumbai-matic	|
#### Avalanche
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-master-fuji-avalanche	|
| Controller Subgraph |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-original-fuji-avalanche	|
| Vesting Subgraph    |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-vesting-fuji-avalanche	|
#### Fantom
| Subgraph     | Query URL  |
|---------------------|--------------------------------------------------------------------|
| Master Subgraph     |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-master-testnet-fantom	|
| Controller Subgraph |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-original-testnet-fantom	|
| Vesting Subgraph    |https://api.thegraph.com/subgraphs/name/shreyas3336/liquid-vesting-testnet-fantom	|