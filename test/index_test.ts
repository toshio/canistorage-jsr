import { assertStringIncludes } from "jsr:@std/assert"
import Canistorage from "../src/index.ts";

Deno.test(async function version() {
  const canistorage = await Canistorage({
    host: "http://127.0.0.1:4943",
    canisterId: "uxrrr-q7777-77774-qaaaq-cai"
  });
  const version = <string>await canistorage.version();
  assertStringIncludes(version, "canistorage");
  console.log(version);
});
