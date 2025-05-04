import { argv, exit } from "node:process";
import { canistorage } from  "./0000_common.ts";

const args = argv.slice(2);
if (args.length != 1) {
  console.error("Usage: createDirectory <path>");  
  exit(1);
}

try {
  const result = await canistorage.createDirectory(args[0]);
  if (result.Err) {
    console.error(result.Err);
  } else {
    console.log('directory created');
  }
} catch (e) {
  console.error(e);
}
