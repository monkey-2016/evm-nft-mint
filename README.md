# evm-nft-mint

## About
- Smart Contract
    - Semi fungible token
    - Apply mint-price of ETH when anyone mint token 
    - Has three types of packages (NFT)
    - Admin can mint without ETH
- Front End
    - connect wallet
    - show three membership packages from contract
    - anyone can mint with ETH
## Implement
- Smart Contract
> Language: Solidity  
> Framework: Hardhat  
> Networks: Rinkeby(Testnet), Ethereum(Mainnet)  
> Unit Test: Hardhat, Chai

- Front End
> Language: React  
> Framework: Nextjs  
> Network: Rinkeby(Testnet)

## Installation
```shell
yarn install
```

## Usage

### 1. Environment variables
- Create a `.env` file in `pacakges/smart-contract` with its values (refer `.env.sample` file)
```
INFURA_API_KEY=[INFURA_API_KEY]
PRIVATE_KEY=[DEPLOYER_PRIVATE_KEY]
ETHERSCAN_API_KEY=[ETHER_SCAN_API_KEY]
REPORT_GAS=<true_or_false>
```
- Create a `.env` file in `pacakges/front-end` with its values (refer `.env.sample` file)
```
REACT_APP_NETWORK_URL=[NETWORK_RPC_URL]
REACT_APP_CHAIN_ID=[NETWORK_CHAIN_ID]
```

### 2. Compile
Compile Smart Contract
```shell
yarn compile
```

### 3. Upload NFT metadata to IPFS
Ensure that three NFT images are located in `packages/smartcontract/assets` folder
```shell
yarn upload
```

After excuting command, you can see the result such as the following :
```
NFT Metadata uploaded. Directory CID: QmUX71RiuuPt8opHC3ygdbx6NnKkdCAVk38zNwdz1Crap7, Number: 3, Directory Path: https://ipfs.io/ipfs/QmUX71RiuuPt8opHC3ygdbx6NnKkdCAVk38zNwdz1Crap7/
```

### 4. Test
Unit Test in Smart Contract
```shell
yarn test
```

### 5. Deploy Contract
Deploy Smart Contract on rinkeby testnet and publish the contract`s ABI to the Front End side, build Front End Code.
- Set params in `packages/smartcontract/scripts/params.ts` file
```shell
export const COLLECTION_NAME = "ERC1155MultiToken"; // Collection Name
export const COLLECTION_SYMBOL = "EMT"; // Collection Symbol
export const MINT_PRICE = 0.01; // ETH price
export const IPFS_BASE_URI = "ipfs://QmUX71RiuuPt8opHC3ygdbx6NnKkdCAVk38zNwdz1Crap7/"; // Base URI
```
`IPFS_BASE_URI` should be made with CID that we got by using `yarn upload` command  
- Run Deploy Command
```shell
yarn deploy
```

### 6. Verify Contract
Verify contract with the deployed constract address

```shell
yarn verify <DEPLOYED_ADDRESS>
```

### 7. Run Front End
```shell
yarn start
```
