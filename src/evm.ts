import { SwitchboardProgram, RoutineAccount } from "@switchboard-xyz/evm.js";
import { providers } from "ethers";
import { formatEther } from "ethers/lib/utils";

const PROVIDER = new providers.JsonRpcProvider("https://rpc.ankr.com/core");
const ROUTINE_ADDRESS = "0x5Ccb10eAf93F9871F38F9BC6E0DF498C38C94B24";

export async function load() {
  // Create a SwitchboardProgram to load the RoutineAccount data.
  const routineData = await RoutineAccount.load(
    /* program= */ await SwitchboardProgram.fromProvider(PROVIDER),
    /* address= */ ROUTINE_ADDRESS
  );
  // Convert the balance to ETH.
  const ethBalance = Number(formatEther(routineData.balance));

  console.log();
  console.log("===  EVM ===");
  console.log("Provider:", PROVIDER.connection.url);
  console.log("Routine ID:", routineData.address);
  console.log("Balance:", ethBalance);
}
