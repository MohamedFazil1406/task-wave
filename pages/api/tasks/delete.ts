import { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = req.cookies.session;
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { taskId } = req.body;
  if (!taskId) return res.status(400).json({ error: "taskId required" });

  try {
    const decoded = await admin.auth().verifySessionCookie(session, true);
    const docRef = adminDb.collection("tasks").doc(taskId);

    await adminDb.runTransaction(async (tx) => {
      const doc = await tx.get(docRef);

      if (!doc.exists || doc.data()?.userId !== decoded.uid) {
        throw new Error("Not allowed");
      }

      tx.delete(docRef);
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    if ((err as Error).message === "Not allowed") {
      return res.status(403).json({ error: "Not allowed" });
    }
    return res.status(500).json({ error: "Server error" });
  }
}
