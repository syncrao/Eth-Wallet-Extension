import { useState } from "react";
import { JsonRpcProvider, parseEther } from "ethers";
import { useWallet } from "../App";

const SendEther = () => {
  const { wallet } = useWallet();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new JsonRpcProvider("https://rpc-sepolia.rockx.com");
      const signer = wallet.connect(provider);

      const tx = await signer.sendTransaction({
        to,
        value: parseEther(amount),
      });

      console.log("Transaction Sent:", tx.hash);
      setTxHash(tx.hash);

      await tx.wait(); // Wait for confirmation
      console.log("Transaction Confirmed");
    } catch (err) {
      console.error("Send failed:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow border space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Send ETH</h2>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Recipient Address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-50"
          disabled={loading || !to || !amount}
        >
          {loading ? "Sending..." : "Send ETH"}
        </button>
        {txHash && (
          <p className="text-green-600 text-sm">
            ✅ Sent! TX:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {txHash.slice(0, 10)}...
            </a>
          </p>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SendEther;
