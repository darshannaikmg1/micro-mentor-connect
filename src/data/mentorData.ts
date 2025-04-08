
export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  avatar: string;
  availability: string[];
  sessionTypes: {
    live: boolean;
    recorded: boolean;
    offline: boolean;
  };
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    company: "Google",
    bio: "I help developers improve their coding skills and prepare for technical interviews. With 8 years at Google, I've interviewed hundreds of candidates and can help you level up your skills.",
    expertise: ["React", "JavaScript", "System Design", "Interview Prep"],
    rating: 4.9,
    reviews: 124,
    hourlyRate: 75,
    avatar: "https://i.pravatar.cc/300?img=1",
    availability: ["Mon", "Wed", "Fri"],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
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
    hourlyRate: 85,
    avatar: "https://i.pravatar.cc/300?img=5",
    availability: ["Tue", "Thu", "Sat"],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: true,
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
    hourlyRate: 65,
    avatar: "https://i.pravatar.cc/300?img=3",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    sessionTypes: {
      live: true,
      recorded: false,
      offline: false,
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
    hourlyRate: 90,
    avatar: "https://i.pravatar.cc/300?img=10",
    availability: ["Wed", "Thu", "Fri", "Sat"],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
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
    hourlyRate: 80,
    avatar: "https://i.pravatar.cc/300?img=7",
    availability: ["Mon", "Wed", "Fri", "Sun"],
    sessionTypes: {
      live: true,
      recorded: true,
      offline: false,
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
    hourlyRate: 120,
    avatar: "https://i.pravatar.cc/300?img=9",
    availability: ["Tue", "Thu"],
    sessionTypes: {
      live: true,
      recorded: false,
      offline: true,
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
