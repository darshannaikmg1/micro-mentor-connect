
import HeroSection from "@/components/HeroSection";
import FeaturedMentors from "@/components/FeaturedMentors";
import HowItWorks from "@/components/HowItWorks";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <FeaturedMentors />
        <SubscriptionPlans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
