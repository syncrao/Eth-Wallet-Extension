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
    }else {
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
        <div className="w-[360px] h-[600px] bg-gray-200 p-2 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-2  shadow ">
            <h1 className="text-lg font-bold text-gray-800">SyncRao Wallet</h1>
            {wallet && (<button onClick={handleDelete} className="text-red-500 hover:text-red-600 transition"> Sign Out </button>)}
          </div>
          {wallet ? wallet === "WrongPassword" ? <Password /> : <Account /> : <SetWallet />}
        </div>
      </div>
    </WalletContext.Provider>
  )
};

export default App;
