import type { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1️⃣ Read session cookie
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 2️⃣ Verify logged-in user
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    // 3️⃣ Store task in Firestore
    const docRef = await adminDb.collection("tasks").add({
      title,
      description: description || "",
      completed: false,
      userId: decoded.uid, // 🔐 from session
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      taskId: docRef.id,
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
