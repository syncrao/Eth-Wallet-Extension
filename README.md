# Ethereum Wallet Extension 🔐

A lightweight Ethereum wallet Chrome extension using React and ethers.js — capable of generating wallets, sending transactions, and connecting with decentralized applications (dApps) via an injected provider.

## ✅ Features
- 🔐 Generate new Ethereum wallet (address, private key, mnemonic)
- 💸 Send ETH transactions to any valid Ethereum address
- 🌐 Connect with dApps (EIP-1193 provider-compatible injection)
- ⚛️ Built using React + ethers.js
- 🧩 Chrome Extension (Manifest v3 compatible)
- 🧼 Minimal UI, easy to extend with token transfers, signing, etc.

## 🔧 Tech Stack
- React.js
- ethers.js
- Chrome Extension APIs (Manifest v3)
- EIP-1193 Provider Injection (for dApp compatibility)


## 🧩 Dependencies

This project uses the following main packages:

- **ethers**: Used to generate Ethereum wallets (`Wallet.createRandom()`), access address, private key, and mnemonic.
- **Tailwind CSS**: Used for building the responsive UI of the Chrome extension popup.
- **React**: Core library for building components and UI.
