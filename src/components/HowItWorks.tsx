
import { ArrowRight, Calendar, Video, MessageSquare, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How MicroMentor Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Get expert guidance through short, focused mentorship sessions in just a few simple steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-8 md:space-y-24 relative">
              {/* Step 1 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Find the Right Mentor</h3>
                  <p className="mt-2 text-gray-600">
                    Browse profiles of experts across various fields and industries. Filter by expertise, availability, or session type.
                  </p>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                    alt="Finding a mentor" 
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 order-last md:order-first">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                    alt="Booking a session" 
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Video className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Book Your Micro-Session</h3>
                  <p className="mt-2 text-gray-600">
                    Choose between live video calls, recorded responses, or offline meetings. Select a time that works for both of you.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Connect and Learn</h3>
                  <p className="mt-2 text-gray-600">
                    Meet with your mentor for a focused session. Ask questions, get feedback, and receive personalized guidance.
                  </p>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                    alt="Learning session" 
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 order-last md:order-first">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
                    alt="Continued growth" 
                    className="rounded-lg shadow-md w-full h-64 object-cover"
                  />
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Apply and Grow</h3>
                  <p className="mt-2 text-gray-600">
                    Implement the advice, provide feedback, and book follow-up sessions as needed for continued growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
