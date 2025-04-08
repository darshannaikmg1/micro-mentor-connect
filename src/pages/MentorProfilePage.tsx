
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorProfile from "@/components/MentorProfile";

const MentorProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <MentorProfile />
      </main>
      <Footer />
    </div>
  );
};

export default MentorProfilePage;
