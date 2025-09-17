

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // visible to browser
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,      // visible to browser
  apiVersion: process.env.SANITY_API_VERSION!,           // versioning
  useCdn: false,                                         // always fetch fresh
  token: process.env.SANITY_API_TOKEN,                   // server-only
});
