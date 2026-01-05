import type { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1️⃣ Read session cookie
    const sessionCookie = req.cookies.session;
    if (!sessionCookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 2️⃣ Verify user
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    // 3️⃣ Fetch tasks for this user
    const snapshot = await adminDb
      .collection("tasks")
      .where("userId", "==", decoded.uid)
      .orderBy("createdAt", "desc")
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
