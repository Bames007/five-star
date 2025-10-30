// components/MainCourse.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { mainCourse } from "./food";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Utensils,
  Sparkles,
  Flame,
  Fish,
  Carrot,
  Wheat,
} from "lucide-react";
import {
  Alex_Brush,
  Cormorant_Garamond,
  Playfair_Display,
} from "next/font/google";

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

interface CardStackProps {
  items: typeof mainCourse;
  onCardSelect: (item: (typeof mainCourse)[0]) => void;
}

function CardStack({ items, onCardSelect }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Circular navigation - infinite loop
  const navigate = useCallback(
    (direction: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentIndex((prev) => {
        const nextIndex = prev + direction;
        if (nextIndex >= items.length) return 0;
        if (nextIndex < 0) return items.length - 1;
        return nextIndex;
      });

      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, items.length]
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Steak: "#DC2626",
      Seafood: "#2563EB",
      Poultry: "#D97706",
      Pasta: "#7C3AED",
      Lamb: "#059669",
      Vegetarian: "#10B981",
      Japanese: "#EF4444",
    };
    return colors[category] || "#DDA629";
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Steak: <Flame size={16} />,
      Seafood: <Fish size={16} />,
      Poultry: <Utensils size={16} />,
      Pasta: <Wheat size={16} />,
      Lamb: <Sparkles size={16} />,
      Vegetarian: <Carrot size={16} />,
      Japanese: <Sparkles size={16} />,
    };
    return icons[category] || <Utensils size={16} />;
  };

  // Get visible cards - current, previous, and next
  const getVisibleCards = () => {
    const visible = [];
    const total = items.length;

    // Show previous, current, and next cards
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + total) % total;
      visible.push({ ...items[index], position: i });
    }

    return visible;
  };

  // Calculate card offsets and scales based on screen size
  const getCardOffsets = () => {
    if (isMobile) {
      return {
        x: 80,
        y: 15,
        activeScale: 0.75,
        inactiveScale: 0.5,
      };
    }
    return {
      x: 200,
      y: 20,
      activeScale: 1,
      inactiveScale: 0.85,
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[450px] md:h-[600px] px-4 md:px-0">
      {/* Enhanced Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 bg-black/50 backdrop-blur-lg rounded-2xl px-3 py-2 md:px-4 md:py-3">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-[#DDA629] w-6 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!isAnimating) setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      {/* Cards Stack */}
      <div className="relative w-full h-full">
        {getVisibleCards().map(({ ...item }) => {
          const position = (item as any).position;
          const isActive = position === 0;
          const isPrevious = position === -1;
          const isNext = position === 1;
          const offsets = getCardOffsets();

          return (
            <motion.div
              key={`${item.id}-${currentIndex}-${position}`}
              className={`absolute inset-0 bg-black border-2 rounded-3xl overflow-hidden cursor-pointer ${
                isActive
                  ? "border-[#DDA629] shadow-2xl shadow-[#DDA629]/20 z-20"
                  : "border-gray-600/50 z-10"
              }`}
              initial={{
                scale: isActive ? offsets.activeScale : offsets.inactiveScale,
                x: isActive ? 0 : isPrevious ? -offsets.x : offsets.x,
                y: isActive ? 0 : offsets.y,
                opacity: isActive ? 1 : 0.6,
              }}
              animate={{
                scale: isActive ? offsets.activeScale : offsets.inactiveScale,
                x: isActive ? 0 : isPrevious ? -offsets.x : offsets.x,
                y: isActive ? 0 : offsets.y,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                mass: 0.8,
              }}
              onClick={() => isActive && onCardSelect(item)}
            >
              {/* Background Image with Gradient */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
                {!isActive && <div className="absolute inset-0 bg-black/30" />}
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className="text-black px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm flex items-center space-x-1 md:space-x-2"
                      style={{
                        backgroundColor: getCategoryColor(item.subcategory),
                      }}
                    >
                      {getCategoryIcon(item.subcategory)}
                      <span className="hidden sm:inline">
                        {item.subcategory}
                      </span>
                    </span>
                  </div>
                  <span className="bg-black/80 text-white px-2 py-1 rounded-lg text-xs md:text-sm backdrop-blur-sm flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{item.preparation_time}min</span>
                  </span>
                </div>

                {/* Title and Price */}
                <div className="mb-3 md:mb-4">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-xl font-bold text-[#DDA629]">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Expandable Content - Only for active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      {/* Excerpt */}
                      <p className="text-gray-300 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                        {item.allergies.slice(0, 2).map((allergy) => (
                          <span
                            key={allergy}
                            className="text-xs bg-red-500/20 text-red-300 px-2 py-1 md:px-3 md:py-1 rounded-full border border-red-500/30"
                          >
                            {allergy}
                          </span>
                        ))}
                        {item.dietary_restrictions
                          .slice(0, 2)
                          .map((restriction) => (
                            <span
                              key={restriction}
                              className="text-xs bg-green-500/20 text-green-300 px-2 py-1 md:px-3 md:py-1 rounded-full border border-green-500/30"
                            >
                              {restriction}
                            </span>
                          ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "#c8951e",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#DDA629] text-black font-bold py-2 md:py-3 rounded-xl transition-colors shadow-lg text-sm md:text-base"
                      >
                        View Full Details
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation hints for non-active cards */}
                {!isActive && (
                  <div className="text-center mt-2 md:mt-4">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-[#DDA629] text-xs md:text-sm font-medium"
                    >
                      {isPrevious ? "← Previous" : "Next →"}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Navigation Buttons */}
      <div className="absolute -bottom-16 md:-bottom-30 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 items-center">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="group w-12 h-12 md:w-14 md:h-14 bg-gray-900/90 rounded-full flex items-center justify-center shadow-xl border border-[#DDA629]/30 hover:border-[#DDA629] transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft
            className="text-[#DDA629] group-hover:text-[#f4d15a] transition-colors"
            size={24}
          />
        </motion.button>

        {/* Counter Display */}
        <div className="flex flex-col items-center space-y-1 bg-gray-900/80 rounded-3xl border border-[#DDA629]/20 px-4 py-2 md:px-6 md:py-3 backdrop-blur-sm">
          <span className="text-sm md:text-base text-gray-300 font-medium">
            {currentIndex + 1} <span className="text-[#DDA629]">/</span>{" "}
            {items.length}
          </span>
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(1)}
          className="group w-12 h-12 md:w-14 md:h-14 bg-gray-900/90 rounded-full flex items-center justify-center shadow-xl border border-[#DDA629]/30 hover:border-[#DDA629] transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight
            className="text-[#DDA629] group-hover:text-[#f4d15a] transition-colors"
            size={24}
          />
        </motion.button>
      </div>
    </div>
  );
}

export default function MainCourse() {
  const router = useRouter();

  const handleCardSelect = (item: (typeof mainCourse)[0]) => {
    // Navigate to dynamic food detail page
    router.push(`/home/foodMenu/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#010104]/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-12 md:py-16 relative z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4 lg:mb-6">
            <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={20} />
            <span
              className={`text-amber-400 text-xs lg:text-sm tracking-widest uppercase ${cormorant.className}`}
            >
              Top Meals
            </span>
            <Sparkles className="text-amber-400" size={20} />
            <div className="w-8 lg:w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-center mb-4 md:mb-6">
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Main Course
            </span>
            <br />
            <span
              className={`text-white text-3xl sm:text-4xl lg:text-7xl ${alexBrush.className}`}
            >
              Menu
            </span>
          </h1>

          <p
            className={`text-base md:text-xl text-gray-300 text-center max-w-2xl mx-auto leading-relaxed px-2 ${alexBrush.className}`}
          >
            Discover our exquisite selection of culinary masterpieces. Tap or
            use arrows to explore.
          </p>
        </motion.div>
      </div>

      {/* Card Stack Section */}
      <div className="container mx-auto px-0 md:px-4 py-6 md:py-12">
        <CardStack items={mainCourse} onCardSelect={handleCardSelect} />

        {/* Enhanced Items Counter */}
        <motion.div
          className="text-center mt-16 md:mt-32 text-gray-400 px-4 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 md:space-x-4 bg-gray-800/50 px-4 py-2 md:px-6 md:py-3 rounded-full border border-gray-700/50">
            <span className="text-[#DDA629] font-semibold text-sm md:text-base">
              {mainCourse.length} premium dishes
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
