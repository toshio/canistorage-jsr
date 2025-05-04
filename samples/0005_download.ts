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
    if (result.Ok) {
      const { download_at, chunk, sha256 } = result.Ok;
      console.log(`DEBUG: download_at:${download_at}, sha256:${sha256}`);
      if (!writeStream) {
        writeStream = await fs.open(destinationPath, "w");
      }
      await writeStream.write(chunk);
      if (sha256) {
        await writeStream.close();
        console.log(`downloaded. ${destinationPath} (size:${download_at}, sha256:${sha256})`)
        break;
      }
      position = download_at;
    } else {
      console.error(result.Err);
      exit(1);
    }
  }
} catch (e) {
  console.error(e);
}
