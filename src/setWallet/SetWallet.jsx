import { useState } from 'react';
import { useWallet } from '../App';
import CreateWallet from './CreateWallet';
import ImportWallet from './ImportWallet';

const Wallet = () => {
    const { setWallet } = useWallet()
    const [mode, setMode] = useState('create');

    return (
        <>
            <div className="flex justify-between mb-4 my-4 text-sm font-medium">
                <button onClick={() => setMode('create')} className={`w-1/2 py-2 rounded-l ${mode === 'create' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Create</button>
                <button onClick={() => setMode('import')} className={`w-1/2 py-2 rounded-r ${mode === 'import' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Import</button>
            </div>
            {mode === 'create' ?
                <CreateWallet setWallet={setWallet} /> :
                <ImportWallet setWallet={setWallet} />}
        </>
    );
};

export default Wallet;
