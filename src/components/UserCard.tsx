import { UserCardProps } from "./types/User";
import { Card, CardContent } from "@/components/ui/card";

export const UserCard = ({ id, name, email, age }: UserCardProps) => {
  return (
    <Card key={id}>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">ID</div>
            <div>{id}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div>{name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="truncate">{email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Age</div>
            <div>{age}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
