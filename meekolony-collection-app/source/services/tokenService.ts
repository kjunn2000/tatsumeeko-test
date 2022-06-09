import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { format, token } from "morgan";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  AccountInfo,
  Connection,
  PublicKey,
  ParsedAccountData,
} from "@solana/web3.js";

const tokenService = {
  getTokenAccounts: async (connection: Connection, pubKey: string) => {
    let accounts: Array<{
      pubkey: PublicKey;
      account: AccountInfo<Buffer | ParsedAccountData>;
    }> = [];
    if (pubKey) {
      accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
        filters: [
          {
            dataSize: 165,
          },
          {
            memcmp: {
              offset: 32,
              bytes: pubKey,
            },
          },
        ],
      });
    }
    return accounts;
  },

  getTokenData: async (connection: Connection, token: any) => {
    try {
      if (token && token.mint) {
        let mintPubkey = new PublicKey(token.mint);
        let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
        let tokenData = await Metadata.load(connection, tokenmetaPubkey);
        return tokenData;
      }
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
