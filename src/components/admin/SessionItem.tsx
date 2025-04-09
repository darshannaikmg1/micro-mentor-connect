
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
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <Badge className={
              session.status === 'completed' ? "bg-green-100 text-green-800 hover:bg-green-200" : 
              session.status === 'pending' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" : 
              session.status === 'cancelled' ? "bg-red-100 text-red-800 hover:bg-red-200" : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }>
              {session.status?.charAt(0).toUpperCase() + session.status?.slice(1)}
            </Badge>
            <span className="ml-2 text-sm text-gray-500">
              {session.scheduled_at ? new Date(session.scheduled_at).toLocaleString() : 'Not scheduled'}
            </span>
          </div>
          <h3 className="font-medium mt-2">Session ID: {session.id.substring(0, 8)}</h3>
          <p className="text-sm text-gray-500">{session.duration} minutes</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SessionItem;
