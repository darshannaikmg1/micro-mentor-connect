
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPage = () => {
  const features = [
    {
      title: "Mentorship Sessions",
      description: "Access to focused 30-minute sessions with expert mentors",
    },
    {
      title: "Video Library",
      description: "Browse and watch recorded mentorship content on various topics",
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions at times that work for your schedule",
    },
    {
      title: "Session Types",
      description: "Choose between live, recorded, or in-person sessions",
    },
    {
      title: "Resources & Materials",
      description: "Access to downloadable resources shared by mentors",
    },
    {
      title: "Community Access",
      description: "Join discussions with other mentees and mentors",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible subscription options to fit your mentorship needs
            </p>
          </div>
        </div>
        
        <SubscriptionPlans />
        
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Everything you need for growth</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides all the tools and resources for effective mentorship
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Check className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-gray-50 rounded-xl p-8 lg:p-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Enterprise solutions</h3>
                  <p className="mt-4 text-lg text-gray-600">
                    Looking to provide mentorship opportunities for your entire organization?
                    We offer custom enterprise plans tailored to your company's needs.
                  </p>
                  <div className="mt-6">
                    <Button size="lg">Contact Sales</Button>
                  </div>
                </div>
                <div className="mt-8 lg:mt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        Dedicated account manager
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        Custom mentorship matching based on your team's needs
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        Bulk session discounts
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        Progress tracking and reporting
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        Custom branding options
                      </p>
                    </li>
                  </ul>
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

export default PricingPage;
