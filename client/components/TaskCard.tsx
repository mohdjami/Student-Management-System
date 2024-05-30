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

  let date = new Date(dueDate);

  let year = date.getFullYear();
  let month = date.getMonth() + 1; // getMonth() returns a 0-based month, so we add 1
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Ensure all parts are two-digits by padding with a leading zero if necessary
  month = month < 10 ? 0 + month : month;
  day = day < 10 ? 0 + day : day;
  hours = hours < 10 ? 0 + hours : hours;
  minutes = minutes < 10 ? 0 + minutes : minutes;

  let readableDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;

  console.log(readableDateTime); // Output: "14-03-2022 10:30"
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
            <Badge className="font-medium">Due: {readableDateTime}</Badge>
          </div>
        </CardContent>
        <div className="flex justify-end items-center space-x-4 p-5">
          <Button
            className="text-xs px-2 py-1"
            onClick={async () => {
              console.log("clicked");
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
