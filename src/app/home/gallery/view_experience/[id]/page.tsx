// app/gallery/view_experience/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { use } from "react"; // Import the use hook
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Share2,
  Download,
  ArrowLeft,
  User,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Alex_Brush,
} from "next/font/google";
import Link from "next/link";
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

// Sample data - in real app, this would come from an API
const customerExperiences: CustomerExperience[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    customerName: "Adeola Johnson",
    menuChoice: "A5 Japanese Wagyu Ribeye Steak",
    date: "March 15, 2024",
    description:
      "The most incredible dining experience of my life! The Wagyu melted in my mouth like butter. The marbling was perfect, and the chef's preparation was exceptional. Every bite was a journey through flavors I never knew existed. The ambiance, the service, everything was flawless.",
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
      "Celebrated our anniversary here. The lobster was perfectly cooked and the service was impeccable. The sommelier paired it with an exquisite Chardonnay that complemented the dish beautifully.",
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
      "The truffle aroma alone was worth the visit! Every bite was a journey. The combination of premium Wagyu and fresh truffles created a symphony of flavors that danced on my palate.",
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
      "The ravioli was a work of art. The flavors were perfectly balanced. The delicate pasta wrapped around the rich foie gras and earthy mushrooms created a perfect harmony.",
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
      "The tableside preparation was a wonderful experience. The sole was delicate and flavorful, cooked to perfection with just the right amount of saffron to enhance without overpowering.",
    likes: 34,
    isLiked: false,
    duration: "2 hours",
    location: "Main Dining",
    rating: 5,
  },
];

export default function ViewExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise using React.use()
  const { id } = use(params);

  const [currentExperience, setCurrentExperience] =
    useState<CustomerExperience | null>(null);
  const [relatedExperiences, setRelatedExperiences] = useState<
    CustomerExperience[]
  >([]);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API fetch - now using the unwrapped id
    const fetchExperience = () => {
      setIsLoading(true);
      const experience = customerExperiences.find((exp) => exp.id === id);
      setCurrentExperience(experience || null);

      // Get related experiences (excluding current one)
      const related = customerExperiences
        .filter((exp) => exp.id !== id)
        .slice(0, 3);
      setRelatedExperiences(related);

      setIsLoading(false);
    };

    fetchExperience();
  }, [id]); // Use id in dependency array instead of params.id

  const handleLike = (id: string) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedImages(newLiked);
  };

  const navigateToExperience = (id: string) => {
    router.push(`${id}`);
  };

  const getStars = (rating: number = 5) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Sparkles
            className="text-amber-400 mx-auto mb-4 animate-pulse"
            size={48}
          />
          <p className={`text-amber-400 ${cormorant.className}`}>
            Loading exquisite experience...
          </p>
        </div>
      </div>
    );
  }

  if (!currentExperience) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="text-amber-400 mx-auto mb-4" size={48} />
          <h2 className={`text-2xl text-amber-400 mb-4 ${playfair.className}`}>
            Experience Not Found
          </h2>
          <Link
            href="home/gallery"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Return to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header/Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 p-4 lg:p-6"
      >
        <div className="container mx-auto">
          <Link
            href="home/gallery"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className={`${cormorant.className}`}>Back to Gallery</span>
          </Link>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-4 pb-20">
        {/* Main Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-16"
        >
          {/* Hero Image */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden mb-6 lg:mb-8">
            <img
              src={currentExperience.image}
              alt={currentExperience.menuChoice}
              className="w-full h-64 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleLike(currentExperience.id)}
                className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors duration-300"
              >
                <Heart
                  size={20}
                  className={`${
                    likedImages.has(currentExperience.id)
                      ? "text-red-500 fill-red-500"
                      : "text-white"
                  } transition-colors duration-300`}
                />
              </button>
              <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors duration-300">
                <Share2 size={20} className="text-white" />
              </button>
              <button className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors duration-300">
                <Download size={20} className="text-white" />
              </button>
            </div>

            {/* Basic Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
              <h1
                className={`text-2xl lg:text-4xl font-bold text-white mb-2 ${playfair.className}`}
              >
                {currentExperience.menuChoice}
              </h1>
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <User size={16} />
                <span className={`text-sm lg:text-base ${cormorant.className}`}>
                  {currentExperience.customerName}
                </span>
              </div>
            </div>
          </div>

          {/* Experience Details */}
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-gray-700 p-6 lg:p-8">
            {/* Meta Information */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Calendar className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.date}
                </div>
                <div className="text-gray-400 text-xs">Date</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Clock className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.duration}
                </div>
                <div className="text-gray-400 text-xs">Duration</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <MapPin className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.location}
                </div>
                <div className="text-gray-400 text-xs">Location</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Sparkles className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-white font-semibold text-sm">
                  {getStars(currentExperience.rating)}
                </div>
                <div className="text-gray-400 text-xs">Rating</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 lg:mb-8">
              <h2
                className={`text-xl lg:text-2xl font-bold text-amber-400 mb-4 ${playfair.className}`}
              >
                Experience Story
              </h2>
              <p
                className={`text-gray-300 leading-relaxed text-sm lg:text-base ${cormorant.className}`}
              >
                {currentExperience.description}
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-amber-400">
                  <Heart size={20} />
                  <span className={`${cormorant.className}`}>
                    {currentExperience.likes} likes
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  Shared {currentExperience.date}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLike(currentExperience.id)}
                className="bg-amber-400 text-black font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-xl hover:bg-amber-300 transition-colors duration-300 text-sm lg:text-base"
              >
                {likedImages.has(currentExperience.id)
                  ? "Liked"
                  : "Like Experience"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Related Experiences */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2
              className={`text-2xl lg:text-3xl font-bold text-amber-400 ${playfair.className}`}
            >
              More Experiences
            </h2>
            <Link
              href="home/gallery"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-300 text-sm lg:text-base"
            >
              View All
            </Link>
          </div>

          {/* Related Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {relatedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden cursor-pointer active:scale-95 transition-all duration-300"
                onClick={() => navigateToExperience(experience.id)}
              >
                {/* Image */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.menuChoice}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(experience.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
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

                  {/* Quick Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3
                      className={`text-lg font-bold text-white mb-2 line-clamp-2 ${playfair.className}`}
                    >
                      {experience.menuChoice}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400">
                        <User size={14} />
                        <span className={`text-xs ${cormorant.className}`}>
                          {experience.customerName}
                        </span>
                      </div>
                      <div className="text-amber-400 text-xs">
                        {experience.likes} likes
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay - Desktop Only */}
                <div className="hidden lg:flex absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 items-center justify-center">
                  <div className="text-center">
                    <Sparkles
                      className="text-amber-400 mx-auto mb-2"
                      size={24}
                    />
                    <p
                      className={`text-amber-400 font-semibold text-sm ${cormorant.className}`}
                    >
                      View Experience
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
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
              <span>Share Your Story</span>
            </motion.a>
          </div>
        </motion.section>
      </div>

      {/* Mobile Navigation Arrows for Quick Browsing */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 flex justify-between z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const currentIndex = customerExperiences.findIndex(
              (exp) => exp.id === currentExperience.id
            );
            const prevIndex =
              (currentIndex - 1 + customerExperiences.length) %
              customerExperiences.length;
            navigateToExperience(customerExperiences[prevIndex].id);
          }}
          className="flex items-center gap-2 bg-amber-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-amber-300 transition-colors duration-300"
        >
          <ChevronLeft size={20} />
          <span className="text-sm">Previous</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const currentIndex = customerExperiences.findIndex(
              (exp) => exp.id === currentExperience.id
            );
            const nextIndex = (currentIndex + 1) % customerExperiences.length;
            navigateToExperience(customerExperiences[nextIndex].id);
          }}
          className="flex items-center gap-2 bg-amber-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-amber-300 transition-colors duration-300"
        >
          <span className="text-sm">Next</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
