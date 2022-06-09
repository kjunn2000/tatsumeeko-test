import React, { useRef, useState } from "react";
import TokenCard from "../components/holder/TokenCard";
import TokenDialog from "../components/holder/TokenDialog";
import { api } from "../utils/axios";
import Spinner from "../utils/Spinner";

const MeekolonyHolder = () => {
  const walletAddr = useRef();
  const [tokens, setTokens] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchTokens = async (walletAddr) => {
    if (walletAddr == "") {
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/meekolony/tokens?pubKey=${walletAddr}`);
      if (res && res.status === 200) {
        if (res.data.message && res.data.message.length == 0) {
          setError("No Meekolony NFTs available.");
        } else {
          setTokens(res.data.message);
          setError("");
        }
      }
    } catch (e) {
      setError("Invalid wallet address.");
    }
    console.log("hello2");
    setLoading(false);
  };

  return (
    <div>
      <div className="p-4 flex flex-col gap-5 justify-center items-center">
        <div className="text-2xl text-white font-bold">
          Enter your wallet address:
        </div>
        <input className="w-1/3 p-2 rounded" ref={walletAddr} />
        {error && error.length > 0 && (
          <div className="text-red-700 text-sm">{error}</div>
        )}
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => searchTokens(walletAddr.current.value)}
          disabled={isLoading}
        >
          <div className="flex">
            {isLoading ? <Spinner /> : <span>Search</span>}
          </div>
        </button>
        {isLoading && (
          <div className="text-sm text-white">This may take some time...</div>
        )}
        <div className="text-sm text-white">
          ***Only for NFT amount larger than 0***
        </div>
      </div>
      <div className="w-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-5 p-5">
        {tokens &&
          tokens.map((token) => <TokenCard key={token.name} token={token} />)}
      </div>
    </div>
  );
};

export default MeekolonyHolder;
