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

# deploy farmland registry to local chain
## CAUTION: you must have a local custom chain running. See ../../ganache folder
RPC_URL=http://localhost:8545 DEPLOYER_SECRET=0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 yarn deploy:registry

# or use the following command to check if it's already deployed before deploying it
# (use ./scripts/deploy.sh -h for help)

./scripts/deploy.sh -u http://localhost:8545 -s 0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18 -c 0xe69040B036FaF59C62455e826D971A22EE8EEcd0 -o registry
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
