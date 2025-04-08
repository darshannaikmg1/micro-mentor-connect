
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Video,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Find your perfect</span>{" "}
                <span className="block text-primary xl:inline">
                  micro-mentor
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Connect with expert mentors for short, focused sessions to solve
                specific challenges, learn new skills, or advance your career.
                Get personalized guidance in just 30 minutes.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/mentors">
                    <Button className="w-full flex items-center justify-center px-8 py-3">
                      Find a Mentor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/become-mentor">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-3"
                    >
                      Become a Mentor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="People collaborating"
        />
      </div>
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                Flexible Scheduling
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Video className="h-6 w-6" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                Live & Recorded Sessions
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                Verified Experts
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="mt-2 text-center text-sm font-medium text-gray-500">
                Personalized Guidance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
