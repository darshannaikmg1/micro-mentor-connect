
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-primary font-bold text-xl">MicroMentor</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Connect with expert mentors for short, focused mentorship sessions. 
              Grow your skills, advance your career, or solve specific challenges.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/mentors" className="text-base text-gray-600 hover:text-primary">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link to="/become-mentor" className="text-base text-gray-600 hover:text-primary">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-600 hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} MicroMentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
