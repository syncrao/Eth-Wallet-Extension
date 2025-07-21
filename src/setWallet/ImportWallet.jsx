import { useRef, useState } from 'react';
import { Wallet } from 'ethers';
import { storeMnemonic } from '../utils/localStorage';
import { useWallet } from '../App';

const ImportWallet = ({ setMode }) => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const { refreshMnemonic } = useWallet();

  const handleSave = async () => {
    const mnemonic = inputRef.current.value.trim();
    const pass = passwordRef.current.value;
    const confirm = confirmPasswordRef.current.value;

    if (mnemonic.split(' ').length !== 12) {
      setError('Mnemonic must be exactly 12 words.');
      return;
    }

    if (!pass || !confirm) {
      setError("Both password fields are required.");
      return;
    }

    if (pass !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const wallet = await Wallet.fromPhrase(mnemonic);
      storeMnemonic(wallet.mnemonic.phrase, pass);
      refreshMnemonic();
    } catch (e) {
      console.error(e);
      setError("Invalid mnemonic or import failed.");
    }
  };

  return (
    <div className="space-y-2">
      
      <div className=" w-full h-[430px] mt-6 p-4 bg-white flex flex-col justify-between">
        <div>
          <button onClick={() => setMode(null)}><img src='back.png' alt='back' /></button>
          <h2 className="text-lg font-bold text-gray-800 text-center mb-4"> Import Your Wallet </h2>
          <p className="text-sm text-gray-600 text-center mb-4"> Paste your 12-word recovery phrase below to access your wallet.</p>
          <textarea ref={inputRef} onFocus={() => setError('')} rows={3} placeholder="Enter 12-word recovery phrase" className="border rounded p-3 text-sm w-full resize-none" />
          <input ref={passwordRef} onFocus={() => setError('')} type="password" className="border my-2 font-bold p-4 w-full h-12 rounded" placeholder="Enter Password" />
          <input ref={confirmPasswordRef} onFocus={() => setError('')} type="password" className="border font-bold p-4 w-full h-12 rounded" placeholder="Confirm Password"/>
          {error && (<p className="text-red-600 text-sm mt-2">{error}</p>)}
        </div>
        <button onClick={handleSave} className=" mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition"> Import Wallet </button>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Don’t have a recovery phrase?{" "}
        <button onClick={() => setMode('create')} className="text-blue-600 hover:underline font-medium"> Create New Wallet </button>
      </p>
    </div>
  );
};

export default ImportWallet;
