import { useRef, useState } from 'react';
import { Wallet } from 'ethers';
import { storeMnemonic } from '../utils/localStorage';
import { useWallet } from '../App';

const ImportWallet = () => {
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
      setError('Mnemonic must be at least 12 words.');
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
      <textarea ref={inputRef} onFocus={() => setError('')} rows={3} placeholder="Enter mnemonic phrase or private key" className="border rounded p-2 text-sm ml-[1%] w-[98%]" />
      <input ref={passwordRef} onFocus={() => setError('')} type="password" className="border my-2 font-bold p-4 mx-1 w-[98%] h-12 rounded" placeholder="Enter Password" />
      <input ref={confirmPasswordRef} onFocus={() => setError('')} type="password" className="border my-2 font-bold p-4 mx-1 w-[98%] h-12 rounded" placeholder="Confirm Password" />
      {error && <p className="mx-2 text-red-600 text-sm mt-1">{error}</p>}
      <button onClick={handleSave} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Import Wallet</button>
    </div>
  );
};

export default ImportWallet;
