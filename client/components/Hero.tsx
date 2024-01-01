"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Hero() {
  return (
    <main className="flex flex-col lg:flex-row gap-10 p-6">
      <aside className="flex flex-col gap-6">
        <CardHeader>
          <h2 className="text-2xl font-bold">
            Welcome To The Student Management System
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          Please Login to continue Further{" "}
        </CardContent>
      </aside>
    </main>
  );
}
