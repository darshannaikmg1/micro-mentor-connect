
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityLog from "./ActivityLog";

const ActivityLogCard = () => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-indigo-400" /> Platform Activity
        </CardTitle>
        <CardDescription className="text-gray-400">Recent actions and events on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityLog />
      </CardContent>
    </Card>
  );
};

export default ActivityLogCard;
