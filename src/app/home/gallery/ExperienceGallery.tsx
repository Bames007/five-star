// components/Gallery/ExperienceGallery.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Share2,
  User,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Alex_Brush,
} from "next/font/google";
import { useRouter } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const alex_brush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
});

interface CustomerExperience {
  id: string;
  image: string;
  customerName: string;
  menuChoice: string;
  date: string;
  description: string;
  likes: number;
  isLiked: boolean;
  duration?: string;
  location?: string;
  rating?: number;
}

export default function ExperienceGallery() {
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();

  // Sample customer experiences data
  const customerExperiences: CustomerExperience[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      customerName: "Adeola Johnson",
      menuChoice: "A5 Japanese Wagyu Ribeye Steak",
      date: "March 15, 2024",
      description:
        "The most incredible dining experience of my life! The Wagyu melted in my mouth like butter.",
      likes: 42,
      isLiked: false,
      duration: "2.5 hours",
      location: "Private Dining Room",
      rating: 5,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      customerName: "Chinedu Okoro",
      menuChoice: "Butter-Poached Maine Lobster",
      date: "March 12, 2024",
      description:
        "Celebrated our anniversary here. The lobster was perfectly cooked and the service was impeccable.",
      likes: 38,
      isLiked: false,
      duration: "3 hours",
      location: "Window Table",
      rating: 5,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      customerName: "Funke Adebayo",
      menuChoice: "Truffle-Infused Wagyu Beef Tenderloin",
      date: "March 10, 2024",
      description:
        "The truffle aroma alone was worth the visit! Every bite was a journey.",
      likes: 56,
      isLiked: false,
      duration: "2 hours",
      location: "Chef's Counter",
      rating: 5,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80",
      customerName: "Emeka Nwankwo",
      menuChoice: "Wild Mushroom & Foie Gras Ravioli",
      date: "March 8, 2024",
      description:
        "The ravioli was a work of art. The flavors were perfectly balanced.",
      likes: 29,
      isLiked: false,
      duration: "1.5 hours",
      location: "Garden View",
      rating: 4,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      customerName: "Bisi Williams",
      menuChoice: "Saffron-Infused Dover Sole Meunière",
      date: "March 5, 2024",
      description:
        "The tableside preparation was a wonderful experience. The sole was delicate and flavorful.",
      likes: 34,
      isLiked: false,
      duration: "2 hours",
      location: "Main Dining",
      rating: 5,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedImages(newLiked);
  };

  const viewExperience = (id: string) => {
    router.push(`home/gallery/view_experience/${id}`);
  };

  const getStars = (rating: number = 5) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="min-h-screen bg-black text-white py-12 lg:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4 lg:mb-6">
            <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={20} />
            <span
              className={`text-amber-400 text-xs lg:text-sm tracking-widest uppercase ${cormorant.className}`}
            >
              Customer Experiences
            </span>
            <Sparkles className="text-amber-400" size={20} />
            <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-8xl font-bold mb-4 lg:mb-6`}
          >
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Culinary
            </span>
            <br />
            <span
              className={`text-white text-3xl sm:text-4xl lg:text-7xl ${alex_brush.className}`}
            >
              Memories
            </span>
          </h1>

          <p
            className={`text-base lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 ${cormorant.className}`}
          >
            Discover the unforgettable moments and exquisite dishes experienced
            by our valued guests. Each picture tells a story of culinary
            excellence and cherished memories.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16"
        >
          {customerExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-gray-700 overflow-hidden cursor-pointer active:scale-95 transition-all duration-300"
              onClick={() => viewExperience(experience.id)}
            >
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.menuChoice}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(experience.id, e)}
                  className="absolute top-3 right-3 p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
                >
                  <Heart
                    size={18}
                    className={`${
                      likedImages.has(experience.id)
                        ? "text-red-500 fill-red-500"
                        : "text-white"
                    } transition-colors duration-300`}
                  />
                </button>

                {/* Quick Info Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Clock size={12} className="text-amber-400" />
                    <span className="text-amber-400 text-xs">
                      {experience.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <MapPin size={12} className="text-amber-400" />
                    <span className="text-amber-400 text-xs">
                      {experience.location}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="absolute top-12 left-3">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-amber-400 text-xs">
                      {getStars(experience.rating)}
                    </span>
                  </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                  <h3
                    className={`text-lg lg:text-xl font-bold text-white mb-2 ${playfair.className} line-clamp-2`}
                  >
                    {experience.menuChoice}
                  </h3>
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <User size={14} />
                    <span
                      className={`text-xs lg:text-sm ${cormorant.className}`}
                    >
                      {experience.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={12} />
                    <span className={`text-xs ${cormorant.className}`}>
                      {experience.date}
                    </span>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600/50">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Heart size={14} />
                      <span className={`text-xs ${cormorant.className}`}>
                        {experience.likes} likes
                      </span>
                    </div>
                    <div className="text-amber-400 text-xs font-semibold">
                      View Details →
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Overlay - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:flex absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
                <div className="text-center">
                  <Sparkles className="text-amber-400 mx-auto mb-2" size={32} />
                  <p
                    className={`text-amber-400 font-semibold ${cormorant.className}`}
                  >
                    View Full Experience
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-2xl lg:rounded-3xl p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div
                  className={`text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {customerExperiences.length}+
                </div>
                <div className={`text-gray-300 text-sm ${cormorant.className}`}>
                  Experiences
                </div>
              </div>
              <div>
                <div
                  className={`text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {customerExperiences.reduce((acc, exp) => acc + exp.likes, 0)}
                  +
                </div>
                <div className={`text-gray-300 text-sm ${cormorant.className}`}>
                  Total Likes
                </div>
              </div>
              <div>
                <div
                  className={`text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  5★
                </div>
                <div className={`text-gray-300 text-sm ${cormorant.className}`}>
                  Average Rating
                </div>
              </div>
              <div>
                <div
                  className={`text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  100%
                </div>
                <div className={`text-gray-300 text-sm ${cormorant.className}`}>
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto">
            <h2
              className={`text-2xl lg:text-3xl font-bold text-amber-400 mb-3 lg:mb-4 ${playfair.className}`}
            >
              Share Your Experience
            </h2>
            <p
              className={`text-gray-300 mb-4 lg:mb-6 text-sm lg:text-base ${cormorant.className}`}
            >
              Had an unforgettable dining experience with us? Share your photos
              and story with our community.
            </p>
            <motion.a
              href="home/gallery/upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-amber-400 text-black font-bold py-3 lg:py-4 px-6 lg:px-8 rounded-xl hover:bg-amber-300 transition-colors duration-300 text-sm lg:text-base"
            >
              <Share2 size={18} />
              <span>Share Your Experience</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
