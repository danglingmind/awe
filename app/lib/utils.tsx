import { auth } from "@/app/lib/auth";

export function isIdValid(id?: string): boolean {
  if (!id || id.length !== 12) return false;
  return true;
}

export async function getUserId() {
  const session = await auth();
  return session?.user?.id ?? null;
}
