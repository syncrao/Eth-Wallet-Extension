import { useRef, useState } from 'react';
import { ethers } from 'ethers';
import { storeMnemonic } from '../utils/localStorage';
import { useWallet } from '../App';

const CreateWallet = () => {
  const [wallet, setWallet] = useState(null)
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState(null)
  const { refreshMnemonic } = useWallet()

  const handleCreate = () => {
    const newWallet = ethers.Wallet.createRandom()
    setWallet({
      address: newWallet.address,
      privateKey: newWallet.privateKey,
      mnemonic: newWallet.mnemonic.phrase,
    })
  };

  const handleSave = () => {

    if (!passwordRef.current.value || !confirmPasswordRef.current.value) {
      setError("Both password fields are required.")
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match.")
      return;
    }
    storeMnemonic(wallet.mnemonic, passwordRef.current.value)
    refreshMnemonic()
  };

  return (
    <div className="space-y-2">
      {wallet ?
        <div >
          <div className="my-2 bg-white border border-gray-300 rounded-xl p-4 mt-4 shadow-sm">
            <p className="text-gray-700 font-mono whitespace-pre-wrap break-words">{wallet.mnemonic}</p>
          </div>
          <input ref={passwordRef} onFocus={() => setError(null)} type="password" className="border  my-2 font-bold p-4 mx-1 w-[98%] h-12 rounded" placeholder="Enter Password" />
          <input ref={confirmPasswordRef} onFocus={() => setError(null)} type="password" className="border my-2 font-bold p-4 mx-1 w-[98%] h-12 rounded" placeholder="Confirm Password" />
          {error && <p className=" mx-2 text-red-600 text-sm mt-1">{error}</p>}
          <button onClick={handleSave} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"> Save Wallet </button>
        </div>
        :
        <button onClick={handleCreate} className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Generate Wallet</button>}
    </div>
  );
};

export default CreateWallet;