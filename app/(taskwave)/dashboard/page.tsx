"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import SearchBar from "@/app/components/SearchTask";
import TaskCard from "@/app/components/TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks/list");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch tasks");
      }

      setTasks(data.tasks);
    } catch (error) {
      console.error("Fetch tasks error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-6 mt-6 px-10">
          <Card
            content={totalTasks}
            title="Total Tasks"
            className="bg-[#436ec5]"
          />

          <Card
            content={completedTasks}
            title="Completed Tasks"
            titleClassName="text-[#0f0f11]"
            className="bg-[#faf9f9]"
            contentClassName="text-[#278755]"
          />

          <Card
            content={pendingTasks}
            title="Pending Tasks"
            titleClassName="text-[#0f0f11]"
            className="bg-[#faf9f9]"
            contentClassName="text-[#d9534f]"
          />
        </div>

        {/* Search */}
        <div className="px-10 mt-6">
          <SearchBar />
        </div>

        {/* Tasks */}
        <div className="px-10 mt-6">
          {loading && <p className="ml-10">Loading tasks...</p>}

          {!loading && tasks.length === 0 && (
            <p className="ml-10 text-gray-500">No tasks found</p>
          )}

          {!loading &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                taskId={task.id}
                title={task.title}
                content={task.description}
                status={task.completed ? "Completed" : "Pending"}
                onRefresh={fetchTasks}
              />
            ))}
        </div>
      </div>
    </>
  );
}
