import { canistorage } from  "./0000_common.ts";

try {
  const result = await canistorage.initCanistorage();
  if (result.Err) {
    console.error(result.Err);   
  } else {
    console.log('initialized');
  }
} catch (e) {
  console.error(e);
}
