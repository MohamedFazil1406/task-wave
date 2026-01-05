"use client";

import { useState } from "react";

type Props = {
  initialTitle: string;
  initialContent: string;
  initialStatus: "Completed" | "Pending"; // ✅ ADD
  loading: boolean;
  onCancel: () => void;
  onSave: (data: {
    title: string;
    content: string;
    status: "Completed" | "Pending"; // ✅ ADD
  }) => void | Promise<void>;
};

export default function EditTaskModal({
  initialTitle,
  initialContent,
  initialStatus,
  loading,
  onCancel,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<"Completed" | "Pending">(initialStatus);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title,
      content,
      status, // ✅ SEND STATUS
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

      {/* Modal box */}
      <div className="relative w-[500px] max-w-[90%] bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-lg font-semibold text-black mb-4">Edit Task</h2>

        {/* Title */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="w-full mb-4 px-3 py-2 border text-black border-gray-300 rounded text-sm
                     focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          disabled={loading}
          className="w-full text-black mb-4 px-3 py-2 border border-gray-300 rounded text-sm resize-none
                     focus:ring-2 focus:ring-blue-500"
        />

        {/* Status */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Completed" | "Pending")}
          disabled={loading}
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-1.5 text-sm border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
