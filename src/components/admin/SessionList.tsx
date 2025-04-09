
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SessionItem from "./SessionItem";

interface Session {
  id: string;
  status: string;
  scheduled_at?: string;
  duration: number;
}

interface SessionListProps {
  sessions: Session[];
  isLoading: boolean;
}

const SessionList = ({ sessions, isLoading }: SessionListProps) => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <CardDescription>Monitor recent mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => (
              <SessionItem key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No recent sessions found</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionList;
