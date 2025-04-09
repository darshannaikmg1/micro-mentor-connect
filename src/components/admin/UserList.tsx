
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MentorItem, MenteeItem, UserProfileType } from "./UserProfile";

interface UserListProps {
  users: UserProfileType[];
  type: 'mentors' | 'mentees';
  isLoading: boolean;
}

const UserList = ({ users, type, isLoading }: UserListProps) => {
  const title = type === 'mentors' ? 'Registered Mentors' : 'Registered Mentees';
  const description = type === 'mentors' 
    ? 'Manage mentor profiles and accounts' 
    : 'Manage mentee accounts and learning progress';

  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user) => (
              type === 'mentors' 
                ? <MentorItem key={user.id} mentor={user} />
                : <MenteeItem key={user.id} mentee={user} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-400">
            No {type} found matching your search criteria
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserList;
