"use client";
import { useState, useEffect, useContext } from "react";
import TokenContext from "@/lib/TokenContext";
import { TaskCard } from "./TaskCard";
import { fetchTaskByStudentId } from "@/api/fetchTasksByStudentId";
import SkeletonLoader from "./SkeletonLoader";
import { Button } from "./ui/button";
import Container from "./ui/container";
interface Task {
  status: string;
  title: string;
  description: string;
  dueDate: string;
  id: string;
}

export const StudentInterface = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, isLoading] = useState(true);
  const [see, onSee] = useState(false);

  const rawToken = useContext(TokenContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (rawToken) {
        isLoading(true);
        const tasks = await fetchTaskByStudentId(rawToken);
        if (tasks) {
          setTasks(tasks);
          isLoading(false);
        }
      }
    };

    fetchTasks();
  }, [rawToken]);
  if (loading) {
    return <SkeletonLoader />;
  }
  return (
    <main className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {see ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id} // AddED this line
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              status={task.status}
              id={task.id}
            />
          ))
        ) : (
          <div>
            {" "}
            <Button onClick={() => onSee(true)}>See My Assigned Tasks</Button>
          </div>
        )}
      </div>
    </main>
  );
};
