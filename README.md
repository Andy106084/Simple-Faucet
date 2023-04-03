# This is a simple-faucet created using nextjs 🧐

## Getting Started

First, set up your truffle configuration
```js
// truffle.config.js
     // like ganache or your local blockchain
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    // your own private blockchain setting
    privateNet: {
      host: "", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      // gas: 8500000,
      from: "", //deploy smart contract address
    },
```
Second, deploy your smart contract (you can also change the settings to your liking):
```bash
cd truffle

truffle complie

// if you want to deploy in ganache
truffle migrate

// if you want to deploy in your private blockchain
truffle migrate --network privateNet
```

Finally, run the development server:

```bash
yarn install

yarn dev
```
