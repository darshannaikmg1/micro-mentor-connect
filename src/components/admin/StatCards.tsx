
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

interface StatCardsProps {
  mentorCount: number;
  menteeCount: number;
  activeSessionCount: number;
}

const StatCards = ({ mentorCount, menteeCount, activeSessionCount }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5 text-indigo-400" /> Total Mentors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{mentorCount}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5 text-indigo-400" /> Total Mentees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{menteeCount}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-indigo-400" /> Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{activeSessionCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
