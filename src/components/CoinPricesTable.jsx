import { useEffect, useState } from "react";

const CoinPricesTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try { const res = await fetch( "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,cosmos");
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Error fetching prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const timer = setInterval(fetchPrices, 10000); 
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <p className="text-center py-4 text-lg text-gray-600">Loading prices...</p>
  }

  return (
    <div className="p-1 overflow-x-auto">
      <table className="w-full min-w-[300px] border-collapse">
        <tbody>
          {coins.map((coin) => {
            const isUp = coin.price_change_percentage_24h >= 0;
            return (
              <tr key={coin.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2"> <img src={coin.image} alt={coin.name} className="w-6 h-6" /> <span className="uppercase font-medium">{coin.symbol}</span> </td>
                <td className="p-3 font-medium text-gray-800"> ${coin.current_price.toLocaleString()} </td>
                <td className={`p-3 font-bold ${isUp ? "text-green-600" : "text-red-600" }`}>{isUp ? "▲" : "▼"} {coin.price_change_percentage_24h.toFixed(2)}% </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoinPricesTable;
