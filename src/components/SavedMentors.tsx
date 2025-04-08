
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import MentorCard from "@/components/MentorCard";
import { getMentors, type Mentor } from "@/data/mentorData";
import { useMentorSave } from "@/hooks/useMentorSave";

const SavedMentors = () => {
  const { user } = useAuth();
  const { savedMentors, isLoading: saveLoading } = useMentorSave();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedMentors = async () => {
      if (!user || savedMentors.length === 0) {
        setMentors([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // In a real implementation, this would fetch from Supabase
        // For now, we'll filter the local data
        const allMentors = getMentors();
        const filteredMentors = allMentors.filter(mentor => 
          savedMentors.includes(mentor.id)
        );
        
        setMentors(filteredMentors);
      } catch (error) {
        console.error("Error fetching saved mentors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!saveLoading) {
      fetchSavedMentors();
    }
  }, [user, savedMentors, saveLoading]);

  if (isLoading || saveLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (mentors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't saved any mentors yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
};

export default SavedMentors;
