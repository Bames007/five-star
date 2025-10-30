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
import Image from "next/image";

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
  const [, setShowScrollTop] = useState(false);
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
    <section className="w-full bg-black text-white py-8 sm:py-12 lg:py-20 overflow-x-hidden">
      {/* Background Elements - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-amber-400/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-amber-600/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4">
        {/* Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={16} />
            <span
              className={`text-amber-400 text-xs tracking-widest uppercase ${cormorant.className}`}
            >
              Customer Experiences
            </span>
            <Sparkles className="text-amber-400" size={16} />
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>

          <h1
            className={`text-2xl sm:text-4xl lg:text-8xl font-bold mb-3 sm:mb-4 lg:mb-6`}
          >
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Culinary
            </span>
            <br />
            <span
              className={`text-white text-xl sm:text-3xl lg:text-7xl ${alex_brush.className}`}
            >
              Memories
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-2 ${cormorant.className}`}
          >
            Discover the unforgettable moments and exquisite dishes experienced
            by our valued guests.
          </p>
        </motion.div>

        {/* Gallery Grid - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16"
        >
          {customerExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm sm:backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl border border-gray-700 overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300"
              onClick={() => viewExperience(experience.id)}
            >
              {/* Image - Mobile Optimized */}
              <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.menuChoice}
                  height={400}
                  width={1200}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={index < 2} // Only prioritize first 2 images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Like Button - Mobile Optimized */}
                <button
                  onClick={(e) => handleLike(experience.id, e)}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
                >
                  <Heart
                    size={16}
                    className={`${
                      likedImages.has(experience.id)
                        ? "text-red-500 fill-red-500"
                        : "text-white"
                    } transition-colors duration-300`}
                  />
                </button>

                {/* Quick Info Badges - Mobile Optimized */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <Clock size={10} className="text-amber-400" />
                    <span className="text-amber-400 text-xs">
                      {experience.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <MapPin size={10} className="text-amber-400" />
                    <span className="text-amber-400 text-xs">
                      {experience.location?.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Rating Stars - Mobile Optimized */}
                <div className="absolute top-10 sm:top-12 left-2">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    <span className="text-amber-400 text-xs">
                      {getStars(experience.rating)}
                    </span>
                  </div>
                </div>

                {/* Overlay Content - Mobile Optimized */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                  <h3
                    className={`text-sm sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 ${playfair.className} line-clamp-2`}
                  >
                    {experience.menuChoice}
                  </h3>
                  <div className="flex items-center gap-1 sm:gap-2 text-amber-400 mb-1">
                    <User size={12} />
                    <span className={`text-xs ${cormorant.className}`}>
                      {experience.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                    <Calendar size={10} />
                    <span className={`text-xs ${cormorant.className}`}>
                      {experience.date}
                    </span>
                  </div>

                  {/* Engagement Stats - Mobile Optimized */}
                  <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-600/50">
                    <div className="flex items-center gap-1 sm:gap-2 text-amber-400">
                      <Heart size={12} />
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

        {/* Quick Stats Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {customerExperiences.length}+
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Experiences
                </div>
              </div>
              <div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {customerExperiences.reduce((acc, exp) => acc + exp.likes, 0)}
                  +
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Total Likes
                </div>
              </div>
              <div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  5★
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Avg Rating
                </div>
              </div>
              <div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  100%
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <h2
              className={`text-lg sm:text-xl lg:text-3xl font-bold text-amber-400 mb-2 sm:mb-3 lg:mb-4 ${playfair.className}`}
            >
              Share Your Experience
            </h2>
            <p
              className={`text-gray-300 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm lg:text-base ${cormorant.className}`}
            >
              Had an unforgettable dining experience? Share your photos and
              story.
            </p>
            <motion.a
              href="home/gallery/upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 sm:gap-3 bg-amber-400 text-black font-bold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl hover:bg-amber-300 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
            >
              <Share2 size={16} />
              <span>Share Your Experience</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
