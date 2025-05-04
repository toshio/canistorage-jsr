import { argv, exit } from "node:process";
import { canistorage } from  "./0000_common.ts";

const args = argv.slice(2);
if (args.length != 1) {
  console.error("Usage: delete <canistorage path>");  
  exit(1);
}

const [ canistoragePath ] = args;

try {
  const result = await canistorage.delete(canistoragePath);
  if (result?.Err) {
    console.error(result.Err);
  } else {
    console.log("deleted.")
  }
} catch (e) {
  console.error(e);
}
