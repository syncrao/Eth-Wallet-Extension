import { useState } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
    const [wallet, setWallet] = useState(null);

    const generateWallet = () => {
        const newWallet = ethers.Wallet.createRandom();
        setWallet({
            address: newWallet.address,
            privateKey: newWallet.privateKey,
            mnemonic: newWallet.mnemonic.phrase,
        });
    };

    return (
        <>
            <button onClick={generateWallet}  className="w-full bg-indigo-600 text-white text-lg px-4 py-2 rounded hover:bg-indigo-700 transition">
                Generate Wallet
            </button>

            {wallet && (
                <div className="text-sm text-gray-800 bg-gray-50 border rounded-md p-4 space-y-2 mt-4">
                    <div>
                        <strong>Address:</strong>
                        <p className="break-words">{wallet.address}</p>
                    </div>
                    <div>
                        <strong>Private Key:</strong>
                        <p className="break-words">{wallet.privateKey}</p>
                    </div>
                    <div>
                        <strong>Mnemonic:</strong>
                        <p className="break-words">{wallet.mnemonic}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Wallet;
