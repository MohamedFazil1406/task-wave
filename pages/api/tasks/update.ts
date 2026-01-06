import { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = req.cookies.session;
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { taskId, title, description, completed } = req.body;
  if (!taskId) return res.status(400).json({ error: "taskId required" });

  try {
    const decoded = await admin.auth().verifySessionCookie(session, true);

    const docRef = adminDb.collection("tasks").doc(taskId);

    const result = await docRef.update({
      title,
      description,
      completed,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    if (err.code === 5) {
      // Firestore NOT_FOUND
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(500).json({ error: "Server error" });
  }
}
