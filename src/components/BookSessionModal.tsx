
import { useState } from "react";
import { Calendar } from "lucide-react";
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
      
      // In a real implementation, this would be a Supabase insert
      // For demonstration, we'll simulate success
      
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
        <Button>Book a Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Session with {mentorName}</DialogTitle>
          <DialogDescription>
            Schedule a mentoring session at your preferred time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <div className="border rounded-md p-2">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                className="mx-auto"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What would you like to discuss in this session?"
              className="h-24"
            />
          </div>
          
          <div className="rounded-md bg-slate-50 p-3">
            <div className="flex justify-between text-sm">
              <span>Rate:</span>
              <span>${hourlyRate}/hour</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Duration:</span>
              <span>{parseInt(duration)} minutes</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
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
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBookSession}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookSessionModal;
