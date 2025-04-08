
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Video, MessageCircle, Bookmark, BookmarkCheck } from "lucide-react";
import { type Mentor } from "@/data/mentorData";
import { useMentorSave } from "@/hooks/useMentorSave";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const { isAuthenticated } = useAuth();
  const { saveMentor, unsaveMentor, isMentorSaved } = useMentorSave();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const saved = isMentorSaved(mentor.id);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save mentors",
      });
      navigate("/login?redirect=/mentors");
      return;
    }
    
    if (saved) {
      await unsaveMentor(mentor.id);
    } else {
      await saveMentor(mentor);
    }
  };

  return (
    <Link to={`/mentor/${mentor.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 mentor-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-left">{mentor.name}</h3>
                <p className="text-sm text-gray-500 text-left">{mentor.title}</p>
                <p className="text-xs text-gray-400 text-left">{mentor.company}</p>
              </div>
            </div>
            <button 
              onClick={handleSaveToggle} 
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label={saved ? "Remove from saved mentors" : "Save mentor"}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1 mb-3">
              {mentor.expertise.slice(0, 3).map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {mentor.expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{mentor.expertise.length - 3}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3 text-left line-clamp-2">
              {mentor.bio}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{mentor.rating}</span>
              <span className="text-gray-400 ml-1">({mentor.reviewCount})</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>${mentor.hourlyRate}/hr</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.sessionTypes.oneOnOne && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                1:1 Session
              </Badge>
            )}
            {mentor.sessionTypes.groupSession && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Video className="h-3 w-3" />
                Group Session
              </Badge>
            )}
          </div>

          <div className="mt-auto">
            <Button className="w-full">View Profile</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MentorCard;
