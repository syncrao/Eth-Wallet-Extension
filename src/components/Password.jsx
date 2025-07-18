import { useRef, useState } from "react";
import { useWallet } from '../App';
import { getMnemonic } from "../utils/localStorage";

const Password = () => {
    const passwordRef = useRef();
    const [error, setErr] = useState(null)
    const { setWallet } = useWallet()

    const handleUnlock = async () => {
        const mnemonic = await getMnemonic(passwordRef.current.value);
        console.log("password", mnemonic)
        if (mnemonic === "WrongPassword") {
            setErr("Invalid Password!")
        }
        setWallet(mnemonic)
    }


    return (
        <div className="flex flex-col items-center justify-start pt-6 space-y-6 mx-auto">
            <div className="text-center space-y-1">
                <h1 className="text-xl font-bold text-gray-900">Welcome</h1>
                <p className="text-gray-500 text-sm">The decentralized web awaits</p>
            </div>
             <img src="ethereum-logo.png" class="w-60 h-60 mt-4" alt="MetaMask Logo" />
            <div className="w-full px-6">

                <input ref={passwordRef} onFocus={() => setErr(null)} type="password" placeholder="Enter Password" class="w-full px-3 py-2 border-b-2 border-blue-500 focus:outline-none focus:ring-0 text-gray-800" />
            </div>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            <button onClick={handleUnlock} class="w-[80%] bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 rounded-full transition"> Unlock </button>
            
        </div>
    )
}

export default Password;