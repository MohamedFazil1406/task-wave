"use server";

import admin from "./firebaseAdmin";
import { cookies } from "next/headers";

export async function verifySession() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    console.log("Decoded session cookie:", decoded);
    return decoded; // user info
  } catch (error) {
    return null;
  }
}
