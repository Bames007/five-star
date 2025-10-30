// components/Gallery/DrinksGallery.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Share2,
  Wine,
  Clock,
  Users,
  Star,
  ChevronRight,
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

export default function DrinksGallery() {
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();

  // Luxury drinks experiences data
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

  const viewDrinkExperience = (id: string) => {
    router.push(`home/gallery/view_drinks_experience/${id}`);
  };

  const getStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="min-h-screen bg-black text-white py-4 lg:py-12">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-400/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-amber-600/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-amber-300/2 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4">
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 lg:mb-12 px-2"
        >
          <div className="flex items-center justify-center gap-2 mb-4 lg:mb-6">
            <div className="w-8 lg:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <Sparkles className="text-amber-400" size={20} />
            <span
              className={`text-amber-400 text-xs lg:text-lg tracking-widest uppercase ${cormorant.className}`}
            >
              Connoisseur's Collection
            </span>
            <Sparkles className="text-amber-400" size={20} />
            <div className="w-8 lg:w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-8xl font-bold mb-4 lg:mb-6`}
          >
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Liquid
            </span>
            <br />
            <span
              className={`text-white text-3xl sm:text-4xl lg:text-7xl ${alex_brush.className}`}
            >
              Artistry
            </span>
          </h1>

          <p
            className={`text-base lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 ${cormorant.className}`}
          >
            Discover the world&apos;s most exquisite beverages through the
            experiences of our distinguished guests. Each glass tells a story of
            craftsmanship, tradition, and unforgettable moments.
          </p>
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 lg:mb-12"
        >
          {drinkExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl lg:rounded-3xl border border-gray-700 overflow-hidden cursor-pointer active:scale-95 transition-all duration-500 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/10"
              onClick={() => viewDrinkExperience(experience.id)}
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.drinkName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Luxury Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-amber-400/20 backdrop-blur-sm rounded-full px-2 py-1 border border-amber-400/30">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                      {experience.glassware}
                    </span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-600">
                    <span className="text-white text-xs font-semibold">
                      {experience.occasion}
                    </span>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(experience.id, e)}
                  className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-amber-400/20 transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    size={18}
                    className={`transition-all duration-300 ${
                      likedImages.has(experience.id)
                        ? "text-red-500 fill-red-500 scale-110"
                        : "text-white hover:text-red-400"
                    }`}
                  />
                </button>

                {/* Rating */}
                <div className="absolute top-14 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 border border-amber-400/30">
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-amber-400"
                      size={12}
                      fill="currentColor"
                    />
                    <span className="text-amber-400 text-xs font-bold">
                      {experience.rating}
                    </span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-6">
                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 ${playfair.className} line-clamp-2`}
                  >
                    {experience.drinkName}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Users size={14} />
                      <span
                        className={`text-xs sm:text-sm ${cormorant.className}`}
                      >
                        {experience.customerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Clock size={12} />
                      <span className={`text-xs ${cormorant.className}`}>
                        {experience.date}
                      </span>
                    </div>
                  </div>

                  {/* Flavor Profile */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {experience.flavorProfile.slice(0, 2).map((flavor) => (
                      <span
                        key={flavor}
                        className="px-2 py-1 bg-amber-400/10 rounded-full text-amber-400 text-xs border border-amber-400/20"
                      >
                        {flavor}
                      </span>
                    ))}
                    {experience.flavorProfile.length > 2 && (
                      <span className="px-2 py-1 bg-amber-400/10 rounded-full text-amber-400 text-xs border border-amber-400/20">
                        +{experience.flavorProfile.length - 2}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 ${cormorant.className}`}
                  >
                    {experience.description}
                  </p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-amber-400/20 backdrop-blur-sm rounded-full p-3 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 flex items-center justify-center border border-amber-400/30">
                    <Wine className="text-amber-400" size={20} />
                  </div>
                  <p
                    className={`text-amber-400 font-semibold text-sm sm:text-lg ${cormorant.className}`}
                  >
                    View Experience
                  </p>
                  <ChevronRight
                    className="text-amber-400 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    size={16}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center px-2"
        >
          <div className="relative bg-gradient-to-r from-amber-400/10 via-amber-500/10 to-amber-400/10 border border-amber-400/30 rounded-xl lg:rounded-3xl p-6 lg:p-12 max-w-4xl mx-auto overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-400"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-400"></div>
            </div>

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400 mb-3 lg:mb-6 ${playfair.className}`}
            >
              Share Your Connoisseur Moment
            </h2>
            <p
              className={`text-gray-300 mb-4 lg:mb-8 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto ${cormorant.className}`}
            >
              Experienced an exceptional beverage with us? Share your story and
              join our community of discerning connoisseurs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/gallery/upload")}
              className="inline-flex items-center gap-3 bg-amber-400 text-black font-bold py-3 lg:py-4 px-6 lg:px-10 rounded-xl hover:bg-amber-300 transition-all duration-300 text-base lg:text-xl shadow-lg shadow-amber-400/25"
            >
              <Share2 size={20} />
              <span>Share Your Experience</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Luxury Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 border-t border-gray-800 mt-8 lg:mt-16"
      >
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Wine className="text-amber-400" size={16} />
            <span className={`text-amber-400 text-xs ${cormorant.className}`}>
              Crafted for Connoisseurs
            </span>
          </div>
          <p className={`text-gray-400 text-xs ${cormorant.className}`}>
            Every sip tells a story • Every glass holds a memory
          </p>
        </div>
      </motion.div>
    </section>
  );
}
