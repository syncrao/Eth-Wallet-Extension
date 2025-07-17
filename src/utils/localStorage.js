/* global chrome */
import CryptoJS from "crypto-js";
import { Wallet } from 'ethers';
const STORAGE_KEY = "encryptedWallet";


export const storeMnemonic = (mnemonic, password = "default-password") => {
  const ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    chrome.storage.local.set({ [STORAGE_KEY]: ciphertext });
  } else {
    localStorage.setItem(STORAGE_KEY, ciphertext);
  }
};


const decryptMnemonic = (encrypted, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (decrypted) {
      const wallet = Wallet.fromPhrase(decrypted)
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
      }
    } else {
      return "WrongPassword";
    }

  } catch (err) {
    return "WrongPassword";
  }
};

export const getMnemonic = async (password = "default-passwor") => {
  let encrypted;

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        encrypted = result[STORAGE_KEY];
        if (!encrypted) return resolve(null);
        const decrypted = decryptMnemonic(encrypted, password);
        resolve(decrypted);
      });
    });
  } else {
    encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return null;
    return decryptMnemonic(encrypted, password);
  }
};


export const deleteMnemonic = () => {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    chrome.storage.local.remove([STORAGE_KEY]);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};


