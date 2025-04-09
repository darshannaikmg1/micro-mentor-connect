
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";
import { getMentors } from "@/data/mentorData";

const FeaturedMentors = () => {
  // Display only first 3 mentors for the featured section
  const featuredMentors = getMentors().slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Featured Mentors</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with industry experts for personalized guidance and learn from their experience.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredMentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-xs text-gray-500">{mentor.company}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {mentor.rating} ({mentor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-none">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                  {mentor.bio}
                </p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>${mentor.hourlyRate}/30 min</span>
                </div>
              </div>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <Link to={`/mentor/${mentor.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/mentors">
            <Button variant="outline" size="lg">
              View All Mentors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;
