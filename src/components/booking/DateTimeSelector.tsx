
import { useState } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
}

// Generate time slots from 9AM to 5PM
const generateTimeSlots = () => {
  const timeSlots = [];
  for (let i = 9; i <= 17; i++) {
    timeSlots.push(`${i}:00`);
    if (i < 17) timeSlots.push(`${i}:30`);
  }
  return timeSlots;
};

const DateTimeSelector = ({
  date,
  setDate,
  time,
  setTime,
  duration,
  setDuration,
}: DateTimeSelectorProps) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date" className="text-white">Select Date</Label>
        <div className="border rounded-md p-2 border-gray-700 bg-gray-800">
          <Calendar
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
    </div>
  );
};

export default DateTimeSelector;
