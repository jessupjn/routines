import * as solana from "./solana";
import * as starknet from "./starknet";
import * as evm from "./evm";

Promise.resolve()
  .then(() => solana.load())
  .then(() => evm.load())
  .then(() => starknet.load());
