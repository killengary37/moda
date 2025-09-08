"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { auth } from "../auth";
import { db } from "../db";
import { guests } from "../db/schema/guest";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});

const redirectSchema = z.object({
  redirectTo: z.string().url().optional(),
});

const COOKIE_OPTIONS = {
  httpOnly: true as const,
  secure: true as const,
  sameSite: "strict" as const,
  path: "/" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

const GUEST_COOKIE = "guest_session";

export async function createGuestSession() {
  const store = await cookies();
  const existing = store.get(GUEST_COOKIE)?.value;
  if (existing) return existing;

  const token = randomUUID();
  const expires = new Date(Date.now() + COOKIE_OPTIONS.maxAge * 1000);

  await db.insert(guests).values({
    sessionToken: token,
    expiresAt: expires,
  });

  store.set(GUEST_COOKIE, token, {
    ...COOKIE_OPTIONS,
    expires,
  });

  return token;
}

export async function guestSession() {
  const store = await cookies();
  let token = store.get(GUEST_COOKIE)?.value;
  if (!token) {
    token = await createGuestSession();
  }
  return token;
}

export async function signUp(input: unknown) {
  const data = credentialsSchema.merge(redirectSchema).parse(input);

  {
    const body: { name: string; email: string; password: string } = {
      name: data.name ?? "",
      email: data.email,
      password: data.password,
    };
    await auth.api.signUpEmail({ body });
  }

  await handlePostAuthMerge();

  return { ok: true };
}

export async function signIn(input: unknown) {
  const data = credentialsSchema.merge(redirectSchema).parse(input);

  await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  await handlePostAuthMerge();

  return { ok: true };
}

export async function signOut() {
  await auth.api.signOut({ method: "POST", headers: {} });
  const store = await cookies();
  const token = store.get(GUEST_COOKIE)?.value;
  if (token) {
    await db.delete(guests).where(eq(guests.sessionToken, token));
    store.delete(GUEST_COOKIE);
  }
  return { ok: true };
}

export async function mergeGuestCartWithUserCart() {
  return { ok: true };
}

async function handlePostAuthMerge() {
  const store = await cookies();
  const token = store.get(GUEST_COOKIE)?.value;
  if (token) {
    await db.delete(guests).where(eq(guests.sessionToken, token));
    store.delete(GUEST_COOKIE);
  }
}
