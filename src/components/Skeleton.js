import {Card, Skeleton} from "@nextui-org/react";

export function SingleSkeleton() {
  return (
    <Card className="w-[300px]  space-y-5 p-4 " radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-48 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}


export default function CustomSkeleton() {
 return (
    <div className="flex justify-center items-center mt-6">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-8">
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
        <SingleSkeleton />
      </div>
    </div>
  )
}
