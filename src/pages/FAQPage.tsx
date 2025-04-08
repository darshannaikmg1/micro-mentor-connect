
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is MicroMentor?",
      answer: "MicroMentor is a platform that connects mentees with experienced mentors for short, focused mentorship sessions. Our goal is to make professional guidance accessible and affordable for everyone, while allowing mentors to share their expertise and earn income."
    },
    {
      question: "How do I find a mentor?",
      answer: "You can browse our directory of mentors, filtering by expertise, industry, price range, and availability. Once you find a mentor you're interested in, you can view their profile, read reviews, and book a session directly through the platform."
    },
    {
      question: "How much does it cost?",
      answer: "The cost varies depending on the mentor you choose. Each mentor sets their own rates, typically ranging from $30 to $150 per 30-minute session. We also offer subscription plans that provide discounts on session bookings and access to premium content."
    },
    {
      question: "What happens during a mentorship session?",
      answer: "Sessions typically take place via video call. You'll have the opportunity to discuss your specific questions, challenges, or goals with your mentor. Some mentors also offer text-based mentoring or recorded video responses. The format and structure will depend on what you arrange with your mentor."
    },
    {
      question: "How do I become a mentor?",
      answer: "If you have expertise to share, you can apply to become a mentor on our platform. Click on the 'Become a Mentor' button, fill out the application form, and our team will review your credentials. Once approved, you can set up your profile, define your expertise areas, set your availability, and start accepting mentorship requests."
    },
    {
      question: "What types of expertise can I find on MicroMentor?",
      answer: "Our platform hosts mentors with a wide range of expertise, including career development, leadership skills, technical knowledge, entrepreneurship, creative fields, and much more. You can use our search filters to find mentors with the specific expertise you're looking for."
    },
    {
      question: "How do payments work?",
      answer: "Payments are handled securely through our platform. Mentees pay when booking a session, and mentors receive payment after the session is completed. We hold the payment in escrow until the session is successfully delivered to ensure both parties are protected."
    },
    {
      question: "Can I cancel a booked session?",
      answer: "Yes, you can cancel a session according to the cancellation policy specified by the mentor. Typically, cancellations made at least 24 hours before the scheduled session time will receive a full refund. Late cancellations may be subject to a cancellation fee."
    },
    {
      question: "How do I prepare for a mentorship session?",
      answer: "To make the most of your session, we recommend preparing specific questions or topics you'd like to discuss. Think about your goals for the session and what you hope to achieve. Some mentors may provide pre-session questionnaires or materials to help you prepare."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Yes, we take privacy and confidentiality seriously. Your personal information is protected according to our privacy policy. The content of your mentorship sessions remains confidential between you and your mentor, unless otherwise specified."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about our mentorship platform
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-md px-4">
                  <AccordionTrigger className="text-left font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button>Get in Touch</Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline">Learn How It Works</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
