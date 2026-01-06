// pages/api/tasks/create.ts
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
    const sessionCookie = req.cookies.session;
    if (!sessionCookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    // 🔥 Write to Firestore (fast)
    const docRef = await adminDb.collection("tasks").add({
      title,
      description: description || "",
      completed: false,
      userId: decoded.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 🔥 Respond immediately
    return res.status(201).json({
      success: true,
      taskId: docRef.id,
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
