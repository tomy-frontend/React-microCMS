import { createClient } from "microcms-js-sdk";

// microCMSを読み込むためのテンプレ,必須
export const client = createClient({
  serviceDomain: import.meta.env.VITE_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_API_KEY,
});
