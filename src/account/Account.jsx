import { useWallet } from "../App";


const Account = () => {
    const { wallet } = useWallet()
   

    return (
        <>
            <div className="mt-4 text-sm bg-gray-50 border rounded p-3 space-y-2">
                <p><strong>Address:</strong> <span className="break-words">{wallet.address}</span></p>
                <p><strong>Private Key:</strong> <span className="break-words">{wallet.privateKey}</span></p>
                <p><strong>Mnemonic:</strong> <span className="break-words">{wallet.mnemonic}</span></p>
            </div>
        </>
    )
}

export default Account;