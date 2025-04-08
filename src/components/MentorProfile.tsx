
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMentorById } from "@/data/mentorData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Video, MapPin, Star, Link as LinkIcon, Clock, BookOpen, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const mentor = getMentorById(id || "");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSessionType, setSelectedSessionType] = useState<"live" | "recorded" | "offline" | null>(null);

  if (!mentor) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Mentor Not Found</h2>
        <p className="text-gray-600 mb-8">The mentor you're looking for doesn't exist or has been removed.</p>
        <Link to="/mentors">
          <Button>Browse All Mentors</Button>
        </Link>
      </div>
    );
  }

  const handleBookSession = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to book a session",
        variant: "destructive",
      });
      navigate("/login?redirect=mentor/" + id);
      return;
    }
    
    if (!selectedSessionType) {
      toast({
        title: "Session Type Required",
        description: "Please select a session type",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would navigate to a booking page or open a booking modal
    toast({
      title: "Session Request Sent",
      description: `Your ${selectedSessionType} session request has been sent to ${mentor.name}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/mentors" className="text-primary flex items-center mb-8">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor">
          <path 
            fillRule="evenodd" 
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Mentors
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Mentor Info */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <img 
              src={mentor.avatar} 
              alt={mentor.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div className="mt-4 md:mt-0 md:ml-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{mentor.name}</h1>
              <p className="text-lg text-gray-600">{mentor.title}</p>
              <p className="text-sm text-gray-500">{mentor.company}</p>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill={i < Math.floor(mentor.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {mentor.rating} ({mentor.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-3">Bio</h3>
                  <p className="text-gray-600">{mentor.bio}</p>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-none">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6 mb-3">Session Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mentor.sessionTypes.live && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Live Session</h4>
                          <p className="text-sm text-gray-600">Real-time video chat on Zoom or Google Meet</p>
                        </div>
                      </div>
                    )}
                    
                    {mentor.sessionTypes.recorded && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Recorded Response</h4>
                          <p className="text-sm text-gray-600">Submit your question and get a video response</p>
                        </div>
                      </div>
                    )}
                    
                    {mentor.sessionTypes.offline && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-md">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">In-Person</h4>
                          <p className="text-sm text-gray-600">Meet face-to-face at an agreed location</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Work Experience</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-medium">{mentor.title}</h4>
                        <p className="text-sm text-gray-600">{mentor.company}</p>
                        <p className="text-sm text-gray-500">2020 - Present</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-medium">Previous Role</h4>
                        <p className="text-sm text-gray-600">Previous Company</p>
                        <p className="text-sm text-gray-500">2018 - 2020</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Education</h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4">
                        <h4 className="font-medium">Master's Degree</h4>
                        <p className="text-sm text-gray-600">University Name</p>
                        <p className="text-sm text-gray-500">2016 - 2018</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-medium">Bachelor's Degree</h4>
                        <p className="text-sm text-gray-600">University Name</p>
                        <p className="text-sm text-gray-500">2012 - 2016</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">Reviews ({mentor.reviews})</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill={i < Math.floor(mentor.rating) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        {mentor.rating} average
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample Reviews */}
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <img 
                            src="https://i.pravatar.cc/150?img=68" 
                            alt="Reviewer" 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">Jane Cooper</p>
                            <p className="text-xs text-gray-500">2 weeks ago</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill={i < 5 ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Incredibly helpful session! {mentor.name} provided specific, actionable advice for my situation. 
                        I implemented their suggestions and saw immediate improvements.
                      </p>
                    </div>
                    
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <img 
                            src="https://i.pravatar.cc/150?img=12" 
                            alt="Reviewer" 
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">Alex Morgan</p>
                            <p className="text-xs text-gray-500">1 month ago</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill={i < 4 ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Great mentor with deep industry knowledge. The session was well-structured and 
                        I appreciated the follow-up resources they shared afterward.
                      </p>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking */}
        <div>
          <div className="bg-white rounded-lg border shadow-sm p-6 sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Book a Session</h3>
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-1" />
                <span>30 min</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold text-gray-900">${mentor.hourlyRate}</div>
              <div className="text-gray-500 ml-2">per session</div>
            </div>
            
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900">Select Session Type</h4>
              
              {mentor.sessionTypes.live && (
                <button
                  onClick={() => setSelectedSessionType("live")}
                  className={`w-full flex items-center p-3 border rounded-md ${
                    selectedSessionType === "live" 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <Video className={`h-5 w-5 mr-3 ${selectedSessionType === "live" ? "text-primary" : "text-gray-500"}`} />
                  <div className="text-left">
                    <div className={`font-medium ${selectedSessionType === "live" ? "text-primary" : "text-gray-900"}`}>
                      Live Video Session
                    </div>
                    <div className="text-xs text-gray-500">Real-time conversation</div>
                  </div>
                </button>
              )}
              
              {mentor.sessionTypes.recorded && (
                <button
                  onClick={() => setSelectedSessionType("recorded")}
                  className={`w-full flex items-center p-3 border rounded-md ${
                    selectedSessionType === "recorded" 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <Calendar className={`h-5 w-5 mr-3 ${selectedSessionType === "recorded" ? "text-primary" : "text-gray-500"}`} />
                  <div className="text-left">
                    <div className={`font-medium ${selectedSessionType === "recorded" ? "text-primary" : "text-gray-900"}`}>
                      Recorded Response
                    </div>
                    <div className="text-xs text-gray-500">Get a video response</div>
                  </div>
                </button>
              )}
              
              {mentor.sessionTypes.offline && (
                <button
                  onClick={() => setSelectedSessionType("offline")}
                  className={`w-full flex items-center p-3 border rounded-md ${
                    selectedSessionType === "offline" 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <MapPin className={`h-5 w-5 mr-3 ${selectedSessionType === "offline" ? "text-primary" : "text-gray-500"}`} />
                  <div className="text-left">
                    <div className={`font-medium ${selectedSessionType === "offline" ? "text-primary" : "text-gray-900"}`}>
                      In-Person Meeting
                    </div>
                    <div className="text-xs text-gray-500">Meet face-to-face</div>
                  </div>
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handleBookSession} 
                className="w-full"
              >
                Book Session
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast({
                      title: "Authentication Required",
                      description: "Please log in or sign up to contact this mentor",
                      variant: "destructive",
                    });
                    navigate("/login?redirect=mentor/" + id);
                    return;
                  }
                  toast({
                    title: "Message Sent",
                    description: `Your message has been sent to ${mentor.name}`,
                  });
                }}
              >
                Message Mentor
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Available on</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.availability.map((day, index) => (
                  <Badge key={index} variant="outline">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
