import Wallet from './Wallet';

const App = () => {
  return (
    <div className="flex justify-center items-start bg-gray-100 p-2">
      <div className="w-[360px] h-[650px] overflow-y-auto">
        <h1 className="text-xl font-bold mb-4 text-center">SyncRao Wallet</h1>
        <Wallet />
      </div>
    </div>
  )
};

export default App;
