
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityLog from "./ActivityLog";

const ActivityLogCard = () => {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-indigo-600" /> Platform Activity
        </CardTitle>
        <CardDescription>Recent actions and events on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityLog />
      </CardContent>
    </Card>
  );
};

export default ActivityLogCard;
