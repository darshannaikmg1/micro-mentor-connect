
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SavedMentors from "@/components/SavedMentors";
import { useToast } from "@/components/ui/use-toast";

type Session = {
  id: string;
  title: string;
  mentor_name: string;
  scheduled_at: string;
  duration: number;
  status: string;
  meeting_url?: string;
};

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [pastSessions, setPastSessions] = useState<Session[]>([]);
  const [sessionRequests, setSessionRequests] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/dashboard");
      return;
    }

    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be a Supabase query
        // For now, let's simulate some data
        
        // Sample upcoming session
        const upcoming = [{
          id: "1",
          title: "Career Development Strategy",
          mentor_name: "Jane Smith",
          scheduled_at: new Date(Date.now() + 86400000).toISOString(), // tomorrow
          duration: 60,
          status: "approved",
          meeting_url: "https://zoom.us/j/123456789"
        }];
        
        setUpcomingSessions(upcoming);
        setPastSessions([]);
        
        if (user?.role === 'mentor') {
          setSessionRequests([]);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [isAuthenticated, navigate, user]);

  const handleJoinMeeting = (meetingUrl: string) => {
    // In a real implementation, this would open the meeting URL
    window.open(meetingUrl, '_blank');
    
    toast({
      title: "Joining meeting",
      description: "Opening meeting link in a new tab.",
    });
  };

  const handleReschedule = (sessionId: string) => {
    // In a real implementation, this would open a reschedule modal
    toast({
      title: "Reschedule session",
      description: "The reschedule functionality would open here.",
    });
  };

  const handleViewMentors = () => {
    navigate("/mentors");
  };

  const handleViewResources = () => {
    // In a real implementation, this would navigate to resources
    toast({
      title: "Resources",
      description: "This would navigate to the resources page.",
    });
  };

  const handleViewSchedule = () => {
    // In a real implementation, this would navigate to schedule
    toast({
      title: "Schedule",
      description: "This would navigate to your schedule page.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-gray-600">Welcome back, {user?.name}</p>
            </div>
            {user?.role === 'mentee' && (
              <Button onClick={() => navigate("/mentors")}>Find a Mentor</Button>
            )}
            {user?.role === 'mentor' && (
              <Button onClick={() => navigate("/become-mentor")}>Edit Mentor Profile</Button>
            )}
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
              <TabsTrigger value="past">Past Sessions</TabsTrigger>
              {user?.role === 'mentee' && (
                <TabsTrigger value="saved">Saved Mentors</TabsTrigger>
              )}
              {user?.role === 'mentor' && (
                <TabsTrigger value="requests">Session Requests</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : upcomingSessions.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingSessions.map((session) => (
                    <Card key={session.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle>{session.title}</CardTitle>
                          <div className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Upcoming
                          </div>
                        </div>
                        <CardDescription>with {session.mentor_name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">
                              {new Date(session.scheduled_at).toLocaleDateString()} at {' '}
                              {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{session.duration} minutes</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReschedule(session.id)}
                            >
                              Reschedule
                            </Button>
                            {session.meeting_url && (
                              <Button 
                                size="sm"
                                onClick={() => handleJoinMeeting(session.meeting_url!)}
                              >
                                Join Meeting
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  No upcoming sessions. <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/mentors")}>Find a mentor</Button> to schedule more.
                </p>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : pastSessions.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Past sessions would be rendered here */}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  You don't have any past sessions yet.
                </p>
              )}
            </TabsContent>

            {user?.role === 'mentee' && (
              <TabsContent value="saved" className="space-y-6">
                <SavedMentors />
              </TabsContent>
            )}

            {user?.role === 'mentor' && (
              <TabsContent value="requests" className="space-y-6">
                {isLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : sessionRequests.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Session requests would be rendered here */}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    You don't have any pending session requests.
                  </p>
                )}
              </TabsContent>
            )}
          </Tabs>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  {user?.role === 'mentor' ? 'Your Mentees' : 'Your Mentors'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {user?.role === 'mentor' 
                    ? 'View and manage your mentee relationships.'
                    : 'Connect with your mentors and schedule sessions.'}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={handleViewMentors}
                >
                  {user?.role === 'mentor' ? 'View Mentees' : 'View Mentors'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-primary" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Access videos, articles, and other resources to help you grow.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={handleViewResources}
                >
                  Browse Resources
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {user?.role === 'mentor' 
                    ? 'Manage your availability for mentoring sessions.'
                    : 'View your upcoming scheduled mentoring sessions.'}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={handleViewSchedule}
                >
                  {user?.role === 'mentor' ? 'Set Availability' : 'View Schedule'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
