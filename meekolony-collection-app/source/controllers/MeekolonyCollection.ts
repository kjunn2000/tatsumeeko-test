import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cmService from "../services/cmService";

const symbol = "meekolony";

interface Stats {
  symbol: String;
  floorPrice: BigInt;
  listedCount: BigInt;
  volumnAll: BigInt;
}

interface Listings {
  name: String;
  pdaAddress: String;
  auctionHouse: String;
  tokenAddress: String;
  tokenMint: String;
  seller: String;
  tokenSize: BigInt;
  price: BigInt;
}

interface Activites {
  signature: String;
  type: String;
  source: String;
  tokenMint: String;
  collection: String;
  slot: BigInt;
  blockTime: BigInt;
  buyer: String;
  buyerReferral: String;
  seller: String;
  sellerReferral: String;
  price: BigInt;
}

const getMeekolonyStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var config = {
    method: "get",
    url: `http://api-mainnet.magiceden.dev/v2/collections/${symbol}/stats`,
    headers: {},
  };
  let result: AxiosResponse = await axios(config);
  let stats: Stats = result.data;
  return res.status(200).json({
    message: stats,
  });
};

const getMeekolonyListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var config = {
    method: "get",
    url: `http://api-mainnet.magiceden.dev/v2/collections/${symbol}/listings?offset=${req.query.offset}&limit=20`,
    headers: {},
  };
  let result: AxiosResponse = await axios(config);
  let listings: Listings[] = result.data;

  return res.status(200).json({
    message: listings,
  });
};

const getMeekolonyActivities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var config = {
    method: "get",
    url: `http://api-mainnet.magiceden.dev/v2/collections/${symbol}/activities?offset=${req.query.offset}&limit=20`,
    headers: {},
  };
  let result: AxiosResponse = await axios(config);
  let stats: Activites[] = result.data;
  return res.status(200).json({
    message: stats,
  });
};

const getUniqueHolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const candyMachineId: any = process.env.CANDY_MACHINE_ID;
    const data = await cmService.fetchHashTable(candyMachineId);
    return res.status(200).json({
      message: data,
    });
  } catch (e) {
    return res.status(400).json({
      message: [],
    });
  }
};

export default {
  getMeekolonyStats,
  getMeekolonyListings,
  getMeekolonyActivities,
  getUniqueHolders,
};
