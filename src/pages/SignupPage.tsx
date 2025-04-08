
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <SignupForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
