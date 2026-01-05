// pages/api/auth/sessionLogin.ts
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../libs/firebaseAdmin"; // <- ensure this path is correct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("sessionLogin handler invoked", req.method);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { idToken } = req.body ?? {};
    if (!idToken || typeof idToken !== "string") {
      console.warn("Missing idToken in body:", req.body);
      return res.status(400).json({ error: "Missing or invalid idToken" });
    }

    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const cookie = [
      `session=${sessionCookie}`,
      `Max-Age=${Math.floor(expiresIn / 1000)}`,
      `Path=/`,
      `HttpOnly`,
      `SameSite=Lax`,
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");

    res.setHeader("Set-Cookie", cookie);
    console.log("sessionLogin success — cookie set");
    return res.status(200).json({ status: "success" });
  } catch (err: any) {
    console.error("sessionLogin error:", err);
    if (err?.code && err?.code.startsWith("auth/")) {
      return res.status(401).json({ error: "Invalid or expired ID token" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
