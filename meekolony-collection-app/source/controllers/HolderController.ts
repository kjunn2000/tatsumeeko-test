import { Request, Response, NextFunction } from "express";
import tokenService from "../services/tokenService";
import {
  Connection,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
} from "@solana/web3.js";

const getTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const endpoint: string | undefined = process.env.SOLANA_RPC_HOST;
    const pubKey = req.query.pubKey;
    if (!endpoint || typeof pubKey != "string") {
      throw new Error("invalid.pubKey");
    }
    const connection = new Connection(endpoint, {
      commitment: "confirmed",
      disableRetryOnRateLimit: true,
    });
    const accounts: Array<{
      pubkey: PublicKey;
      account: AccountInfo<Buffer | ParsedAccountData>;
    }> = await tokenService.getTokenAccounts(connection, pubKey);
    let metaDataList: any = [];
    if (accounts?.length > 0) {
      let tokenList = accounts.map(
        (accountInfo: any) => accountInfo?.account?.data?.parsed?.info
      );
      let ownedTokens = tokenList.filter(
        (token: any) => token.owner === pubKey
      );
      let ownedTokenData: any = [];
      for (let token of ownedTokens) {
        let tokenData = await tokenService.getTokenData(connection, token);
        if (tokenData) {
          ownedTokenData.push(tokenData);
        }
      }
      for (let tokenData of ownedTokenData) {
        let metaData: any = await tokenService.getMetaData(tokenData);
        if (metaData && metaData?.symbol && metaData?.symbol === "MKLN") {
          metaDataList.push(metaData);
        }
      }
    }
    return res.status(200).json({
      message: metaDataList,
    });
  } catch (e) {
    return res.status(400).json({
      message: [],
    });
  }
};

export default { getTokens };
