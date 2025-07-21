import SetWallet from './setWallet/SetWallet';
import Account from './account/Account';
import Password from './components/Password';
import { Wallet } from 'ethers';
import { deleteMnemonic, getMnemonic, } from './utils/localStorage';
import { createContext, useContext, useEffect, useState } from 'react';

const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

const App = () => {
  const [wallet, setWallet] = useState(null);

  const refreshMnemonic = async () => {
    const mnemonic = await getMnemonic();
    if (mnemonic) {
      if (mnemonic === "WrongPassword") {
        setWallet(mnemonic)
      } else {
        setWallet(Wallet.fromPhrase(mnemonic))
      }
    } else {
      setWallet(mnemonic)
    }
  };

  useEffect(() => {
    refreshMnemonic();
  }, []);

  const handleDelete = async () => {
    await deleteMnemonic();
    await refreshMnemonic();
  };

  return (
    <WalletContext.Provider value={{ refreshMnemonic, setWallet, wallet }}>
      <div className="flex justify-center items-start ">
        <div className="w-[360px] h-[600px] bg-white p-2 overflow-y-auto">
          <div className="w-full flex justify-between items-center px-4">
            <img src="https://images.seeklogo.com/logo-png/30/1/ethereum-logo-png_seeklogo-308497.png" className="w-8 h-8" alt="Ethereum" />
            <h1 className='text-sm font-bold text-gray-600'>SyncRao</h1>
            {wallet && (<button onClick={handleDelete} className=" text-red-500 hover:text-red-600 transition border rounded"> <img src='delete.png' class="w-4 h-4 m-1" alt="Delete" /> </button>)}
          </div>
          {wallet ? wallet === "WrongPassword" ? <Password /> : <Account /> : <SetWallet />}
          <footer className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-600 py-2 border-t bg-white">
            <p>Developed by - Shah Rukh Rao</p>
            <p className="text-red-500 font-semibold mt-1">This wallet works only on Sepolia Testnet</p>
          </footer>
        </div>
      </div>
    </WalletContext.Provider>
  )
};

export default App;
