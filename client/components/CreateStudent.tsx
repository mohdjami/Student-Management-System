"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminPanel() {
  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6">
      <aside className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Create Student</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input id="student-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-email">Student Email</Label>
              <Input id="student-email" required type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="student-class">Class</Label>
              <Input id="student-class" required />
            </div>
            <Button className="w-full">Create Student</Button>
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
