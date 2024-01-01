"use client";
import { useState, useEffect, useContext } from "react";

import { parseJwt } from "@/lib/parsejwt";
import TokenContext from "@/lib/TokenContext";
import { TaskCard } from "./TaskCard";
import { fetchTaskByStudnetId } from "@/lib/fetchTaskByStudnetId";
interface Task {
  status: string;
  title: string;
  description: string;
  dueDate: string;
  id: string;
}

export const StudentInterface = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const rawToken = useContext(TokenContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (rawToken) {
        const tasks = await fetchTaskByStudnetId(rawToken);
        if (tasks) {
          setTasks(tasks);
        }
      }
    };

    fetchTasks();
  }, [rawToken]);
  return (
    <main className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            status={task.status}
            id={task.id}
          />
        ))}
      </div>
    </main>
  );
};
