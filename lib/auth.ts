import { headers } from "next/headers";

export async function getCurrentUserId() {
  const headerStore = await headers();
  return headerStore.get("x-user-id") || "demo-user";
}
