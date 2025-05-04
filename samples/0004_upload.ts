import { argv, exit } from "node:process";
import fs from "node:fs/promises";
import { Buffer } from "node:buffer";
import { contentType } from "@std/media-types";
import { canistorage } from  "./0000_common.ts";

const args = argv.slice(2);
if (args.length != 2) {
  console.error("Usage: upload <source path> <canistorage path>");  
  exit(1);
}

const [ sourcePath, canistoragePath ] = args;

try {
  const type = contentType(sourcePath.replace(/^.*(\..*)$/, "$1")) || "application/octet-stream";
  const stats = await fs.stat(sourcePath);
  let result;
  if (stats.size < 1024 * 1024) {
    result = await uploadSmallerFile(sourcePath, type, canistoragePath);
  } else {
    result = await uploadLargerFile(sourcePath, type, canistoragePath);
  }
  if (result?.Err) {
    console.error(result.Err);
  } else {
    console.log("uploaded.")
  }
} catch (e) {
  console.error(e);
}

async function uploadSmallerFile(sourcePath:string, type:string, canistoragePath:string) {
  const data = await fs.readFile(sourcePath);
  const result = await canistorage.save(canistoragePath, type, data, false);
  return result;
}

async function uploadLargerFile(sourcePath:string, type:string, canistoragePath:string) {
  const resultBegin = await canistorage.beginUpload(canistoragePath, type, false);
  if (resultBegin.Err) {
    return resultBegin;
  }
  const file = await fs.open(sourcePath, "r");

  let start = 0;
  while (true) {
    const buffer = Buffer.alloc(1024 * 1024);
    const { bytesRead } = await file.read(buffer, 0, buffer.length);
    if (bytesRead === 0) {
      break;
    }

    const resultSend = await canistorage.sendData(canistoragePath, BigInt(start), buffer.subarray(0, bytesRead));
    if (resultSend.Err) {
      try {
        await canistorage.cancelUpload(canistoragePath);
      } catch (e) {
        // do nothing
      }
      return resultSend;
    }

    start += bytesRead;
    console.log(bytesRead);  
  }

  const resultCommit = await canistorage.commitUpload(canistoragePath, BigInt(start), []);
  if (resultSend.Err) {
    try {
    await canistorage.cancelUpload(canistoragePath);
    } catch (e) {
      // do nothing
    }
  }

  return resultCommit;
}
