"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useContext } from "react";
import TokenContext from "@/lib/TokenContext";
import router from "next/router";
import { updateTaskStatus } from "@/api/updateTaskStatus";

interface TaskProps {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  id: string;
}
export const TaskCard: React.FC<TaskProps> = ({
  title,
  description,
  dueDate,
  status,
  id,
}) => {
  const token = useContext(TokenContext);
  if (!token) {
    return <div>Token Expired or null Please Login</div>;
  }
  return (
    <div>
      <Card>
        <CardHeader className="p-4">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription>
            {" "}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </CardDescription>
          <p className="mt-2 text-sm text-gray-500">Status</p>

          <Badge className="mt-2">{status}</Badge>

          <div>
            {" "}
            <Badge className="font-medium">Due: {dueDate}</Badge>
          </div>
        </CardContent>
        <div className="flex justify-end items-center space-x-4">
          <Button
            className="text-xs px-2 py-1"
            onClick={async () => {
              await updateTaskStatus(token, id);
            }}
          >
            Task Done
          </Button>
        </div>
      </Card>
    </div>
  );
};
