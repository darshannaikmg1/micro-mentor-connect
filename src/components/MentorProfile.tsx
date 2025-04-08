
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Star, 
  Calendar, 
  Globe, 
  Clock, 
  MessageCircle, 
  Video,
  Bookmark,
  BookmarkCheck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMentorById, Mentor } from "@/data/mentorData";
import { useMentorSave } from "@/hooks/useMentorSave";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import BookSessionModal from "./BookSessionModal";

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { saveMentor, unsaveMentor, isMentorSaved } = useMentorSave();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      navigate("/mentors");
      return;
    }

    // In a real application, this would be an API call
    try {
      const mentorData = getMentorById(id);
      if (mentorData) {
        setMentor(mentorData);
      } else {
        navigate("/mentors");
      }
    } catch (error) {
      console.error("Error fetching mentor:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleSaveToggle = async () => {
    if (!mentor) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save mentors",
      });
      navigate("/login?redirect=/mentor/" + id);
      return;
    }
    
    if (isMentorSaved(mentor.id)) {
      await unsaveMentor(mentor.id);
    } else {
      await saveMentor(mentor);
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleMessageMentor = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to message mentors",
      });
      navigate("/login?redirect=/mentor/" + id);
      return;
    }
    
    // In a real application, this would open a chat or messaging interface
    toast({
      title: "Message feature",
      description: "The messaging feature would open here.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Mentor not found</h2>
          <p className="mt-2 text-gray-600">
            The mentor you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/mentors")} className="mt-4">
            Browse Mentors
          </Button>
        </div>
      </div>
    );
  }

  const saved = isMentorSaved(mentor.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 flex justify-center">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{mentor.name}</h1>
                  <p className="text-lg text-gray-600 mb-1">{mentor.title}</p>
                  <p className="text-sm text-gray-500 mb-4">{mentor.company}</p>
                </div>
                <button
                  onClick={handleSaveToggle}
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={saved ? "Remove from saved mentors" : "Save mentor"}
                >
                  {saved ? (
                    <BookmarkCheck className="h-6 w-6 text-primary" />
                  ) : (
                    <Bookmark className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((skill, i) => (
                  <Badge key={i} variant="outline" className="bg-white/60">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500 ml-1">({mentor.reviewCount})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-1" />
                  <span>${mentor.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-500 mr-1" />
                  <span>{mentor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-wrap justify-center md:justify-end gap-3">
          <Button variant="outline" onClick={handleMessageMentor}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Mentor
          </Button>
          <BookSessionModal 
            mentorId={mentor.id} 
            mentorName={mentor.name} 
            hourlyRate={mentor.hourlyRate} 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">
                {mentor.bio}
              </p>

              <h3 className="text-lg font-semibold mb-3">Session Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {mentor.sessionTypes.oneOnOne && (
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <MessageCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">1:1 Mentoring</h4>
                        <p className="text-sm text-gray-500">
                          Personal guidance tailored to your specific needs
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {mentor.sessionTypes.groupSession && (
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <Video className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Group Sessions</h4>
                        <p className="text-sm text-gray-500">
                          Collaborative learning with other mentees
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {mentor.languages?.map((language, i) => (
                  <Badge key={i} variant="secondary">
                    {language}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              {mentor.workExperience?.map((job, i) => (
                <div key={i} className="mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{job.description}</p>
                </div>
              ))}

              <h2 className="text-xl font-semibold mb-4 mt-8">Education</h2>
              {mentor.education?.map((edu, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{edu.degree}</h3>
                      <p className="text-primary">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500 ml-1">({mentor.reviewCount} reviews)</span>
                </div>
              </div>

              {mentor.reviews?.map((review, i) => (
                <div key={i} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Schedule a Session</h2>
              <p className="text-gray-600 mb-4">
                Choose a time that works for you and book a session with {mentor.name}.
              </p>
              <div className="flex items-center justify-between text-sm mb-4">
                <span>Session fee:</span>
                <span className="font-medium">${mentor.hourlyRate}/hr</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button className="w-full" asChild>
                  <div>
                    <Calendar className="mr-2 h-4 w-4" />
                    <BookSessionModal 
                      mentorId={mentor.id} 
                      mentorName={mentor.name} 
                      hourlyRate={mentor.hourlyRate} 
                    />
                  </div>
                </Button>
                <Button variant="outline" className="w-full" onClick={handleMessageMentor}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message First
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Connect</h2>
              <div className="flex justify-center space-x-4">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleSocialClick("https://facebook.com")}
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleSocialClick("https://twitter.com")}
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleSocialClick("https://instagram.com")}
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleSocialClick("https://linkedin.com")}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">Availability</h2>
              <p className="text-gray-600 text-sm mb-4">
                Usually responds within 24 hours
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-100 text-green-800 rounded p-1 text-center">Mon</div>
                <div className="bg-green-100 text-green-800 rounded p-1 text-center">Tue</div>
                <div className="bg-green-100 text-green-800 rounded p-1 text-center">Wed</div>
                <div className="bg-green-100 text-green-800 rounded p-1 text-center">Thu</div>
                <div className="bg-green-100 text-green-800 rounded p-1 text-center">Fri</div>
                <div className="bg-gray-100 text-gray-400 rounded p-1 text-center">Sat</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
