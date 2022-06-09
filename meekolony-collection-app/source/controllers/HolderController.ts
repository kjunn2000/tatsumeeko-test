import { Request, Response, NextFunction } from "express";
import nftService from "../services/nftService";
import tokenService from "../services/tokenService";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { format } from "morgan";

// const getTokens = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const endpoint: string | undefined = process.env.SOLANA_RPC_HOST;
//     const pubKey = req.query.pubKey;
//     if (!endpoint || typeof pubKey != "string") {
//       throw new Error("invalid.pubKey");
//     }
//     const connection = new Connection(endpoint, {
//       commitment: "confirmed",
//       disableRetryOnRateLimit: true,
//     });
//     let accounts = await nftService.getTokenAccounts(connection, pubKey);
//     let metaDataList: any = [];
//     if (accounts?.length > 0) {
//       let tokenList = accounts.map(
//         (accountInfo: any) => accountInfo?.account?.data?.parsed?.info
//       );
//       let ownedTokens = tokenList.filter(
//         (token: any) =>
//           token.owner === pubKey && parseInt(token.tokenAmount?.amount) > 0
//       );
//       console.log(
//         `Found ${ownedTokens?.length} tokenData for pubKey ${pubKey}.`
//       );
//       let ownedTokenData: any = [];
//       for (let token of ownedTokens) {
//         let tokenData = await nftService.getTokenData(connection, token);
//         if (tokenData) {
//           ownedTokenData.push(tokenData);
//         }
//       }
//       console.log(
//         `Found ${ownedTokenData?.length} tokenData for pubKey ${pubKey}.`
//       );

//       for (let tokenData of ownedTokenData) {
//         let metaData: any = await nftService.getMetaData(tokenData);
//         if (metaData && metaData?.symbol && metaData?.symbol === "MKLN") {
//           metaDataList.push(metaData);
//         }
//       }
//       console.log(
//         `Found ${metaDataList?.length} metaData for pubKey ${pubKey}.`
//       );
//     }
//     return res.status(200).json({
//       message: metaDataList,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json({
//       message: [],
//     });
//   }
// };

const getTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection = new Connection(
      clusterApiUrl("mainnet-beta"),
      "confirmed"
    );

    const pubKey = req.query.pubKey;
    if (typeof pubKey != "string") {
      throw new Error("invalid.pubKey");
    }
    const data: string[] = await tokenService.getTokens(connection, pubKey);
    let ownedTokenData: any = [];
    for (let token of data) {
      let tokenData = await tokenService.getTokenData(connection, token);
      if (tokenData) {
        ownedTokenData.push(tokenData);
      }
    }
    let metaDataList: any = [];
    for (let tokenData of ownedTokenData) {
      let metaData: any = await tokenService.getMetaData(tokenData);
      if (metaData && metaData?.symbol && metaData?.symbol === "MKLN") {
        metaDataList.push(metaData);
      }
    }
    console.log(data.length);
    console.log(ownedTokenData.length);
    console.log(metaDataList.length);

    return res.status(200).json({
      message: metaDataList,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: [],
    });
  }
};

export default { getTokens };
