
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Get the Most Out of Your Mentorship Experience",
      excerpt: "Effective mentorship can be transformative, but it requires effort from both parties. Learn how to maximize your mentorship journey with these proven strategies.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 5, 2025",
      author: "Jane Smith",
      category: "Mentorship",
    },
    {
      id: 2,
      title: "The Evolution of Online Mentoring in the Digital Age",
      excerpt: "As technology advances, so does the way we approach mentorship. Explore how online mentoring has evolved and what it means for personal and professional development.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "April 2, 2025",
      author: "Michael Johnson",
      category: "Technology",
    },
    {
      id: 3,
      title: "5 Key Qualities to Look for in a Great Mentor",
      excerpt: "Finding the right mentor can be challenging. Discover the essential qualities that make a mentor truly valuable for your personal and professional growth.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      date: "March 28, 2025",
      author: "Sarah Williams",
      category: "Career Development",
    },
    {
      id: 4,
      title: "Mentorship Success Stories: From Novice to Expert",
      excerpt: "Read inspiring stories of individuals who transformed their careers through effective mentorship relationships and learn from their experiences.",
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
      date: "March 20, 2025",
      author: "David Brown",
      category: "Success Stories",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and stories to help you make the most of your mentorship journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge variant="secondary" className="mr-2">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Button variant="ghost" size="sm">Read More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
