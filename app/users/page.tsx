import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsersPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="p-2 border rounded-md text-sm">
                {user.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
