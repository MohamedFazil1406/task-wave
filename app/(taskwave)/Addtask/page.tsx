"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("false");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTaskCreation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        console.error("Task creation failed:", data.error);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <textarea
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
      </div>
      <div>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />
      </div>
      <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        >
          <option value="">Select Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <button
        onClick={handleTaskCreation}
        disabled={loading}
        className="bg-blue-500 text-white rounded-lg p-2 w-full"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
}
