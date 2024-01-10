"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CreateStudent from "@/components/CreateStudentForm";
import AssignTasksForm from "@/components/AssignTasksForm";
import { useContext, useState } from "react";
import TokenContext from "@/lib/TokenContext";
import { parseJwt } from "@/lib/parsejwt";
import StudentCard from "@/components/StudentCard";

export default function AdminPanel() {
  const [activeComponent, setActiveComponent] = useState("");
  const rawToken = useContext(TokenContext);
  const token = rawToken ? parseJwt(rawToken) : null;
  if (token && token.role !== "ADMIN") {
    return (
      <main className="flex flex-col lg:flex-row gap-10 p-6 mt-20 items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          You are not an admin or reload the page
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-10 p-6 mt-20 items-center justify-center">
      <div className="flex flex-row items-center space-x-4">
        <Button onClick={() => setActiveComponent("CreateUser")}>
          Create Student
        </Button>
        <Button onClick={() => setActiveComponent("AssignTask")}>
          Assign Tasks
        </Button>
        <Button onClick={() => setActiveComponent("Students")}>Students</Button>
      </div>
      <div className={activeComponent === "CreateUser" ? "" : "hidden"}>
        <CreateStudent />
      </div>
      <div className={activeComponent === "AssignTask" ? "" : "hidden"}>
        <AssignTasksForm />
      </div>
      <div className={activeComponent === "Students" ? "" : "hidden"}>
        <StudentCard />
      </div>
    </main>
  );
}
