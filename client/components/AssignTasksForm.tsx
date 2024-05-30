"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useContext, useState } from "react";
import TokenContext from "@/lib/TokenContext";
import { toast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AssignTasksForm() {
  const token = useContext(TokenContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    isLoading(true);
    if (!token) {
      console.error("No token available");
      return;
    }
    if (!studentEmail) {
      alert("Please enter a valid email address");
    }
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/students/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status: status,
          dueDate: dueDate,
          email: studentEmail,
        }),
      }
    );

    if (!response.ok) {
      toast({
        title: "Error",
        description:
          "An error occurred while submitting the task. Please try again later.",
      });
      console.error("Failed to create task");
    } else {
      const data = await response.json();
      toast({
        title: "Task Created",
        variant: "default",
      });
      // Clear the fields
      setTitle("");
      setDescription("");
      setStatus("");
      setDueDate("");
      setStudentEmail("");
    }
    isLoading(false);
  };

  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6 cols-3 items-start">
      <div className="flex flex-col gap-6 w-full">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold">Assign Task</h2>
          </CardHeader>
          <CardContent className="space-y-4 grid grid-cols-1 gap-4">
            {" "}
            <div>
              <div className="space-y-2 w-full">
                {" "}
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="title"
                  required
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />{" "}
              </div>{" "}
              <div className="space-y-2">
                <Label htmlFor="task-description">Task Description</Label>
                <Input
                  id="description"
                  required
                  type="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />{" "}
              </div>{" "}
              <div className="pt-4">
                <Select
                  onValueChange={(value) => {
                    setStatus(value);
                  }}
                  defaultValue={status}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Task Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="OVERDUE">OVERDUE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  required
                  value={dueDate}
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>{" "}
              <Button className="w-full" onClick={handleSubmit}>
                {loading ? "Loading" : "Assign Task"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
