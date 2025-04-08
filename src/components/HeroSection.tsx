
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Video,
  Users,
  MessageSquare,
  Star,
  Shield,
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-hero-pattern">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                Find Your Perfect Mentor Today
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                <span className="block">Elevate Your Career With </span>
                <span className="text-gradient font-extrabold">Expert Micro-Mentorship</span>
              </h1>
              <p className="mt-3 text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with industry experts for focused, impactful sessions designed to solve your 
                specific challenges, accelerate learning, and transform your career trajectory.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/mentors">
                  <Button className="w-full sm:w-auto px-8 py-6 text-lg font-medium shadow-button bg-primary hover:bg-primary/90 transition-all">
                    Find a Mentor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/become-mentor">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 text-lg font-medium border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    Become a Mentor
                  </Button>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${index + 20}.jpg`} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">From over 2,500+ satisfied mentees</p>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
              
              <div className="relative">
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    className="w-full object-cover"
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="People collaborating"
                  />
                </div>
                
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Next Session</p>
                      <p className="text-sm text-gray-600">Today, 3:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Verified Experts</p>
                      <p className="text-sm text-gray-600">100% Guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose MicroMentor?</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center hover-lift">
              <div className="feature-icon mb-6">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-center text-sm text-gray-600">
                Book sessions that fit your busy schedule
              </p>
            </div>
            <div className="flex flex-col items-center hover-lift">
              <div className="feature-icon mb-6">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">High-Quality Sessions</h3>
              <p className="text-center text-sm text-gray-600">
                Live & recorded sessions with playback
              </p>
            </div>
            <div className="flex flex-col items-center hover-lift">
              <div className="feature-icon mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Verified Experts</h3>
              <p className="text-center text-sm text-gray-600">
                All mentors vetted for expertise & quality
              </p>
            </div>
            <div className="flex flex-col items-center hover-lift">
              <div className="feature-icon mb-6">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">Personalized Growth</h3>
              <p className="text-center text-sm text-gray-600">
                Customized guidance for your needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
