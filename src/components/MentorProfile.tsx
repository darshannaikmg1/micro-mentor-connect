import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Star, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { getMentors, Mentor } from "@/data/mentorData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadMentor = () => {
      setLoading(true);
      try {
        const mentors = getMentors();
        const foundMentor = mentors.find((m) => m.id === id);
        if (foundMentor) {
          setMentor(foundMentor);
        }
      } catch (error) {
        console.error("Error loading mentor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadMentor();
    }
  }, [id]);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to message this mentor.",
        variant: "destructive",
      });
      navigate("/login?redirect=/mentor/" + id);
      return;
    }
    
    if (messageText.trim()) {
      toast({
        title: "Message sent",
        description: "Your message has been sent to the mentor.",
      });
      setMessageText("");
    }
  };

  const handleBookSession = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to book a session.",
        variant: "destructive",
      });
      navigate("/login?redirect=/mentor/" + id);
      return;
    }
    
    toast({
      title: "Session request sent",
      description: "Your session request has been sent to the mentor.",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Mentor Not Found</h1>
        <p className="mb-6">
          Sorry, the mentor you're looking for does not exist or has been removed.
        </p>
        <Button onClick={() => navigate("/mentors")}>Browse Mentors</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mentor Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
                  <p className="text-lg text-gray-600">{mentor.title}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-white">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Badge variant="secondary" className="bg-white">
                        +{mentor.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="about">
                <TabsList className="mb-6 w-full justify-start">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Bio</h2>
                    <p className="text-gray-600">{mentor.bio}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Session Types</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {mentor.sessionTypes.live && (
                        <Card>
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Live Video Session</p>
                              <p className="text-sm text-gray-500">Real-time mentoring</p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {mentor.sessionTypes.recorded && (
                        <Card>
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                              <MessageCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Recorded Response</p>
                              <p className="text-sm text-gray-500">Get a video answer</p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {mentor.sessionTypes.offline && (
                        <Card>
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">In-Person Meeting</p>
                              <p className="text-sm text-gray-500">Meet face to face</p>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Work Experience</h2>
                    <div className="space-y-4">
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="font-medium">{mentor.title}</p>
                        <p className="text-sm text-gray-600">{mentor.company}</p>
                        <p className="text-sm text-gray-500">2020 - Present</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="font-medium">Senior Developer</p>
                        <p className="text-sm text-gray-600">Previous Company</p>
                        <p className="text-sm text-gray-500">2015 - 2020</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="font-medium">Developer</p>
                        <p className="text-sm text-gray-600">First Company</p>
                        <p className="text-sm text-gray-500">2012 - 2015</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3">Education</h2>
                    <div className="space-y-4">
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="font-medium">Master's in Computer Science</p>
                        <p className="text-sm text-gray-600">University of Technology</p>
                        <p className="text-sm text-gray-500">2010 - 2012</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4">
                        <p className="font-medium">Bachelor's in Computer Science</p>
                        <p className="text-sm text-gray-600">State University</p>
                        <p className="text-sm text-gray-500">2006 - 2010</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill={star <= 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-semibold">4.0</span>
                    <span className="text-gray-500 ml-2">(12 reviews)</span>
                  </div>

                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">John Smith</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= 5 ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill={star <= 5 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">3 weeks ago</p>
                      </div>
                      <p className="text-gray-600">
                        Great session! {mentor.name} provided insightful advice on my career
                        transition and suggested some excellent resources. Looking forward to another
                        session soon.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Alex Johnson</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= 4 ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill={star <= 4 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">1 month ago</p>
                      </div>
                      <p className="text-gray-600">
                        I appreciated the technical insights and practical advice. Would have liked
                        a bit more time for questions, but overall a very helpful session.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>MD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Maria Diaz</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= 3 ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill={star <= 3 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">2 months ago</p>
                      </div>
                      <p className="text-gray-600">
                        Decent session but I felt we could have gone deeper on some topics. The
                        mentor was knowledgeable but we ran out of time before covering everything I
                        wanted to discuss.
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    See All Reviews
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Right Column - Booking & Contact */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="mb-4 flex items-baseline">
              <span className="text-2xl font-bold">${mentor.hourlyRate}</span>
              <span className="text-gray-500 ml-1">/hour</span>
            </div>

            <div className="space-y-4">
              <Button className="w-full" onClick={handleBookSession}>
                Book a Session
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" /> Message Mentor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Message {mentor.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleMessageSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter message subject" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Send Message</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold mb-2">Quick Mentor Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-medium">4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-medium">English, Spanish</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Zone</span>
                  <span className="font-medium">PST (GMT-8)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold mb-4">Connect with {mentor.name.split(" ")[0]}</h3>
            <div className="flex justify-between">
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h-.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Report this Mentor</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you believe this mentor is violating our community guidelines, please let us know.
            </p>
            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 w-full">
              Report an Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
