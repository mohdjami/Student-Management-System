"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { resolve } from "path";
import TokenContext from "@/lib/TokenContext";

const CreateStudent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const token = useContext(TokenContext);
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  //role will come from the jwt in the cookie
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    isLoading(true);
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/users/signup`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            department,
          }),
        }
      );
      setName("");
      setDepartment("");
      setPassword("");
      setEmail("");
      if (response.status === 201) {
        toast({
          title: "User Successfully created",
          variant: "default",
        });
        router.push("/Admin");
      } else if (response.status === 403) {
        toast({
          title: "You are not authorized for this action.",
          variant: "destructive",
        });
      }
      isLoading(false);
    } catch (error) {
      toast({
        title: "User not created",
        variant: "destructive",
      });
      router.push("/create-student");
    }
    isLoading(false);
  };
  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6 cols-3 items-start">
      <div className="flex flex-col gap-6 w-full">
        <aside className="flex flex-col gap-6">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <h2 className="text-2xl font-bold">Create Student</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {" "}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>{" "}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Department</Label>
                <Input
                  id="department"
                  required
                  type="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                {loading ? "Loading" : "Create"}
              </Button>
            </CardContent>
          </Card>{" "}
        </aside>
      </div>
    </main>
  );
};

export default CreateStudent;
