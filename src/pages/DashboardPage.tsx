
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Video } from "lucide-react";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle>Career Development Strategy</CardTitle>
                      <div className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Upcoming
                      </div>
                    </div>
                    <CardDescription>with Jane Smith</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Tomorrow, 3:00 PM</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">60 minutes</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Meeting</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <p className="text-center text-gray-500 py-4">
                No more upcoming sessions. <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/mentors")}>Find a mentor</Button> to schedule more.
              </p>
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <p className="text-center text-gray-500 py-8">
                You don't have any past sessions yet.
              </p>
            </TabsContent>

            {user?.role === 'mentee' && (
              <TabsContent value="saved" className="space-y-6">
                <p className="text-center text-gray-500 py-8">
                  You haven't saved any mentors yet.
                </p>
              </TabsContent>
            )}

            {user?.role === 'mentor' && (
              <TabsContent value="requests" className="space-y-6">
                <p className="text-center text-gray-500 py-8">
                  You don't have any pending session requests.
                </p>
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
                <Button variant="outline" className="w-full mt-4">
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
                <Button variant="outline" className="w-full mt-4">
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
                <Button variant="outline" className="w-full mt-4">
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
