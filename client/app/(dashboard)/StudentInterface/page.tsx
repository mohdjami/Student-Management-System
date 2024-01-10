"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CreateStudent from "@/components/CreateStudentForm";
import { useState } from "react";
import { StudentInterface } from "@/components/StudentInterface";

export default function StudentInter() {
  const [activeComponent, setActiveComponent] = useState("");

  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6 mt-20 items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        STUDENT INTERFACE
        <StudentInterface />
      </div>
    </main>
  );
}
