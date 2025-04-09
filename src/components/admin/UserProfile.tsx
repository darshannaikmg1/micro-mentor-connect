
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export interface UserProfileType {
  id: string;
  full_name: string;
  email?: string;
  user_type: 'mentor' | 'mentee' | 'admin';
  created_at: string;
  expertise?: string[];
  hourly_rate?: number;
  available_for_hire?: boolean;
  bio?: string;
}

interface MentorItemProps {
  mentor: UserProfileType;
}

export const MentorItem = ({ mentor }: MentorItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="bg-indigo-700">{mentor.full_name?.charAt(0) || 'M'}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{mentor.full_name}</h3>
          <p className="text-sm text-gray-400">{mentor.email || 'No email available'}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {mentor.expertise?.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="outline" className="bg-indigo-900/30 text-xs">{skill}</Badge>
            ))}
            {mentor.expertise && mentor.expertise.length > 3 && (
              <Badge variant="outline" className="bg-indigo-900/30 text-xs">+{mentor.expertise.length - 3} more</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Badge className={mentor.available_for_hire ? "bg-green-600" : "bg-gray-600"}>
          {mentor.available_for_hire ? "Available" : "Unavailable"}
        </Badge>
        <Button variant="ghost" size="icon" className="ml-2">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

interface MenteeItemProps {
  mentee: UserProfileType;
}

export const MenteeItem = ({ mentee }: MenteeItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="bg-emerald-700">{mentee.full_name?.charAt(0) || 'M'}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{mentee.full_name}</h3>
          <p className="text-sm text-gray-400">{mentee.email || 'No email available'}</p>
          <p className="text-xs text-gray-500">Joined: {new Date(mentee.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
