
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Video, Calendar, MapPin } from "lucide-react";
import { Mentor } from "@/data/mentorData";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.title}</p>
            <p className="text-xs text-gray-500">{mentor.company}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {mentor.rating} ({mentor.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mt-3">
            {mentor.expertise.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-none">
                {skill}
              </Badge>
            ))}
            {mentor.expertise.length > 3 && (
              <Badge variant="outline" className="border-gray-200 text-gray-500">
                +{mentor.expertise.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 line-clamp-3">
          {mentor.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>${mentor.hourlyRate}/30 min</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {mentor.sessionTypes.live && (
              <Badge variant="outline" className="border-gray-200">
                <Video className="h-3 w-3 mr-1" />
                Live
              </Badge>
            )}
            {mentor.sessionTypes.recorded && (
              <Badge variant="outline" className="border-gray-200">
                <Calendar className="h-3 w-3 mr-1" />
                Recorded
              </Badge>
            )}
            {mentor.sessionTypes.offline && (
              <Badge variant="outline" className="border-gray-200">
                <MapPin className="h-3 w-3 mr-1" />
                In-person
              </Badge>
            )}
          </div>
        </div>
      </div>
      <CardFooter className="bg-gray-50 px-6 py-4">
        <Link to={`/mentor/${mentor.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
