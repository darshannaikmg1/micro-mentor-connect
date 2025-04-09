
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Mentor } from '@/data/mentorData';

interface SavedMentor {
  user_id: string;
  mentor_id: string;
  saved_at?: string;
}

export const useMentorSave = () => {
  const { user } = useAuth();
  const [savedMentors, setSavedMentors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedMentors = async () => {
      if (!user) {
        setSavedMentors([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Using a raw query since saved_mentors isn't in the generated types
        const { data, error } = await supabase
          .rpc('get_saved_mentors', { user_id_param: user.id })
          .select('mentor_id');

        if (error) {
          throw error;
        }

        // Handle the response
        if (data && Array.isArray(data)) {
          setSavedMentors(data.map(item => item.mentor_id));
        } else {
          setSavedMentors([]);
        }
      } catch (error) {
        console.error('Error fetching saved mentors:', error);
        // Using the fallback approach with a direct SQL query
        try {
          const { data, error: sqlError } = await supabase
            .from('saved_mentors')
            .select('mentor_id')
            .eq('user_id', user.id);
            
          if (sqlError) throw sqlError;
          
          setSavedMentors(data ? data.map(item => item.mentor_id) : []);
        } catch (sqlError) {
          console.error('Fallback error fetching saved mentors:', sqlError);
          setSavedMentors([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedMentors();
  }, [user]);

  const saveMentor = async (mentor: Mentor) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to save mentors",
        variant: "destructive",
      });
      return false;
    }

    try {
      setIsLoading(true);
      // Using a direct insert query for saved_mentors table
      const { error } = await supabase
        .rpc('save_mentor', { 
          user_id_param: user.id, 
          mentor_id_param: mentor.id,
          saved_at_param: new Date().toISOString()
        });

      if (error) {
        // Fallback to direct insert if RPC call fails
        const { error: insertError } = await supabase
          .from('saved_mentors')
          .insert({
            user_id: user.id,
            mentor_id: mentor.id,
            saved_at: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }

      setSavedMentors(prev => [...prev, mentor.id]);
      
      toast({
        title: "Mentor saved",
        description: `${mentor.name} has been added to your saved mentors.`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error saving mentor:', error);
      
      toast({
        title: "Failed to save mentor",
        description: error.message || "An error occurred while saving the mentor.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unsaveMentor = async (mentorId: string) => {
    if (!user) return false;

    try {
      setIsLoading(true);
      // Using a direct delete query for saved_mentors table
      const { error } = await supabase
        .rpc('unsave_mentor', { 
          user_id_param: user.id, 
          mentor_id_param: mentorId 
        });

      if (error) {
        // Fallback to direct delete if RPC call fails
        const { error: deleteError } = await supabase
          .from('saved_mentors')
          .delete()
          .eq('user_id', user.id)
          .eq('mentor_id', mentorId);
          
        if (deleteError) throw deleteError;
      }

      setSavedMentors(prev => prev.filter(id => id !== mentorId));
      
      toast({
        title: "Mentor removed",
        description: "The mentor has been removed from your saved list.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error removing saved mentor:', error);
      
      toast({
        title: "Failed to remove mentor",
        description: error.message || "An error occurred while removing the mentor.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isMentorSaved = (mentorId: string) => {
    return savedMentors.includes(mentorId);
  };

  return {
    savedMentors,
    saveMentor,
    unsaveMentor,
    isMentorSaved,
    isLoading
  };
};
