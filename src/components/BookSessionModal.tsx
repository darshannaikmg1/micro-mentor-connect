
import { Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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

// Import our new components
import DateTimeSelector from "./booking/DateTimeSelector";
import SessionNotes from "./booking/SessionNotes";
import PriceSummary from "./booking/PriceSummary";
import { useSessionBooking } from "./booking/useSessionBooking";

interface BookSessionModalProps {
  mentorId: string;
  mentorName: string;
  hourlyRate: number;
}

const BookSessionModal = ({ mentorId, mentorName, hourlyRate }: BookSessionModalProps) => {
  const { isAuthenticated } = useAuth();
  
  const {
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
  } = useSessionBooking({ mentorId, mentorName, hourlyRate });

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
          <DateTimeSelector 
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            duration={duration}
            setDuration={setDuration}
          />
          
          <SessionNotes 
            notes={notes}
            setNotes={setNotes}
          />
          
          <PriceSummary 
            hourlyRate={hourlyRate}
            duration={duration}
          />
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
