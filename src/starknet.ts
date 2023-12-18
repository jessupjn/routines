import {
  RoutineAccount,
  SwitchboardProgram,
} from "@switchboard-xyz/starknet.js";
import { formatEther } from "ethers/lib/utils";
import { RpcProvider } from "starknet";

const PROVIDER = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});
const ROUTINE_ADDRESS = "0x551";

export async function load() {
  // Create a SwitchboardProgram to load the RoutineAccount data.
  const [routineAccount, routineData] = await RoutineAccount.load(
    /* program= */ new SwitchboardProgram("mainnet", PROVIDER),
    /* address= */ ROUTINE_ADDRESS
  );
  // Convert the balance to ETH - Starknet uses ETH ERC20 token as gas token currently.
  const ethBalance = Number(formatEther(routineData.balance.toString()));

  console.log();
  console.log("===  STARKNET ===");
  console.log("Provider:", PROVIDER.nodeUrl);
  console.log("Routine ID:", routineAccount.address);
  console.log("Balance:", ethBalance);
}
