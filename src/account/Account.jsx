import { useEffect, useState } from "react";
import { useWallet } from "../App";
import { FallbackProvider, formatEther, JsonRpcProvider } from "ethers";
import SendEther from "./SendEther";


const Account = () => {
  const { wallet } = useWallet()
  const [account, setAccount] = useState({})
  const [mode, setMode] = useState(null)
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const getAcc = async (address) => {
      setLoading(true);
      try {
        const fallbackProvider = new FallbackProvider([
          { provider: new JsonRpcProvider("https://rpc-sepolia.rockx.com"), priority: 1 },
          { provider: new JsonRpcProvider("https://1rpc.io/sepolia"), priority: 2 },
          { provider: new JsonRpcProvider("https://ethereum-sepolia.publicnode.com"), priority: 3 },
          { provider: new JsonRpcProvider("https://sepolia.drpc.org"), priority: 4 },
          { provider: new JsonRpcProvider("https://sepolia.rpc.hypersync.xyz"), priority: 5 },
        ]);
        const balance = await fallbackProvider.getBalance(address);
        console.log(balance)
        setAccount({ ...account, balance: formatEther(balance) })

      } catch (err) {
        console.log("Error fetching balance:", err);
      } finally {
        setLoading(false)
      }
    }
    getAcc(wallet.address)

  }, []);

  return (
    <> {mode === "send" ? <SendEther /> :
      <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow-md space-y-4 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 text-center">Wallet Details</h2>
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-mono text-sm break-words bg-gray-100 rounded-md p-2 text-gray-700">
            {wallet.address}
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="font-mono text-lg font-semibold text-green-600">
            {account.balance} ETH  {loading && "Loading ..."}
          </p>
        </div>
      </div>}
    </>
  )
}

export default Account;