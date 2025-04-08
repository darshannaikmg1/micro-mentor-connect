
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Mentor } from '@/data/mentorData';

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
        const { data, error } = await supabase
          .from('saved_mentors')
          .select('mentor_id')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setSavedMentors(data.map(item => item.mentor_id));
      } catch (error) {
        console.error('Error fetching saved mentors:', error);
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
      const { error } = await supabase
        .from('saved_mentors')
        .insert({
          user_id: user.id,
          mentor_id: mentor.id,
          saved_at: new Date().toISOString()
        });

      if (error) {
        throw error;
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
      const { error } = await supabase
        .from('saved_mentors')
        .delete()
        .eq('user_id', user.id)
        .eq('mentor_id', mentorId);

      if (error) {
        throw error;
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
