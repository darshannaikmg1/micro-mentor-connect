
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SessionNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const SessionNotes = ({ notes, setNotes }: SessionNotesProps) => {
  return (
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
  );
};

export default SessionNotes;
