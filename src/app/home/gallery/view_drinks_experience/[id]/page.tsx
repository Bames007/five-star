// app/gallery/view_drinks_experience/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Share2,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Wine,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
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

interface DrinkExperience {
  id: string;
  image: string;
  customerName: string;
  drinkName: string;
  date: string;
  description: string;
  likes: number;
  isLiked: boolean;
  rating: number;
  glassware: string;
  servingStyle: string;
  flavorProfile: string[];
  ingredients: string[];
  occasion: string;
}

// Sample data matching the gallery
const drinkExperiences: DrinkExperience[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    customerName: "Isabella Rossi",
    drinkName: "Vintage Dom Pérignon 2010",
    date: "March 18, 2024",
    description:
      "An extraordinary champagne experience. The delicate bubbles and complex notes of brioche and citrus made for an unforgettable celebration.",
    likes: 89,
    isLiked: false,
    rating: 5,
    glassware: "Flute",
    servingStyle: "Chilled",
    flavorProfile: ["Citrus", "Brioche", "Almond"],
    ingredients: ["Chardonnay", "Pinot Noir"],
    occasion: "Anniversary",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    customerName: "Marcus Chen",
    drinkName: "Macallan 25 Year Single Malt",
    date: "March 16, 2024",
    description:
      "The depth and complexity of this single malt is unparalleled. Notes of dark chocolate, orange peel, and oak created a symphony of flavors.",
    likes: 76,
    isLiked: false,
    rating: 5,
    glassware: "Glencairn",
    servingStyle: "Neat",
    flavorProfile: ["Dark Chocolate", "Orange", "Oak"],
    ingredients: ["Single Malt Scotch"],
    occasion: "Business Dinner",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=2070&q=80",
    customerName: "Sophie Laurent",
    drinkName: "Signature Gold Martini",
    date: "March 14, 2024",
    description:
      "Crafted with edible gold flakes and premium gin. The perfect balance of botanicals with a luxurious golden shimmer.",
    likes: 94,
    isLiked: false,
    rating: 5,
    glassware: "Coupe",
    servingStyle: "Straight Up",
    flavorProfile: ["Botanical", "Citrus", "Floral"],
    ingredients: ["Premium Gin", "Vermouth", "Edible Gold"],
    occasion: "Birthday Celebration",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80",
    customerName: "Alexander Wright",
    drinkName: "Crystal Old Fashioned",
    date: "March 12, 2024",
    description:
      "A masterpiece of mixology. The large crystal clear ice cube slowly diluted the bourbon to perfection.",
    likes: 67,
    isLiked: false,
    rating: 4,
    glassware: "Rocks",
    servingStyle: "On the Rock",
    flavorProfile: ["Caramel", "Oak", "Spice"],
    ingredients: ["Aged Bourbon", "Demerara", "Angostura"],
    occasion: "Date Night",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    customerName: "Elena Vasquez",
    drinkName: "Rosé Magnum Experience",
    date: "March 10, 2024",
    description:
      "Served from a magnificent magnum bottle. The delicate pink hue and crisp finish made for an exceptional summer evening.",
    likes: 58,
    isLiked: false,
    rating: 5,
    glassware: "Wine Glass",
    servingStyle: "Chilled",
    flavorProfile: ["Strawberry", "Citrus", "Mineral"],
    ingredients: ["Grenache", "Syrah", "Cinsault"],
    occasion: "Summer Party",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    customerName: "James Fitzgerald",
    drinkName: "Japanese Whisky Flight",
    date: "March 8, 2024",
    description:
      "An educational journey through Japan's finest distilleries. Each whisky told a unique story of craftsmanship.",
    likes: 82,
    isLiked: false,
    rating: 5,
    glassware: "Tasting Glass",
    servingStyle: "Flight",
    flavorProfile: ["Smoky", "Umami", "Fruity"],
    ingredients: ["Hibiki", "Yamazaki", "Hakushu"],
    occasion: "Whisky Tasting",
  },
];

export default function ViewDrinkExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [currentExperience, setCurrentExperience] =
    useState<DrinkExperience | null>(null);
  const [relatedExperiences, setRelatedExperiences] = useState<
    DrinkExperience[]
  >([]);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchExperience = () => {
      setIsLoading(true);
      const experience = drinkExperiences.find((exp) => exp.id === id);
      setCurrentExperience(experience || null);

      // Get related experiences (excluding current one)
      const related = drinkExperiences
        .filter((exp) => exp.id !== id)
        .slice(0, 3);
      setRelatedExperiences(related);

      setIsLoading(false);
    };

    fetchExperience();
  }, [id]);

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
    router.push(`/home/gallery/view_drinks_experience/${id}`);
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
            Pouring your experience...
          </p>
        </div>
      </div>
    );
  }

  if (!currentExperience) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Wine className="text-amber-400 mx-auto mb-4" size={48} />
          <h2 className={`text-2xl text-amber-400 mb-4 ${playfair.className}`}>
            Experience Not Found
          </h2>
          <Link
            href="/home/gallery"
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
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl" />
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
            href="/home/gallery"
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
          className="mb-8 lg:mb-12"
        >
          {/* Hero Image */}
          <div className="relative rounded-xl lg:rounded-3xl overflow-hidden mb-4 lg:mb-6">
            <img
              src={currentExperience.image}
              alt={currentExperience.drinkName}
              className="w-full h-48 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 lg:top-4 lg:right-4 flex gap-2">
              <button
                onClick={() => handleLike(currentExperience.id)}
                className="p-2 lg:p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors duration-300"
              >
                <Heart
                  size={18}
                  className={`${
                    likedImages.has(currentExperience.id)
                      ? "text-red-500 fill-red-500"
                      : "text-white"
                  } transition-colors duration-300`}
                />
              </button>
              <button className="p-2 lg:p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-colors duration-300">
                <Share2 size={18} className="text-white" />
              </button>
            </div>

            {/* Basic Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
              <h1
                className={`text-xl lg:text-4xl font-bold text-white mb-2 ${playfair.className}`}
              >
                {currentExperience.drinkName}
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
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl lg:rounded-3xl border border-gray-700 p-4 lg:p-8">
            {/* Meta Information */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Calendar className="text-amber-400 mx-auto mb-2" size={18} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.date}
                </div>
                <div className="text-gray-400 text-xs">Date</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Wine className="text-amber-400 mx-auto mb-2" size={18} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.glassware}
                </div>
                <div className="text-gray-400 text-xs">Glassware</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <MapPin className="text-amber-400 mx-auto mb-2" size={18} />
                <div className="text-white font-semibold text-sm">
                  {currentExperience.occasion}
                </div>
                <div className="text-gray-400 text-xs">Occasion</div>
              </div>
              <div className="text-center p-3 bg-black/50 rounded-xl border border-gray-700">
                <Star
                  className="text-amber-400 mx-auto mb-2"
                  size={18}
                  fill="currentColor"
                />
                <div className="text-white font-semibold text-sm">
                  {getStars(currentExperience.rating)}
                </div>
                <div className="text-gray-400 text-xs">Rating</div>
              </div>
            </div>

            {/* Flavor Profile */}
            <div className="mb-4 lg:mb-6">
              <h2
                className={`text-lg lg:text-xl font-bold text-amber-400 mb-3 ${playfair.className}`}
              >
                Flavor Profile
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentExperience.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-3 py-2 bg-amber-400/10 rounded-full text-amber-400 text-sm border border-amber-400/20"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 lg:mb-6">
              <h2
                className={`text-lg lg:text-2xl font-bold text-amber-400 mb-3 ${playfair.className}`}
              >
                Experience Story
              </h2>
              <p
                className={`text-gray-300 leading-relaxed text-sm lg:text-base ${cormorant.className}`}
              >
                {currentExperience.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="mb-4 lg:mb-6">
              <h2
                className={`text-lg lg:text-xl font-bold text-amber-400 mb-3 ${playfair.className}`}
              >
                Key Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentExperience.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-2 bg-gray-800/50 rounded-full text-gray-300 text-sm border border-gray-600"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Heart size={18} />
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
          className="mb-8 lg:mb-12"
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h2
              className={`text-xl lg:text-3xl font-bold text-amber-400 ${playfair.className}`}
            >
              More Experiences
            </h2>
            <Link
              href="/home/gallery"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-300 text-sm lg:text-base"
            >
              View All
            </Link>
          </div>

          {/* Related Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            {relatedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden cursor-pointer active:scale-95 transition-all duration-300"
                onClick={() => navigateToExperience(experience.id)}
              >
                {/* Image */}
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.drinkName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Quick Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3
                      className={`text-base font-bold text-white mb-1 line-clamp-2 ${playfair.className}`}
                    >
                      {experience.drinkName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        <User size={12} />
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
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-xl lg:rounded-3xl p-6 lg:p-8 max-w-2xl mx-auto">
            <h2
              className={`text-xl lg:text-3xl font-bold text-amber-400 mb-3 lg:mb-4 ${playfair.className}`}
            >
              Share Your Experience
            </h2>
            <p
              className={`text-gray-300 mb-4 lg:mb-6 text-sm lg:text-base ${cormorant.className}`}
            >
              Had an unforgettable drinks experience with us? Share your photos
              and story with our community.
            </p>
            <motion.a
              href="/home/gallery/upload"
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

      {/* Mobile Navigation Arrows */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 flex justify-between z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const currentIndex = drinkExperiences.findIndex(
              (exp) => exp.id === currentExperience.id
            );
            const prevIndex =
              (currentIndex - 1 + drinkExperiences.length) %
              drinkExperiences.length;
            navigateToExperience(drinkExperiences[prevIndex].id);
          }}
          className="flex items-center gap-2 bg-amber-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-amber-300 transition-colors duration-300 text-sm"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const currentIndex = drinkExperiences.findIndex(
              (exp) => exp.id === currentExperience.id
            );
            const nextIndex = (currentIndex + 1) % drinkExperiences.length;
            navigateToExperience(drinkExperiences[nextIndex].id);
          }}
          className="flex items-center gap-2 bg-amber-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-amber-300 transition-colors duration-300 text-sm"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
