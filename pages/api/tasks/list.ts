import type { NextApiRequest, NextApiResponse } from "next";
import admin, { adminDb } from "@/libs/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionCookie = req.cookies.session;
  if (!sessionCookie) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 🔐 Verify user
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);

    // 🧠 Pagination params
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    const cursor = req.query.cursor as string | undefined;

    let query = adminDb
      .collection("tasks")
      .where("userId", "==", decoded.uid)
      .orderBy("createdAt", "desc")
      .select("title", "description", "completed") // 🔥 fetch only needed fields
      .limit(limit);

    // 🔁 Pagination
    if (cursor) {
      const cursorDoc = await adminDb.collection("tasks").doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const nextCursor =
      snapshot.docs.length === limit
        ? snapshot.docs[snapshot.docs.length - 1].id
        : null;

    return res.status(200).json({
      success: true,
      tasks,
      nextCursor,
    });
  } catch (error) {
    console.error("Fetch tasks error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
