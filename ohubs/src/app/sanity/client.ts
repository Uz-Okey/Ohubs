import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1ciz7f2a",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
