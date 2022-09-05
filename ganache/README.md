# Ganache Test Chain

This folder contains the configuration for setting up a custom test chain. It facilitates the [Truffles](https://trufflesuite.com) [Ganache](https://github.com/trufflesuite/ganache) development chain and the [Blockscout](https://github.com/blockscout/blockscout) explorer.


## Commands

```bash
# start chain including explorer
./scripts/run-docker.sh

# start chain including explorer in detached mode
./scripts/run-docker.sh -d

# stop chain including explorer
./scripts/pause-docker.sh

# stop and remove chain including explorer
./scripts/stop-docker.sh
```


## Access

- RPC URL:
  - `http://localhost:8545`
- Chain ID
  - `4243`
- Blockexplorer
  - `http://localhost:4000`


## Accounts

```ts
const ACCOUNTS = [
    {
        address: "0xc794007a9cBA8E20d5b3697f1b23D76893fFADf3",
        secret: "0x3981c0fb9704e9fe87b27c8a7678fcd680d8c7f142ef6be886e994ad0e9a1a18"
    },{
        address: "0x09C34b07450Bd15A90FD0e50b2D969c69569d856",
        secret: "0x11fb4b2820b1bef144bfb385de51c6f8bd14a6909469db7754988f8a5d655852"
    },{
        address: "0x9B046E7d64bB51eF6Dac23F575046D6Fa0c1B9F3",
        secret: "0x6ebb4890443a0cc090d5abd76e0f3057d9e4bb460ff6ce71b5a8664b7eebc93e"
    },{
        address: "0x27AAC618b5b145D54d58b4C17eAD07da3588Cf6A",
        secret: "0xd61210d75b6dcb5d3c2de7efebb5c912f110b0deb2ac296462c4d88e27818d72"
    },{
        address: "0x3993bbE508A73e90FE18E2cA1e54456f2C6Da09F",
        secret: "0x9cc3ad4f957fab036541ace8aca8367b2ca89fc5a99e88af2175c87b06b342fb"
    },{
        address: "0xbFA9286D4FD2f47a087bd7a44855Fc5365DA09f8",
        secret: "0xe5e06fa100e1fa69ea5191b3df086c441ecc2ae33f208817c35f494f2cfa63eb"
    },{
        address: "0xbbB75f4086b8C7d25B3932359Eb5221F058ec7B2",
        secret: "0x7c8c135498d33bb9e9f49bf089cbb37651f101d3a07ff5b4f8a3d7464deab797"
    },{
        address: "0xfb57dB69Be5AAf59405f6e59506691538eBf3587",
        secret: "0xee82e93652bdc3b98814ca2f7434db037adf44acefbe418b95f6303abc61a99b"
    },{
        address: "0x96187B3135C074673155647c548AF3c345A01Daf",
        secret: "0x4b81bea8c8f7c564107385ab332f456d8d5352bdcc5722b6423de3b6d9a66665"
    },{
        address: "0x91D227294Fa9FB3B1dEf5C4F36f8C4beEF3C2d06",
        secret: "0xf595aecde123c9cb70c78979de7fbcdfe5255ed0ef99e5689a4f46691890af9f"
    }
];
```