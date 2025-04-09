
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  status: string;
  scheduled_at?: string;
  duration: number;
}

interface SessionItemProps {
  session: Session;
}

const SessionItem = ({ session }: SessionItemProps) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <Badge className={
              session.status === 'completed' ? "bg-green-600" : 
              session.status === 'pending' ? "bg-yellow-600" : 
              session.status === 'cancelled' ? "bg-red-600" : "bg-blue-600"
            }>
              {session.status?.charAt(0).toUpperCase() + session.status?.slice(1)}
            </Badge>
            <span className="ml-2 text-sm text-gray-400">
              {session.scheduled_at ? new Date(session.scheduled_at).toLocaleString() : 'Not scheduled'}
            </span>
          </div>
          <h3 className="font-medium mt-2">Session ID: {session.id.substring(0, 8)}</h3>
          <p className="text-sm text-gray-400">{session.duration} minutes</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
