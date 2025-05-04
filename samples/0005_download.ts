import { argv, exit } from "node:process";
import fs from "node:fs/promises";
import { canistorage } from  "./0000_common.ts";

const args = argv.slice(2);
if (args.length != 2) {
  console.error("Usage: download <canistorage path> <destination path>");  
  exit(1);
}

const [ canistoragePath, destinationPath ] = args;

try {
  let position = 0;
  let writeStream = null;

  while (true) {
    const result = await canistorage.load(canistoragePath, BigInt(position));
    if (result.Err) {
      console.error(result.Err);
      exit(1);
    }

    const { downloaded_at, chunk, sha256 } = result.Ok;
    if (!writeStream) {
      writeStream = await fs.open(destinationPath, "w");
    }
    await writeStream.write(chunk);
    if (sha256[0]) { // value of Option sha256
      await writeStream.close();
      console.log(`downloaded. ${destinationPath} (size:${downloaded_at})`)
      break;
    }
    position = downloaded_at;
  }
} catch (e) {
  console.error(e);
}
