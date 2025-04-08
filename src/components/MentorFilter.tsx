
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface MentorFilterProps {
  onFilter: (filters: any) => void;
}

const expertiseOptions = [
  "JavaScript",
  "React",
  "Python",
  "Data Science",
  "UI/UX Design",
  "Product Management",
  "Digital Marketing",
  "Machine Learning",
  "Career Advice",
  "Leadership",
  "Interview Prep",
  "Business Strategy",
];

const MentorFilter = ({ onFilter }: MentorFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [sessionTypes, setSessionTypes] = useState({
    live: false,
    recorded: false,
    offline: false,
  });
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsFilterOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    applyFilters();
  }, [searchQuery, selectedExpertise, sessionTypes, priceRange]);

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise)
        ? prev.filter((e) => e !== expertise)
        : [...prev, expertise]
    );
  };

  const handleSessionTypeChange = (type: "live" | "recorded" | "offline") => {
    setSessionTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedExpertise([]);
    setSessionTypes({ live: false, recorded: false, offline: false });
    setPriceRange([0, 150]);
  };

  const applyFilters = () => {
    const filters = {
      searchQuery,
      expertise: selectedExpertise,
      sessionTypes,
      priceRange,
    };
    onFilter(filters);
  };

  const removeExpertiseTag = (expertise: string) => {
    setSelectedExpertise((prev) => prev.filter((e) => e !== expertise));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name, expertise, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="md:hidden">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="w-full flex justify-center items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter tags */}
      {selectedExpertise.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedExpertise.map((expertise) => (
            <Badge key={expertise} variant="secondary" className="bg-primary/10 text-primary">
              {expertise}
              <button
                onClick={() => removeExpertiseTag(expertise)}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedExpertise.length > 0 && (
            <Button
              variant="ghost"
              className="h-6 px-2 text-xs"
              onClick={() => setSelectedExpertise([])}
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Filter options */}
      <div className={`mt-4 ${isFilterOpen ? "block" : "hidden"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Expertise */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Expertise</h3>
            <div className="grid grid-cols-2 gap-2">
              {expertiseOptions.map((expertise) => (
                <div key={expertise} className="flex items-center space-x-2">
                  <Checkbox
                    id={`expertise-${expertise}`}
                    checked={selectedExpertise.includes(expertise)}
                    onCheckedChange={() => handleExpertiseChange(expertise)}
                  />
                  <label
                    htmlFor={`expertise-${expertise}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {expertise}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Session Type */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Session Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="session-live"
                  checked={sessionTypes.live}
                  onCheckedChange={() => handleSessionTypeChange("live")}
                />
                <label
                  htmlFor="session-live"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Live Video Session
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="session-recorded"
                  checked={sessionTypes.recorded}
                  onCheckedChange={() => handleSessionTypeChange("recorded")}
                />
                <label
                  htmlFor="session-recorded"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Recorded Response
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="session-offline"
                  checked={sessionTypes.offline}
                  onCheckedChange={() => handleSessionTypeChange("offline")}
                />
                <label
                  htmlFor="session-offline"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In-Person Meeting
                </label>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Price Range (per 30 min)</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 150]}
                max={150}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};

export default MentorFilter;
