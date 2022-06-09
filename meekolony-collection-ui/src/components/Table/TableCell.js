import React from "react";

const formatAddr = (addr) => {
  if (!addr || addr == "") {
    return;
  }
  return (
    addr.substring(0, 5) + "..." + addr.substring(addr.length - 3, addr.length)
  );
};

export function AddrCell({ column, row }) {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <span
        className="text-blue-300 hover:text-blue-600 hover:cursor-pointer"
        onClick={() => column.copiedLink(row.original[column.addrAccessor])}
      >
        {formatAddr(row.original[column.addrAccessor]) || "-"}
      </span>
    </div>
  );
}

export function DateCell({ value }) {
  return <div className="text-gray-500">{convertToDateString(value)}</div>;
}

const zeroPad = (num, places) => String(num).padStart(places, "0");

export const convertToDateString = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yy = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();
  return (
    dd + "/" + mm + "/" + yy + " " + zeroPad(hour, 2) + ":" + zeroPad(min, 2)
  );
};
