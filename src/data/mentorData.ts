export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviews: number;
  reviewCount: number;
  hourlyRate: number;
  avatar: string;
  availability: string[];
  location?: string;
  languages?: string[];
  workExperience?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  reviews?: Array<{
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
  }>;
  sessionTypes: {
    live: boolean;
    recorded: boolean;
    offline: boolean;
    oneOnOne: boolean;
    groupSession: boolean;
  };
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    bio: "I help developers improve their coding skills and prepare for technical interviews. With 8 years at Google, I've interviewed hundreds of candidates and can help you level up your skills.",
    expertise: ["React", "JavaScript", "System Design", "Interview Prep"],
    rating: 4.9,
    reviews: 124,
    reviewCount: 124,
    hourlyRate: 75,
    avatar: "https://i.pravatar.cc/300?img=1",
    availability: ["Mon", "Wed", "Fri"],
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    workExperience: [
      {
        title: "Senior Software Engineer",
        company: "Google",
        startDate: "2018",
        description: "Lead developer on Google Cloud Platform projects."
      },
      {
        title: "Software Engineer",
        company: "Microsoft",
        startDate: "2015",
        endDate: "2018",
        description: "Worked on Azure cloud services and developer tools."
      }
    ],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University",
        year: "2015"
      },
      {
        degree: "B.S. Computer Science",
        institution: "UC Berkeley",
        year: "2013"
      }
    ],
    reviews: [
      {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300?img=70",
        date: "March 15, 2023",
        rating: 5,
        comment: "Alex was extremely helpful in preparing me for my technical interview. His guidance on system design questions was invaluable."
      },
      {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/300?img=47",
        date: "February 3, 2023",
        rating: 4.8,
        comment: "Great mentor! Very knowledgeable about React and provided practical advice that I could immediately apply to my projects."
      }
    ],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
      oneOnOne: true,
      groupSession: false
    },
  },
  {
    id: "2",
    name: "Sarah Williams",
    title: "Product Manager",
    company: "Amazon",
    bio: "Passionate about helping aspiring product managers break into the field. I specialize in product strategy, user research, and roadmap planning.",
    expertise: ["Product Strategy", "User Research", "Roadmapping", "PM Interviews"],
    rating: 4.8,
    reviews: 98,
    reviewCount: 98,
    hourlyRate: 85,
    avatar: "https://i.pravatar.cc/300?img=5",
    availability: ["Tue", "Thu", "Sat"],
    location: "Seattle, WA",
    languages: ["English", "French"],
    workExperience: [
      {
        title: "Senior Product Manager",
        company: "Amazon",
        startDate: "2019",
        description: "Leading product development for Amazon Marketplace."
      },
      {
        title: "Product Manager",
        company: "Shopify",
        startDate: "2016",
        endDate: "2019",
        description: "Developed e-commerce solutions for small businesses."
      }
    ],
    education: [
      {
        degree: "MBA",
        institution: "Harvard Business School",
        year: "2016"
      },
      {
        degree: "B.A. Economics",
        institution: "Yale University",
        year: "2014"
      }
    ],
    reviews: [
      {
        name: "Michael Lee",
        avatar: "https://i.pravatar.cc/300?img=60",
        date: "April 10, 2023",
        rating: 5,
        comment: "Sarah's mentorship was exactly what I needed to transition into a PM role. Her feedback on my resume and interview prep was exceptional."
      }
    ],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: true,
      oneOnOne: true,
      groupSession: true
    },
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "UX/UI Designer",
    company: "Airbnb",
    bio: "I help designers and design enthusiasts improve their portfolio and design thinking skills. Learn how to create beautiful, user-centric designs.",
    expertise: ["UI Design", "UX Research", "Design Systems", "Figma"],
    rating: 4.7,
    reviews: 87,
    reviewCount: 87,
    hourlyRate: 65,
    avatar: "https://i.pravatar.cc/300?img=3",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    location: "Los Angeles, CA",
    languages: ["English", "Mandarin"],
    workExperience: [
      {
        title: "Senior UX Designer",
        company: "Airbnb",
        startDate: "2017",
        description: "Design lead for Airbnb Experiences platform."
      }
    ],
    education: [
      {
        degree: "BFA Design",
        institution: "Rhode Island School of Design",
        year: "2017"
      }
    ],
    reviews: [
      {
        name: "Emily Zhang",
        avatar: "https://i.pravatar.cc/300?img=45",
        date: "January 20, 2023",
        rating: 4.5,
        comment: "Michael provided excellent feedback on my portfolio and helped me improve my design process."
      }
    ],
    sessionTypes: {
      live: true,
      recorded: false,
      offline: false,
      oneOnOne: true,
      groupSession: false
    },
  },
  {
    id: "4",
    name: "Jessica Rodriguez",
    title: "Marketing Director",
    company: "Spotify",
    bio: "Specialized in digital marketing strategies, brand development, and marketing analytics. I can help you grow your audience and improve conversion rates.",
    expertise: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    rating: 4.9,
    reviews: 112,
    reviewCount: 112,
    hourlyRate: 90,
    avatar: "https://i.pravatar.cc/300?img=10",
    availability: ["Wed", "Thu", "Fri", "Sat"],
    location: "New York, NY",
    languages: ["English", "Spanish"],
    workExperience: [
      {
        title: "Marketing Director",
        company: "Spotify",
        startDate: "2018",
        description: "Leading marketing strategies for Spotify's premium subscriptions."
      }
    ],
    education: [
      {
        degree: "M.S. Marketing",
        institution: "Northwestern University",
        year: "2018"
      }
    ],
    reviews: [
      {
        name: "David Thompson",
        avatar: "https://i.pravatar.cc/300?img=53",
        date: "March 5, 2023",
        rating: 5,
        comment: "Jessica's insights into digital marketing trends helped me revamp my entire marketing strategy. Highly recommended!"
      }
    ],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
      oneOnOne: true,
      groupSession: true
    },
  },
  {
    id: "5",
    name: "David Kim",
    title: "Data Scientist",
    company: "Netflix",
    bio: "I help professionals break into data science and AI. Learn practical machine learning, data visualization, and how to transition into a data role.",
    expertise: ["Machine Learning", "Python", "SQL", "Data Visualization"],
    rating: 4.6,
    reviews: 75,
    reviewCount: 75,
    hourlyRate: 80,
    avatar: "https://i.pravatar.cc/300?img=7",
    availability: ["Mon", "Wed", "Fri", "Sun"],
    location: "Austin, TX",
    languages: ["English", "Korean"],
    workExperience: [
      {
        title: "Senior Data Scientist",
        company: "Netflix",
        startDate: "2019",
        description: "Building recommendation systems and predictive models."
      }
    ],
    education: [
      {
        degree: "Ph.D. Statistics",
        institution: "MIT",
        year: "2019"
      }
    ],
    reviews: [
      {
        name: "Alex Turner",
        avatar: "https://i.pravatar.cc/300?img=22",
        date: "February 15, 2023",
        rating: 4.7,
        comment: "David's mentorship helped me understand complex ML concepts and apply them to real-world problems."
      }
    ],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
      oneOnOne: true,
      groupSession: true
    },
  },
  {
    id: "6",
    name: "Emily Taylor",
    title: "Startup Advisor",
    company: "Y Combinator Alum",
    bio: "Former founder with YC experience. I help early-stage startups with product-market fit, fundraising, and growth strategy.",
    expertise: ["Fundraising", "Pitch Decks", "Business Models", "Growth"],
    rating: 4.9,
    reviews: 67,
    reviewCount: 67,
    hourlyRate: 120,
    avatar: "https://i.pravatar.cc/300?img=9",
    availability: ["Tue", "Thu"],
    location: "San Francisco, CA",
    languages: ["English"],
    workExperience: [
      {
        title: "Founder & CEO",
        company: "TechStart (YC W18)",
        startDate: "2017",
        endDate: "2021",
        description: "Founded and led a B2B SaaS company through Y Combinator."
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        year: "2016"
      }
    ],
    reviews: [
      {
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/300?img=15",
        date: "April 2, 2023",
        rating: 5,
        comment: "Emily's advice on our pitch deck and fundraising strategy was invaluable. We secured our seed round after implementing her suggestions."
      }
    ],
    sessionTypes: {
      live: true,
      recorded: false,
      offline: true,
      oneOnOne: true,
      groupSession: false
    },
  },
];

export const getMentors = () => {
  return mentors;
};

export const getMentorById = (id: string) => {
  return mentors.find((mentor) => mentor.id === id);
};

export const getMentorsByExpertise = (expertise: string) => {
  return mentors.filter((mentor) => mentor.expertise.includes(expertise));
};
