import React, { useEffect, useMemo, useState } from "react";
import { api } from "../utils/axios";
import StatsCard from "../components/collection/StatsCard";
import Table from "../components/Table/Table";
import Pagination from "../components/Table/Pagination";
import { AddrCell, DateCell } from "../components/Table/TableCell";
import SimpleDialog from "../components/dialog/SimpleDialog";

const MeekolonyCollection = () => {
  const [stats, setStats] = useState({});
  const [listings, setListings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [copiedSuccessOpen, setCopiedSuccessOpen] = useState(false);
  const [listingsEndOpen, setListingsEndOpen] = useState(false);
  const [activitiesEndOpen, setActivitiesEndOpen] = useState(false);
  const [uniqueHolder, setUniHolder] = useState("-");

  useEffect(() => {
    fetchStatsData();
    fetchListings(0);
    fetchActivities(0);
    fetchUniqueHolder();
  }, []);

  const fetchStatsData = async () => {
    const res = await api.get("/meekolony/stats");
    if (res.status && res.status === 200) {
      setStats(res.data.message);
    }
  };

  const fetchListings = async (offset, setOffset) => {
    if (offset < 0) {
      setListingsEndOpen(true);
      return;
    }
    const res = await api.get(`/meekolony/listings?offset=${offset}&limit=20`);
    if (res.status && res.status === 200) {
      if (setOffset) {
        setOffset(offset);
      }
      if (setOffset && res.data.message == []) {
        setListingsEndOpen(true);
        return;
      }
      setListings(res.data.message);
    } else {
      setListingsEndOpen(true);
    }
  };

  const fetchActivities = async (offset, setOffset) => {
    if (offset < 0) {
      setActivitiesEndOpen(true);
      return;
    }
    const res = await api.get(
      `/meekolony/activities?offset=${offset}&limit=20`
    );
    if (res.status && res.status === 200) {
      if (setOffset) {
        setOffset(offset);
      }
      if (setOffset && res.data.message == []) {
        setListingsEndOpen(true);
        return;
      }
      setActivities(res.data.message);
    } else {
      setListingsEndOpen(true);
    }
  };

  const fetchUniqueHolder = async () => {
    const res = await api.get("/meekolony/unique-holders");
    if (res.status && res.status === 200) {
      setUniHolder(res.data.message);
    }
  };

  const formatTwoDigits = (val) => {
    return (parseFloat(val) / Math.pow(10, 9)).toFixed(2);
  };

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    setCopiedSuccessOpen(true);
  };

  const listingsCol = useMemo(
    () => [
      {
        Header: "Token Address",
        addrAccessor: "tokenAddress",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
      {
        Header: "Token Mint",
        addrAccessor: "tokenMint",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
      {
        Header: "Seller",
        addrAccessor: "seller",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
      {
        Header: "Token Size",
        accessor: "tokenSize",
      },
      {
        Header: "Price (◎)",
        accessor: "price",
      },
    ],
    []
  );

  const activitiesCol = useMemo(
    () => [
      {
        Header: "Token Mint",
        addrAccessor: "tokenMint",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
      {
        Header: "Transaction Type",
        accessor: "type",
      },
      {
        Header: "Time",
        accessor: "blockTime",
        Cell: DateCell,
      },
      {
        Header: "Total Amount (◎)",
        accessor: "price",
      },
      {
        Header: "Buyer",
        addrAccessor: "buyer",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
      {
        Header: "Seller",
        addrAccessor: "seller",
        Cell: AddrCell,
        copiedLink: (val) => copyToClipboard(val),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-3/5 pt-5">
          <div className="text-white font-semibold text-2xl">
            Tatsumeeko: Meekolony Pass
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-3">
            <StatsCard
              title="FLOOR PRICE"
              value={formatTwoDigits(stats.floorPrice) + "◎"}
            />
            <StatsCard
              title="TOTAL VOLUME"
              value={formatTwoDigits(stats.volumeAll) + "◎"}
            />
            <StatsCard
              title="AVG SALE PRICE"
              value={formatTwoDigits(stats.avgPrice24hr) + "◎"}
            />
            <StatsCard title="TOTAL LISTED COUNT" value={stats.listedCount} />
            <StatsCard title="UNIQUE HOLDER" value={uniqueHolder} />
          </div>
        </div>
      </div>
      <div>
        <div className="text-white font-semibold text-2xl">
          Meekolony Listings
        </div>
        <Table columns={listingsCol} data={listings} />
        <Pagination fetchData={fetchListings} />
      </div>
      <div>
        <div className="text-white font-semibold text-2xl">
          Meekolony Activities
        </div>
        <Table columns={activitiesCol} data={activities} />
        <Pagination fetchData={fetchActivities} />
      </div>
      <SimpleDialog
        isOpen={listingsEndOpen}
        setIsOpen={setListingsEndOpen}
        title="No data available"
        content="The listings data is ended. Thank you."
        buttonText="Close"
        buttonStatus="success"
      />
      <SimpleDialog
        isOpen={activitiesEndOpen}
        setIsOpen={setActivitiesEndOpen}
        title="No data available"
        content="The activities data is ended. Thank you."
        buttonText="Close"
        buttonStatus="success"
      />
      <SimpleDialog
        isOpen={copiedSuccessOpen}
        setIsOpen={setCopiedSuccessOpen}
        title="Copied To Clipboard"
        content="Successfully copied value to clipboard. You are able to paste it."
        buttonText="Close"
        buttonStatus="success"
      />
    </div>
  );
};

export default MeekolonyCollection;
