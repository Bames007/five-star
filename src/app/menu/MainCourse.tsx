// components/MainCourse.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastTapTime = useRef(0);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        navigate(1); // Swipe left - next
      } else {
        navigate(-1); // Swipe right - previous
      }
    }
  };

  // FIXED: Improved navigation with immediate response
  const navigate = useCallback(
    (direction: number) => {
      if (isAnimating) return;

      setIsAnimating(true);

      // Immediate state update
      setCurrentIndex((prev) => {
        const nextIndex = prev + direction;
        if (nextIndex >= items.length) return 0;
        if (nextIndex < 0) return items.length - 1;
        return nextIndex;
      });

      // Shorter timeout for better responsiveness
      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating, items.length]
  );

  // FIXED: Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

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
      Steak: <Flame size={isMobile ? 14 : 16} />,
      Seafood: <Fish size={isMobile ? 14 : 16} />,
      Poultry: <Utensils size={isMobile ? 14 : 16} />,
      Pasta: <Wheat size={isMobile ? 14 : 16} />,
      Lamb: <Sparkles size={isMobile ? 14 : 16} />,
      Vegetarian: <Carrot size={isMobile ? 14 : 16} />,
      Japanese: <Sparkles size={isMobile ? 14 : 16} />,
    };
    return icons[category] || <Utensils size={isMobile ? 14 : 16} />;
  };

  // Get visible cards - current, previous, and next
  const getVisibleCards = () => {
    const visible = [];
    const total = items.length;

    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + total) % total;
      visible.push({ ...items[index], position: i });
    }

    return visible;
  };

  // FIXED: Better mobile card offsets
  const getCardOffsets = () => {
    if (isMobile) {
      return {
        x: 60, // Reduced for better mobile fit
        y: 8,
        activeScale: 0.85, // Larger active card
        inactiveScale: 0.65, // Better size ratio
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
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] px-2 md:px-4">
      {/* Enhanced Progress Indicator - Mobile Optimized */}
      <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-1 md:space-x-2 bg-black/70 backdrop-blur-lg rounded-xl md:rounded-2xl px-2 md:px-4 py-1 md:py-3">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className={`rounded-full transition-all duration-200 cursor-pointer ${
              index === currentIndex
                ? "bg-[#DDA629] w-4 md:w-6 h-1 md:h-2"
                : "bg-white/40 w-1 md:w-2 h-1 md:h-2 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(index);
              }
            }}
          />
        ))}
      </div>

      {/* Cards Stack with Touch Support */}
      <div
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getVisibleCards().map(({ ...item }) => {
          const typedItem = item as typeof item & { position: number };
          const position = typedItem.position;
          const isActive = position === 0;
          const isPrevious = position === -1;
          const offsets = getCardOffsets();

          return (
            <motion.div
              key={`${item.id}-${currentIndex}-${position}`}
              className={`absolute inset-0 bg-black border-2 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${
                isActive
                  ? "border-[#DDA629] shadow-lg md:shadow-2xl shadow-[#DDA629]/20 z-20"
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
                stiffness: 500, // Increased stiffness for faster response
                damping: 30,
                mass: 0.7, // Reduced mass for snappier animation
              }}
              onClick={() => {
                // FIXED: Double tap prevention
                const now = Date.now();
                if (now - lastTapTime.current < 300) return;
                lastTapTime.current = now;

                if (isActive && !isAnimating) {
                  onCardSelect(item);
                }
              }}
            >
              {/* Background Image with Gradient */}
              <div className="absolute inset-0">
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
                {!isActive && <div className="absolute inset-0 bg-black/40" />}
              </div>

              {/* Content - Mobile Optimized */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span
                      className="text-black px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center space-x-1"
                      style={{
                        backgroundColor: getCategoryColor(item.subcategory),
                      }}
                    >
                      {getCategoryIcon(item.subcategory)}
                      <span
                        className={isMobile ? "text-xs" : "hidden sm:inline"}
                      >
                        {isMobile && item.subcategory.length > 6
                          ? item.subcategory.substring(0, 6) + ".."
                          : item.subcategory}
                      </span>
                    </span>
                  </div>
                  <span className="bg-black/80 text-white px-2 py-0.5 rounded text-xs backdrop-blur-sm flex items-center space-x-1">
                    <Clock size={10} />
                    <span>{item.preparation_time}m</span>
                  </span>
                </div>

                {/* Title and Price */}
                <div className="mb-2 md:mb-4">
                  <h3 className="text-base md:text-2xl font-bold text-white mb-1 leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-xl font-bold text-[#DDA629]">
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
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      {/* Excerpt */}
                      <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                        {item.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                        {item.allergies.slice(0, 2).map((allergy) => (
                          <span
                            key={allergy}
                            className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30"
                          >
                            {isMobile && allergy.length > 8
                              ? allergy.substring(0, 8) + ".."
                              : allergy}
                          </span>
                        ))}
                        {item.dietary_restrictions
                          .slice(0, 2)
                          .map((restriction) => (
                            <span
                              key={restriction}
                              className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30"
                            >
                              {isMobile && restriction.length > 8
                                ? restriction.substring(0, 8) + ".."
                                : restriction}
                            </span>
                          ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "#c8951e",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#DDA629] text-black font-bold py-2 md:py-3 rounded-lg md:rounded-xl transition-colors shadow-lg text-sm md:text-base"
                      >
                        {isMobile ? "View Details" : "View Full Details"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation hints for non-active cards */}
                {!isActive && (
                  <div className="text-center mt-1 md:mt-4">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-[#DDA629] text-xs md:text-sm font-medium"
                    >
                      {isPrevious ? "←" : "→"}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FIXED: Enhanced Navigation Buttons - Better Mobile Support */}
      <div className="absolute -bottom-12 md:-bottom-30 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4 items-center">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate(-1)}
          disabled={isAnimating}
          className="group w-10 h-10 md:w-14 md:h-14 bg-gray-900/90 rounded-full flex items-center justify-center shadow-xl border border-[#DDA629]/30 hover:border-[#DDA629] transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft
            className="text-[#DDA629] group-hover:text-[#f4d15a] transition-colors"
            size={isMobile ? 20 : 24}
          />
        </motion.button>

        {/* Counter Display */}
        <div className="flex flex-col items-center space-y-0.5 bg-gray-900/80 rounded-2xl md:rounded-3xl border border-[#DDA629]/20 px-3 py-1 md:px-6 md:py-3 backdrop-blur-sm">
          <span className="text-xs md:text-base text-gray-300 font-medium">
            {currentIndex + 1} <span className="text-[#DDA629]">/</span>{" "}
            {items.length}
          </span>
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate(1)}
          disabled={isAnimating}
          className="group w-10 h-10 md:w-14 md:h-14 bg-gray-900/90 rounded-full flex items-center justify-center shadow-xl border border-[#DDA629]/30 hover:border-[#DDA629] transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight
            className="text-[#DDA629] group-hover:text-[#f4d15a] transition-colors"
            size={isMobile ? 20 : 24}
          />
        </motion.button>
      </div>

      {/* Swipe Hint for Mobile */}
      {isMobile && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-gray-400 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full"
          >
            Swipe to navigate
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function MainCourse() {
  const router = useRouter();

  const handleCardSelect = (item: (typeof mainCourse)[0]) => {
    router.push(`/home/foodMenu/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Enhanced Header - Mobile Optimized */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#010104]/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8 md:py-16 relative z-10"
        >
          <div className="flex items-center justify-center gap-1 md:gap-2 mb-3 md:mb-6">
            <div className="w-6 md:w-8 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={16} />
            <span
              className={`text-amber-400 text-xs tracking-widest uppercase ${cormorant.className}`}
            >
              Top Meals
            </span>
            <Sparkles className="text-amber-400" size={16} />
            <div className="w-6 md:w-8 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>

          <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold text-center mb-3 md:mb-6">
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Main Course
            </span>
            <br />
            <span
              className={`text-white text-2xl md:text-3xl lg:text-7xl ${alexBrush.className}`}
            >
              Menu
            </span>
          </h1>

          <p
            className={`text-sm md:text-xl text-gray-300 text-center max-w-2xl mx-auto leading-relaxed px-2 ${alexBrush.className}`}
          >
            Discover our exquisite selection of culinary masterpieces. Tap or
            swipe to explore.
          </p>
        </motion.div>
      </div>

      {/* Card Stack Section */}
      <div className="container mx-auto px-0 md:px-4 py-4 md:py-12">
        <CardStack items={mainCourse} onCardSelect={handleCardSelect} />

        {/* Enhanced Items Counter */}
        <motion.div
          className="text-center mt-12 md:mt-32 text-gray-400 px-4 pt-8 md:pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-1 md:space-x-2 bg-gray-800/50 px-3 md:px-6 py-1 md:py-3 rounded-full border border-gray-700/50">
            <span className="text-[#DDA629] font-semibold text-xs md:text-base">
              {mainCourse.length} premium dishes
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
