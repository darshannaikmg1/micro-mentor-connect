
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type SessionType = Database["public"]["Enums"]["session_type"];
type SessionStatus = Database["public"]["Enums"]["session_status"];

interface UseSessionBookingProps {
  mentorId: string;
  mentorName: string;
  hourlyRate: number;
}

export const useSessionBooking = ({ mentorId, mentorName, hourlyRate }: UseSessionBookingProps) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("60");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to book a session",
      });
      navigate("/login?redirect=/mentor/" + mentorId);
      return;
    }
    setIsOpen(open);
  };

  const handleBookSession = async () => {
    if (!date || !time || !duration) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Extract hour and minute from time string
      const [hour, minute] = time.split(':').map(Number);
      
      // Create scheduled date by combining selected date and time
      const scheduledAt = new Date(date);
      scheduledAt.setHours(hour, minute);
      
      // Create a new session in the database
      const sessionData = {
        mentor_id: mentorId,
        mentee_id: user?.id,
        scheduled_at: scheduledAt.toISOString(),
        duration: parseInt(duration),
        price: (hourlyRate * parseInt(duration)) / 60,
        notes: notes,
        status: 'pending' as SessionStatus,
        session_type: 'video' as SessionType
      };
      
      const { data, error } = await supabase
        .from('sessions')
        .insert(sessionData)
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Session request sent",
        description: `Your session request with ${mentorName} has been sent. You will be notified when they accept.`,
      });
      
      setIsOpen(false);
      
      // Reset form
      setDate(undefined);
      setTime("");
      setDuration("60");
      setNotes("");
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error('Error booking session:', error);
      
      toast({
        title: "Booking failed",
        description: error.message || "Failed to book session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    date,
    setDate,
    time,
    setTime,
    duration,
    setDuration,
    notes,
    setNotes,
    isSubmitting,
    handleOpenChange,
    handleBookSession
  };
};
