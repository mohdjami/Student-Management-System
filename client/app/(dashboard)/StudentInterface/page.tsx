"use client";
import { useContext, useState } from "react";
import TokenContext from "@/lib/TokenContext";
import { parseJwt } from "@/lib/parsejwt";
import { StudentInterface } from "@/components/StudentInterface";

export default function StudentInter() {
  const [activeComponent, setActiveComponent] = useState("");

  const rawToken = useContext(TokenContext);
  const token = rawToken ? parseJwt(rawToken) : null;

  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6 mt-20 items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        STUDENT INTERFACE
        <StudentInterface />
      </div>
    </main>
  );
}
