import { Connection } from "@solana/web3.js";
import { MetadataProgram } from "@metaplex-foundation/mpl-token-metadata";

const connection = new Connection("https://rpc.theindex.io", "finalized");
const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;

const cmService = {
  fetchHashTable: async (hash: string) => {
    const metadataAccounts = await MetadataProgram.getProgramAccounts(
      connection,
      {
        filters: [
          {
            memcmp: {
              offset:
                1 +
                32 +
                32 +
                4 +
                MAX_NAME_LENGTH +
                4 +
                MAX_URI_LENGTH +
                4 +
                MAX_SYMBOL_LENGTH +
                2 +
                1 +
                4 +
                0 * MAX_CREATOR_LEN,
              bytes: hash,
            },
          },
        ],
      }
    );
    let set = new Set();
    metadataAccounts.forEach((acc) => {
      set.add(acc.info.owner);
    });
    return set.size;
  },
};

export default cmService;
