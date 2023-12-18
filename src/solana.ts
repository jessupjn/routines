import { web3 } from "@coral-xyz/anchor";
import * as spl from "@solana/spl-token";
import {
  FunctionRoutineAccount,
  SwitchboardProgram,
} from "@switchboard-xyz/solana.js";

const CONNECTION = new web3.Connection("https://api.mainnet-beta.solana.com");
const ROUTINE_ADDRESS = new web3.PublicKey(
  "CSQaewfgJgQ9yeAwYbhyqjGyru67fzAvizBM7qZVgedo"
);

export async function load() {
  // Create a SwitchboardProgram to load the RoutineAccount data (to find its escrow address).
  const [routineAccount, routineData] = await FunctionRoutineAccount.load(
    /* program= */ await SwitchboardProgram.load(CONNECTION),
    /* address= */ ROUTINE_ADDRESS
  );
  // Load the RoutineAccount's escrow account, and convert the balance from lamports to Sol.
  const escrowData = await spl.getAccount(
    /* connection= */ routineAccount.program.connection,
    /* address= */ routineData.escrowTokenWallet
  );
  const solBalance = routineAccount.program.mint.fromTokenAmount(
    /* amount= */ escrowData.amount
  );

  console.log();
  console.log("===  Solana ===");
  console.log("Connection:", CONNECTION.rpcEndpoint);
  console.log("Routine Pubkey:", routineAccount.publicKey.toBase58());
  console.log("Escrow Pubkey:", escrowData.address.toBase58());
  console.log("Balance:", solBalance);
}
