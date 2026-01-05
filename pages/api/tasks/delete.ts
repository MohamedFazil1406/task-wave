import { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = req.cookies.session;
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const decoded = await admin.auth().verifySessionCookie(session, true);
    const { taskId } = req.body;

    const docRef = adminDb.collection("tasks").doc(taskId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data()?.userId !== decoded.uid) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await docRef.delete();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
