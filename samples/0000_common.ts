import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import Canistorage from "@toshio/canistorage";

export const canistorage = await Canistorage({
  host: "http://127.0.0.1:4943",
  canisterId: "uxrrr-q7777-77774-qaaaq-cai",
  identity: Secp256k1KeyIdentity.fromSeedPhrase("test test test test test test test test test test test test")
});
