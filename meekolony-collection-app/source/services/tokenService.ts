import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { format, token } from "morgan";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const tokenService = {
  getTokens: async (connection: Connection, pubKey: string) => {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(pubKey),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    console.log("Token                                         Balance");
    console.log("------------------------------------------------------------");
    let tokenList: string[] = [];
    tokenAccounts.value.forEach((e) => {
      const accountInfo = AccountLayout.decode(e.account.data);
      if (accountInfo.owner.toString() === pubKey && accountInfo.amount > 0) {
        tokenList.push(new PublicKey(accountInfo.mint).toString());
        console.log(
          `${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`
        );
      }
    });
    return tokenList;
  },

  getTokenData: async (connection: Connection, mintAddr: string) => {
    try {
      let tokenmetaPubkey = await Metadata.getPDA(mintAddr);
      let tokenData = await Metadata.load(connection, tokenmetaPubkey);
      return tokenData;
    } catch (error) {
      console.log(error);
    }
  },

  getMetaData: async (tokenData: any) => {
    let metaData = {};
    if (tokenData) {
      let metaDataUri = tokenData.data?.data?.uri;
      console.log(metaDataUri);
      try {
        const response: any = await axios.get(metaDataUri);
        if (response && response.data) {
          metaData = response.data;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return metaData;
  },
};

export default tokenService;
