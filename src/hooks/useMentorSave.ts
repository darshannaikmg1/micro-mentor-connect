
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UseMentorSaveResult {
  savedMentors: string[];
  isSaved: (mentorId: string) => boolean;
  toggleSave: (mentorId: string) => Promise<void>;
  saveMentor: (mentorId: string) => Promise<void>;
  unsaveMentor: (mentorId: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export const useMentorSave = (): UseMentorSaveResult => {
  const { user, isAuthenticated } = useAuth();
  const [savedMentors, setSavedMentors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSavedMentors = async () => {
    if (!isAuthenticated || !user) {
      setSavedMentors([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Use the RPC function to get saved mentors
      const { data, error } = await supabase.rpc('get_saved_mentors', {
        user_id_param: user.id
      });

      if (error) {
        throw error;
      }

      // Extract mentor_ids from the results
      const mentorIds = data.map((item: { mentor_id: string }) => item.mentor_id);
      setSavedMentors(mentorIds);
    } catch (err: any) {
      console.error('Error fetching saved mentors:', err);
      setError(new Error(err.message || 'Failed to fetch saved mentors'));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch saved mentors when user or authentication state changes
  useEffect(() => {
    fetchSavedMentors();
  }, [user, isAuthenticated]);

  // Check if a mentor is saved
  const isSaved = (mentorId: string): boolean => {
    return savedMentors.includes(mentorId);
  };

  // Save a mentor
  const saveMentor = async (mentorId: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      throw new Error('You must be logged in to save mentors');
    }

    try {
      // Use the RPC function to save a mentor
      const { error } = await supabase.rpc('save_mentor', {
        user_id_param: user.id,
        mentor_id_param: mentorId
      });

      if (error) {
        throw error;
      }

      // Update local state
      setSavedMentors(prev => [...prev, mentorId]);
    } catch (err: any) {
      console.error('Error saving mentor:', err);
      throw new Error(err.message || 'Failed to save mentor');
    }
  };

  // Unsave a mentor
  const unsaveMentor = async (mentorId: string): Promise<void> => {
    if (!isAuthenticated || !user) {
      throw new Error('You must be logged in to unsave mentors');
    }

    try {
      // Use the RPC function to unsave a mentor
      const { error } = await supabase.rpc('unsave_mentor', {
        user_id_param: user.id,
        mentor_id_param: mentorId
      });

      if (error) {
        throw error;
      }

      // Update local state
      setSavedMentors(prev => prev.filter(id => id !== mentorId));
    } catch (err: any) {
      console.error('Error unsaving mentor:', err);
      throw new Error(err.message || 'Failed to unsave mentor');
    }
  };

  // Toggle save/unsave
  const toggleSave = async (mentorId: string): Promise<void> => {
    if (isSaved(mentorId)) {
      await unsaveMentor(mentorId);
    } else {
      await saveMentor(mentorId);
    }
  };

  return {
    savedMentors,
    isSaved,
    toggleSave,
    saveMentor,
    unsaveMentor,
    isLoading,
    error,
  };
};
