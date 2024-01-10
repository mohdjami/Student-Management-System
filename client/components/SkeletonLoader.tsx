import { Skeleton } from "@/components/ui/skeleton";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-full rounded-md" />
        </CardFooter>
      </Card>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
    </div>
  );
}
