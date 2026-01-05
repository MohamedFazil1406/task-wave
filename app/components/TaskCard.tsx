"use client";

import { useState } from "react";
import DeleteTaskModal from "./DeleteTaskModel";
import EditTaskModal from "./EditTaskModel";

interface TaskCardProps {
  taskId: string;
  title: string;
  content: string;
  status: "Completed" | "Pending";
  onRefresh: () => void;
}

export default function TaskCard({
  taskId,
  title,
  content,
  status,
  onRefresh,
}: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🗑️ DELETE TASK */
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Delete failed");
        return;
      }

      setShowDelete(false);
      onRefresh(); // 🔄 reload tasks
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ UPDATE TASK */
  const handleEdit = async (data: {
    title: string;
    content: string;
    status: "Completed" | "Pending";
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId,
          title: data.title,
          description: data.content,
          completed: data.status === "Completed",
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || "Update failed");
        return;
      }

      setShowEdit(false);
      onRefresh(); // 🔄 reload tasks
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border border-gray-300 rounded-lg p-4 m-10 w-[1220px] bg-white">
      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-[#2f333c] font-bold">{title}</h2>

        <div className="flex items-center gap-4 relative">
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              status === "Completed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#efeff0] rounded-lg px-3 py-1 text-xl font-bold text-[#656466]"
          >
            ··
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-gray-300 rounded-lg p-2 shadow-lg w-32 z-20">
              <button
                className="block text-left w-full px-2 py-1 text-green-800 hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="block text-left w-full px-2 py-1 text-red-800 hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowDelete(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <p className="text-gray-700 text-xl">{content}</p>

      {/* DELETE MODAL */}
      {showDelete && (
        <DeleteTaskModal
          loading={loading}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <EditTaskModal
          initialTitle={title}
          initialContent={content}
          initialStatus={status}
          loading={loading}
          onCancel={() => setShowEdit(false)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}
