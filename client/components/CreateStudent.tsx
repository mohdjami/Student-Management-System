"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminPanel() {
  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6 cols-3 items-start">
      <div className="flex flex-col gap-6 w-full">
        <aside className="flex flex-col gap-6 w-full">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Create Student</h2>
            </CardHeader>
            <CardContent className="space-y-4 grid grid-cols-1 gap-4">
              {" "}
              <div>
                <div className="space-y-2 w-full">
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
              </div>
              <Button className="w-full">Create Student</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
