
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BecomeMentorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Become a Mentor</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Share your expertise, help others grow, and earn income by becoming a mentor on our platform.
            </p>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Why become a mentor?</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                    <p className="text-gray-600">Share your knowledge and expertise with others</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                    <p className="text-gray-600">Earn income through sessions and premium content</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                    <p className="text-gray-600">Build your professional network and reputation</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div>
                    <p className="text-gray-600">Flexible scheduling - mentor on your own terms</p>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link to="/signup">
                    <Button size="lg">
                      Apply to be a Mentor
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Mentors collaborating" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Getting started as a mentor is simple and straightforward
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Apply</h3>
                <p className="text-gray-600">Complete your mentor application with your expertise, experience, and session preferences.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Get Verified</h3>
                <p className="text-gray-600">Our team reviews your application to ensure quality mentorship for our users.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Start Mentoring</h3>
                <p className="text-gray-600">Set your availability, accept session requests, and start making an impact.</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/signup">
                <Button size="lg">
                  Begin Your Mentor Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeMentorPage;
