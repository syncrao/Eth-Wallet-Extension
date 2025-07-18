import { useState } from 'react';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

const Wallet = () => {
    const [mode, setMode] = useState(null);

    return (
        <>
            {mode === 'create' ? <CreateWallet setMode={setMode} /> : mode === 'import' ? <ImportWallet setMode={setMode} /> :
                <div className="w-full h-[500px] flex flex-col justify-center items-center p-6 bg-white text-center space-y-6">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5c.5 0 .9.2 1.3.6l6.6 6.6c.8.8.8 2 0 2.8l-6.6 6.6c-.4.4-.9.6-1.3.6s-.9-.2-1.3-.6l-6.6-6.6a2 2 0 010-2.8l6.6-6.6c.4-.4.9-.6 1.3-.6z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Save your Secret Recovery Phrase</h2>
                    <p className="text-sm text-gray-600 px-4">
                        You’ll be given a 12-word secret phrase. This phrase gives full access to your wallet and assets.
                        Keep it private, secure, and never share it with anyone. If you lose it, your wallet cannot be recovered.
                    </p>
                    <button
                        onClick={() => setMode('create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full transition"
                    >
                        I understand, show me my phrase
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        Already have a recovery phrase?{" "}
                        <button
                            onClick={() => setMode('import')}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Import Wallet
                        </button>
                    </p>
                    <p className="text-sm text-gray-500 mt-2"><span className="text-sm text-gray-800 mt-4">for test use: </span>
                     funny report blush unveil gadget leopard unaware relax eager auto despair luxury
                    </p>

                </div>}
        </>
    );
};

export default Wallet;
