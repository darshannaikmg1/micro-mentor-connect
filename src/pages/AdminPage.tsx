
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight, Shield, Users, Calendar, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_type: 'mentor' | 'mentee' | 'admin';
  created_at: string;
  expertise?: string[];
  hourly_rate?: number;
  available_for_hire?: boolean;
  bio?: string;
}

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState<UserProfile[]>([]);
  const [mentees, setMentees] = useState<UserProfile[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/admin");
      return;
    }

    // Check if user is admin
    if (user?.role !== 'admin') {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch mentors
        const { data: mentorsData, error: mentorsError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'mentor');

        if (mentorsError) throw mentorsError;

        // Fetch mentees
        const { data: menteesData, error: menteesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'mentee');

        if (menteesError) throw menteesError;

        // Fetch sessions
        const { data: sessionsData, error: sessionsError } = await supabase
          .from('sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (sessionsError) throw sessionsError;

        // Get emails for users
        const userIds = [...mentorsData, ...menteesData].map(profile => profile.id);
        
        // In a real app, you'd need a more efficient way to get emails
        // This is just for demonstration since we can't query auth.users directly
        
        setMentors(mentorsData as UserProfile[]);
        setMentees(menteesData as UserProfile[]);
        setSessions(sessionsData || []);
      } catch (error: any) {
        console.error("Error fetching admin data:", error);
        toast({
          title: "Error",
          description: "Failed to load admin data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, user, toast]);

  const filteredMentors = mentors.filter((mentor) => 
    mentor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMentees = mentees.filter((mentee) => 
    mentee.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Shield className="mr-2 h-8 w-8 text-indigo-500" /> Admin Dashboard
              </h1>
              <p className="mt-1 text-gray-400">Manage users and monitor platform activity</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-indigo-400" /> Total Mentors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{mentors.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5 text-indigo-400" /> Total Mentees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{mentees.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-400" /> Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{sessions.filter(s => s.status === 'active').length}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Search users by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Tabs defaultValue="mentors" className="space-y-4">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="mentors" className="data-[state=active]:bg-indigo-900">Mentors</TabsTrigger>
              <TabsTrigger value="mentees" className="data-[state=active]:bg-indigo-900">Mentees</TabsTrigger>
              <TabsTrigger value="sessions" className="data-[state=active]:bg-indigo-900">Recent Sessions</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-indigo-900">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="mentors">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Registered Mentors</CardTitle>
                  <CardDescription className="text-gray-400">Manage mentor profiles and accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : filteredMentors.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMentors.map((mentor) => (
                        <div key={mentor.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
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
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-400">No mentors found matching your search criteria</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mentees">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Registered Mentees</CardTitle>
                  <CardDescription className="text-gray-400">Manage mentee accounts and learning progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : filteredMentees.length > 0 ? (
                    <div className="space-y-4">
                      {filteredMentees.map((mentee) => (
                        <div key={mentee.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
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
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-400">No mentees found matching your search criteria</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                  <CardDescription className="text-gray-400">Monitor recent mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : sessions.length > 0 ? (
                    <div className="space-y-4">
                      {sessions.map((session) => (
                        <div key={session.id} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <Badge className={
                                  session.status === 'completed' ? "bg-green-600" : 
                                  session.status === 'pending' ? "bg-yellow-600" : 
                                  session.status === 'cancelled' ? "bg-red-600" : "bg-blue-600"
                                }>
                                  {session.status?.charAt(0).toUpperCase() + session.status?.slice(1)}
                                </Badge>
                                <span className="ml-2 text-sm text-gray-400">
                                  {session.scheduled_at ? new Date(session.scheduled_at).toLocaleString() : 'Not scheduled'}
                                </span>
                              </div>
                              <h3 className="font-medium mt-2">Session ID: {session.id.substring(0, 8)}</h3>
                              <p className="text-sm text-gray-400">{session.duration} minutes</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-gray-400">No recent sessions found</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-indigo-400" /> Platform Activity
                  </CardTitle>
                  <CardDescription className="text-gray-400">Recent actions and events on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                        <span className="text-gray-400 w-32">2 minutes ago</span>
                        <span>New user registered: <span className="font-medium">Jane Smith</span></span>
                      </div>
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-400 w-32">15 minutes ago</span>
                        <span>Session completed: <span className="font-medium">Career Development</span></span>
                      </div>
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-400 w-32">1 hour ago</span>
                        <span>New session booked: <span className="font-medium">Technical Interview Prep</span></span>
                      </div>
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-gray-400 w-32">3 hours ago</span>
                        <span>Profile updated: <span className="font-medium">John Davis</span></span>
                      </div>
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></div>
                        <span className="text-gray-400 w-32">1 day ago</span>
                        <span>New mentor application: <span className="font-medium">Sarah Johnson</span></span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
