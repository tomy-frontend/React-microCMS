import { createClient } from "microcms-js-sdk";

// microCMSを読み込むため記述,APIキーは.envに記述
export const client = createClient({
  serviceDomain: import.meta.env.VITE_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_API_KEY,
});
