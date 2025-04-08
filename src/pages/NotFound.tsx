
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
          <span className="text-4xl font-bold text-gray-400">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link to="/" className="block">
            <Button variant="default" className="w-full">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
          <Link to="/mentors" className="block">
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" /> Browse Mentors
            </Button>
          </Link>
          <Link to="/how-it-works" className="block">
            <Button variant="ghost" className="w-full">
              <HelpCircle className="mr-2 h-4 w-4" /> How It Works
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
