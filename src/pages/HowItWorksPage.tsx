
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">How MicroMentor Works</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how our platform connects mentors and mentees for short, focused mentorship sessions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/mentors">
                <Button size="lg">
                  Find a Mentor
                </Button>
              </Link>
              <Link to="/become-mentor">
                <Button variant="outline" size="lg">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <HowItWorks />
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our mentorship platform.
              </p>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">How long are mentorship sessions?</h3>
                  <p className="mt-2 text-gray-600">
                    Our standard mentorship sessions are 30 minutes long, providing focused guidance without overwhelming time commitments.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">What's the difference between session types?</h3>
                  <p className="mt-2 text-gray-600">
                    Live sessions happen in real-time via video call. Recorded sessions allow you to submit a question and receive a video response from the mentor. In-person sessions take place at an agreed location.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">How are mentors vetted?</h3>
                  <p className="mt-2 text-gray-600">
                    All mentors go through a thorough application process. We verify their professional experience, expertise, and ensure they're committed to providing quality guidance.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">What if I'm not satisfied with a session?</h3>
                  <p className="mt-2 text-gray-600">
                    We have a satisfaction guarantee. If you're not satisfied with your session, contact our support team within 48 hours, and we'll offer you a credit for another session.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">Can I become a mentor?</h3>
                  <p className="mt-2 text-gray-600">
                    Yes! If you have expertise in a specific area and want to help others, you can apply to become a mentor. Visit our "Become a Mentor" page to get started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
