
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAdminData } from "@/hooks/useAdminData";
import StatCards from "@/components/admin/StatCards";
import UserList from "@/components/admin/UserList";
import SessionList from "@/components/admin/SessionList";
import ActivityLogCard from "@/components/admin/ActivityLogCard";

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication and admin role
  if (!isAuthenticated) {
    navigate("/login?redirect=/admin");
    return null;
  }

  if (user?.role !== 'admin') {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    navigate("/dashboard");
    return null;
  }

  // Use our custom hook to fetch and manage admin data
  const {
    searchQuery,
    setSearchQuery,
    filteredMentors,
    filteredMentees,
    sessions,
    isLoading,
    activeSessionCount
  } = useAdminData(isAuthenticated, user?.role);

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
            <StatCards 
              mentorCount={filteredMentors.length} 
              menteeCount={filteredMentees.length} 
              activeSessionCount={activeSessionCount} 
            />
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
              <UserList 
                users={filteredMentors} 
                type="mentors"
                isLoading={isLoading} 
              />
            </TabsContent>

            <TabsContent value="mentees">
              <UserList 
                users={filteredMentees} 
                type="mentees"
                isLoading={isLoading} 
              />
            </TabsContent>

            <TabsContent value="sessions">
              <SessionList 
                sessions={sessions} 
                isLoading={isLoading} 
              />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityLogCard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
