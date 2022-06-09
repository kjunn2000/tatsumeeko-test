import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import axios from "axios";
import { format } from "morgan";

const nftService = {
  getTokenAccounts: async (connection: Connection, pubKey: string) => {
    let accounts: any = [];
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

    console.log(`Found ${accounts?.length} account(s) for pubKey ${pubKey}.`);
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

export default nftService;
