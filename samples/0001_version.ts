import { canistorage } from  "./0000_common.ts";

try {
  const version = await canistorage.version();
  console.log(version);
} catch (e) {
  console.error(e);
}
