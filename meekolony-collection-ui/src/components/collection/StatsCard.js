import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="flex flex-col bg-slate-800 p-3 rounded">
      <div className="text-gray-300 font-thin">{title}</div>
      <div className="text-white">{value}</div>
    </div>
  );
};

export default StatsCard;
