// deno run --allow-net=127.0.0.1:4943 main.ts

import { Actor, HttpAgent } from "@dfinity/agent";
import type { Identity } from "@dfinity/agent";
import { idlFactory } from "./declarations/canistorage/canistorage.did.js";
import type { _SERVICE } from "./declarations/canistorage/canistorage.did.d.ts";

interface CanistorageOption {
  host?: string;
  canisterId: string;
  identity?: Identity | Promise<Identity>
}

/**
 * 
 * @param host ex. "http://127.0.0.1:4943" for local, "https://icp-api.io" for IC
 * @param canisterId canisterId of deployed Canistorage
 * @param identity
 * @returns 
 */
export default async function init({host, canisterId, identity}: CanistorageOption):Promise<_SERVICE> {
  // Fetch root key for certificate validation during development
  // const shouldFetchRootKey = host.includes("127.0.0.1") || host.includes("localhost"); 
  const shouldFetchRootKey = !!host && !host.includes("icp-api.io");

  const agent = await HttpAgent.create({
    host,
    shouldFetchRootKey,
    identity
  });

  const canistorage = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  }) as _SERVICE;
  return canistorage;
}
