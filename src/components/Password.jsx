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
            setErr(mnemonic)
        }
        setWallet(mnemonic)
    }


    return (
        <div ><input ref={passwordRef} type="password" className="w-full font-bold p-4  h-12 rounded my-4" placeholder="Enter Password" />
            <button onClick={handleUnlock} type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" > Unlock </button>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Password;