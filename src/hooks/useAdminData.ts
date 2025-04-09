
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfileType } from "@/components/admin/UserProfile";

export const useAdminData = (isAuthenticated: boolean, userRole: string | undefined) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState<UserProfileType[]>([]);
  const [mentees, setMentees] = useState<UserProfileType[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
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

        // In a real app, you'd need a more efficient way to get emails
        // For now, we'll set the mentors and mentees with the data we have
        // and handle the missing email field in the UI
        setMentors(mentorsData as UserProfileType[]);
        setMentees(menteesData as UserProfileType[]);
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
  }, [isAuthenticated, userRole, toast]);

  // Filter mentors and mentees based on search query
  const filteredMentors = mentors.filter((mentor) => 
    mentor.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMentees = mentees.filter((mentee) => 
    mentee.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSessionCount = sessions.filter(s => s.status === 'active').length;

  return {
    searchQuery,
    setSearchQuery,
    mentors,
    mentees,
    sessions,
    filteredMentors,
    filteredMentees,
    isLoading,
    activeSessionCount
  };
};
