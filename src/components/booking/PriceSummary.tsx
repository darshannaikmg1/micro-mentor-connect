
interface PriceSummaryProps {
  hourlyRate: number;
  duration: string;
}

const PriceSummary = ({ hourlyRate, duration }: PriceSummaryProps) => {
  const durationMinutes = parseInt(duration);
  const totalPrice = (hourlyRate * durationMinutes) / 60;

  return (
    <div className="rounded-md bg-gray-800 p-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Rate:</span>
        <span>${hourlyRate}/hour</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Duration:</span>
        <span>{durationMinutes} minutes</span>
      </div>
      <div className="flex justify-between font-medium mt-2 pt-2 border-t border-gray-700">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceSummary;
