import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Database } from "@/integrations/supabase/types";

type SessionType = Database["public"]["Enums"]["session_type"];
type SessionStatus = Database["public"]["Enums"]["session_status"];

interface BookSessionModalProps {
  mentorId: string;
  mentorName: string;
  hourlyRate: number;
}

const BookSessionModal = ({ mentorId, mentorName, hourlyRate }: BookSessionModalProps) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("60");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate time slots from 9AM to 5PM
  const timeSlots = [];
  for (let i = 9; i <= 17; i++) {
    timeSlots.push(`${i}:00`);
    if (i < 17) timeSlots.push(`${i}:30`);
  }

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Book a Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Book a Session with {mentorName}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Schedule a mentoring session at your preferred time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-white">Select Date</Label>
            <div className="border rounded-md p-2 border-gray-700 bg-gray-800">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="mx-auto bg-gray-800 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white">Select Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot} className="text-white focus:bg-gray-700 focus:text-white">
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-white">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration" className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="30" className="text-white focus:bg-gray-700 focus:text-white">30 minutes</SelectItem>
                  <SelectItem value="60" className="text-white focus:bg-gray-700 focus:text-white">60 minutes</SelectItem>
                  <SelectItem value="90" className="text-white focus:bg-gray-700 focus:text-white">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">Session Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What would you like to discuss in this session?"
              className="h-24 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="rounded-md bg-gray-800 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rate:</span>
              <span>${hourlyRate}/hour</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Duration:</span>
              <span>{parseInt(duration)} minutes</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-700">
              <span>Total:</span>
              <span>${((hourlyRate * parseInt(duration)) / 60).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBookSession}
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isSubmitting ? "Booking..." : "Book Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookSessionModal;
