
import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface FilterValues {
  searchQuery: string;
  expertise: string[];
  sessionTypes: {
    oneOnOne: boolean;
    groupSession: boolean;
  };
  priceRange: [number, number];
}

interface MentorFilterProps {
  onFilter: (filters: FilterValues) => void;
}

const expertiseOptions = [
  "Career Development",
  "Leadership",
  "Software Development",
  "Data Science",
  "Marketing",
  "Product Management",
  "UX/UI Design",
  "Entrepreneurship",
  "Finance",
  "Machine Learning",
];

const MentorFilter = ({ onFilter }: MentorFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [sessionTypes, setSessionTypes] = useState({
    oneOnOne: false,
    groupSession: false,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);

  // Apply filters whenever they change
  useEffect(() => {
    const filters = {
      searchQuery,
      expertise,
      sessionTypes,
      priceRange,
    };
    
    onFilter(filters);
  }, [searchQuery, expertise, sessionTypes, priceRange, onFilter]);

  const toggleExpertise = (value: string) => {
    setExpertise((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSessionTypeChange = (type: keyof typeof sessionTypes) => {
    setSessionTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setExpertise([]);
    setSessionTypes({
      oneOnOne: false,
      groupSession: false,
    });
    setPriceRange([0, 300]);
  };
  
  const hasActiveFilters = expertise.length > 0 || sessionTypes.oneOnOne || sessionTypes.groupSession || priceRange[0] > 0 || priceRange[1] < 300;

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search mentors by name, expertise, or company..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant={isOpen ? "default" : "outline"}
          onClick={() => setIsOpen(!isOpen)}
          className="md:w-auto w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {expertise.length +
                (sessionTypes.oneOnOne ? 1 : 0) +
                (sessionTypes.groupSession ? 1 : 0) +
                (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {isOpen && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Expertise</h3>
                <div className="space-y-2">
                  {expertiseOptions.map((option) => (
                    <div key={option} className="flex items-center">
                      <Checkbox
                        id={`expertise-${option}`}
                        checked={expertise.includes(option)}
                        onCheckedChange={() => toggleExpertise(option)}
                      />
                      <Label
                        htmlFor={`expertise-${option}`}
                        className="ml-2 text-sm font-normal cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Session Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="session-one-on-one"
                      checked={sessionTypes.oneOnOne}
                      onCheckedChange={() => handleSessionTypeChange("oneOnOne")}
                    />
                    <Label
                      htmlFor="session-one-on-one"
                      className="ml-2 text-sm font-normal cursor-pointer"
                    >
                      1:1 Mentoring
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="session-group"
                      checked={sessionTypes.groupSession}
                      onCheckedChange={() => handleSessionTypeChange("groupSession")}
                    />
                    <Label
                      htmlFor="session-group"
                      className="ml-2 text-sm font-normal cursor-pointer"
                    >
                      Group Sessions
                    </Label>
                  </div>
                </div>

                <h3 className="font-medium mb-3 mt-6">Price Range</h3>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={300}
                    step={10}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Active Filters</h3>
                {!hasActiveFilters ? (
                  <p className="text-sm text-gray-500">No active filters</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {expertise.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            onClick={() => toggleExpertise(skill)}
                            className="ml-1 hover:text-destructive"
                            aria-label={`Remove ${skill} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {sessionTypes.oneOnOne && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          1:1 Mentoring
                          <button
                            onClick={() => handleSessionTypeChange("oneOnOne")}
                            className="ml-1 hover:text-destructive"
                            aria-label="Remove 1:1 Mentoring filter"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {sessionTypes.groupSession && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          Group Sessions
                          <button
                            onClick={() => handleSessionTypeChange("groupSession")}
                            className="ml-1 hover:text-destructive"
                            aria-label="Remove Group Sessions filter"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {(priceRange[0] > 0 || priceRange[1] < 300) && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          ${priceRange[0]} - ${priceRange[1]}
                          <button
                            onClick={() => setPriceRange([0, 300])}
                            className="ml-1 hover:text-destructive"
                            aria-label="Remove price range filter"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasActiveFilters && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Filters applied:</span>{" "}
            {expertise.length +
              (sessionTypes.oneOnOne ? 1 : 0) +
              (sessionTypes.groupSession ? 1 : 0) +
              (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0)}{" "}
            {expertise.length +
              (sessionTypes.oneOnOne ? 1 : 0) +
              (sessionTypes.groupSession ? 1 : 0) +
              (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0) === 1
              ? "filter"
              : "filters"}
          </p>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default MentorFilter;
