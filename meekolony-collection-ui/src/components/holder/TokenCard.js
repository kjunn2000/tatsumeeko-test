import React, { useState } from "react";
import TokenDialog from "./TokenDialog";

const TokenCard = ({ token }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="hover:cursor-pointer transition duration-150 hover:scale-105"
      onClick={() => setIsOpen(true)}
    >
      <div class="max-w-sm rounded overflow-hidden shadow-lg rounded bg-slate-200">
        <img
          className="w-full h-96"
          src={token.image}
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{token.name}</div>
          <p class="text-gray-700 text-base truncate">{token.description}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {token.symbol}
          </span>
        </div>
      </div>
      <TokenDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        token={token}
        buttonText="Close"
      />
    </div>
  );
};

export default TokenCard;
