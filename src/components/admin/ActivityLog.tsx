
import { Separator } from "@/components/ui/separator";

interface ActivityLogProps {
  // We could add props to make this component more dynamic in the future
}

const ActivityLog = ({}: ActivityLogProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-gray-400 w-32">2 minutes ago</span>
          <span>New user registered: <span className="font-medium">Jane Smith</span></span>
        </div>
        <Separator className="bg-gray-800" />
        
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-400 w-32">15 minutes ago</span>
          <span>Session completed: <span className="font-medium">Career Development</span></span>
        </div>
        <Separator className="bg-gray-800" />
        
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-gray-400 w-32">1 hour ago</span>
          <span>New session booked: <span className="font-medium">Technical Interview Prep</span></span>
        </div>
        <Separator className="bg-gray-800" />
        
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-gray-400 w-32">3 hours ago</span>
          <span>Profile updated: <span className="font-medium">John Davis</span></span>
        </div>
        <Separator className="bg-gray-800" />
        
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-gray-400 w-32">1 day ago</span>
          <span>New mentor application: <span className="font-medium">Sarah Johnson</span></span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
