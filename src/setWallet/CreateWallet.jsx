import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { storeMnemonic } from '../utils/localStorage';
import { useWallet } from '../App';


const CreateWallet = (props) => {
  const [wallet, setWallet] = useState(null)
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState(null)
  const { refreshMnemonic } = useWallet()


  useEffect(() => {
    const handleCreate = () => {
      const newWallet = ethers.Wallet.createRandom()
      setWallet({
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        mnemonic: newWallet.mnemonic.phrase,
      })
    }
    handleCreate()
  }, [])


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
      <div className="w-full h-[500px] p-4 bg-white flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800 text-center mb-4"> Your Secret Recovery Phrase</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Write down or copy these 12 words in the correct order and keep them
            somewhere safe. This is the only way to recover your wallet.
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-800 font-medium mb-4">
            {wallet?.mnemonic.trim().split(" ").map((word, index) => (
              <div key={index} className="border px-2 py-1 rounded bg-gray-100 text-center">
                <span className="text-gray-700 p-1">{word}</span>
              </div>
            ))}
          </div>
        </div>
        <input ref={passwordRef} onFocus={() => setError(null)} type="password" className="border  my-2 font-bold p-4 w-full h-12 rounded" placeholder="Enter Password" />
        <input ref={confirmPasswordRef} onFocus={() => setError(null)} type="password" className="border my-2 font-bold p-4 w-full h-12 rounded" placeholder="Confirm Password" />
        {error && <p className=" mx-2 text-red-600 text-sm mt-1">{error}</p>}
        <button onClick={handleSave} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"> Continue </button>
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">  Already have a recovery phrase?{" "} <button onClick={() => props.setMode('import')} className="text-blue-600 hover:underline font-medium" > Import Wallet </button> </p>
    </div>
  );
};

export default CreateWallet;