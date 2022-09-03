# Smart Contracts

This folder contains the event bus project. To begin development, you must have [Node.js](https://nodejs.org/en/) and the [Yarn](https://yarnpkg.com) package manager installed.


## Commands

```bash
# test
yarn test

# test coverage
yarn coverage

# build production
yarn build

# clean build production
yarn build:clean

# deploy contracts to local chain
## CAUTION: you must have a local custom chain running. See ../../ganache folder
RPC_URL=http://localhost:8545 DEPLOYER_SECRET=0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 yarn deploy:registry
RPC_URL=http://localhost:8545 DEPLOYER_SECRET=0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 yarn deploy:coin

# OR

# use the following commands to check if the contracts are already deployed before deploying them
# (use ./scripts/deploy.sh -h for help)
## CAUTION: The order is important here. This setting only works if the registry contract deployment tx is the first and the token contract deployment tx is the second tx of the chain.
##          Otherwise set the contract addresses accordingly.
./scripts/deploy.sh -u http://localhost:8545 -s 0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 -c 0xe69040B036FaF59C62455e826D971A22EE8EEcd0 -o registry
./scripts/deploy.sh -u http://localhost:8545 -s 0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 -c 0x51CD2047C35c32f30a3B7bCC87c4A81794f8F804 -o coin
```


## Running tools

You can run the tools with the following command:
```bash
npx ts-node <script path name>
```

for example:
```bash
npx ts-node tools/accountGenerator -h
```
