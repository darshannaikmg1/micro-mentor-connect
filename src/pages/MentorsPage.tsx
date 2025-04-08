
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorFilter from "@/components/MentorFilter";
import MentorCard from "@/components/MentorCard";
import { getMentors, Mentor } from "@/data/mentorData";

const MentorsPage = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const data = getMentors();
        setMentors(data);
        setFilteredMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleFilter = (filters: any) => {
    let result = [...mentors];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(query) ||
          mentor.title.toLowerCase().includes(query) ||
          mentor.company.toLowerCase().includes(query) ||
          mentor.expertise.some((skill: string) => skill.toLowerCase().includes(query))
      );
    }

    // Filter by expertise
    if (filters.expertise && filters.expertise.length > 0) {
      result = result.filter((mentor) =>
        filters.expertise.some((skill: string) => mentor.expertise.includes(skill))
      );
    }

    // Filter by session types
    const activeSessionTypes = Object.entries(filters.sessionTypes)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (activeSessionTypes.length > 0) {
      result = result.filter((mentor) =>
        activeSessionTypes.some((type) => mentor.sessionTypes[type as keyof typeof mentor.sessionTypes])
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      result = result.filter(
        (mentor) =>
          mentor.hourlyRate >= filters.priceRange[0] &&
          mentor.hourlyRate <= filters.priceRange[1]
      );
    }

    setFilteredMentors(result);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
            <p className="mt-2 text-lg text-gray-600">
              Connect with expert mentors for personalized guidance
            </p>
          </div>

          <MentorFilter onFilter={handleFilter} />

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find mentors that match your needs.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorsPage;
