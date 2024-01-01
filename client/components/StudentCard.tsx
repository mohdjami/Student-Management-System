import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

import {
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContext, useEffect, useState } from "react";
import TokenContext from "@/lib/TokenContext";
import { Button } from "./ui/button";
import { fetchTaskByStudnetId } from "@/lib/fetchTaskByStudnetId";
import { TaskCard } from "./TaskCard";
interface Student {
  id: string;
  email: string;
  role: string;
  name: string;
}
interface Task {
  status: string;
  title: string;
  description: string;
  dueDate: string;
  id: string;
}
export default function StudentCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = useContext(TokenContext);
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/students`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setStudents(data.data.students);
    };
    fetchTasks();
  }, [token]);

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Student List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map(
          (student, index) =>
            student.role === "STUDENT" && (
              <Card key={index}>
                <CardHeader className="flex items-center space-x-2">
                  <CardTitle>{student.name}</CardTitle>
                  <p>{student.email}</p>
                  <Button
                    onClick={async () => {
                      const response = await fetch(
                        `https://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/students/${student.id}/task`
                      );
                      const data = await response.json();
                      setTasks(data.tasks);
                    }}
                  >
                    View Tasks Assigned
                  </Button>{" "}
                </CardHeader>
              </Card>
            )
        )}{" "}
      </div>
      <h2 className="text-xl font-bold">Student Tasks</h2>
      <div>
        {" "}
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
}
