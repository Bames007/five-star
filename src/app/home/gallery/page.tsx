// app/gallery/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Filter,
  Search,
  Utensils,
  Wine,
  Calendar,
  TrendingUp,
  User,
  Clock,
} from "lucide-react";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Alex_Brush,
} from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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

interface BaseExperience {
  id: string;
  image: string;
  customerName: string;
  date: string;
  description: string;
  likes: number;
  isLiked: boolean;
  type: "food" | "drink";
  rating?: number;
  location?: string;
}

interface FoodExperience extends BaseExperience {
  type: "food";
  menuChoice: string;
  preparation_time?: string;
  duration?: string;
  allergies?: string[];
  dietary_restrictions?: string[];
  subcategory?: string;
}

interface DrinkExperience extends BaseExperience {
  type: "drink";
  drinkName: string;
  glassware: string;
  servingStyle: string;
  flavorProfile: string[];
  ingredients: string[];
  occasion: string;
}

type Experience = FoodExperience | DrinkExperience;

// Food experiences data matching the view_experience page
const foodExperiences: FoodExperience[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
    customerName: "Adeola Johnson",
    menuChoice: "A5 Japanese Wagyu Ribeye Steak",
    date: "March 15, 2024",
    description:
      "The most incredible dining experience of my life! The Wagyu melted in my mouth like butter.",
    likes: 42,
    isLiked: false,
    type: "food",
    rating: 5,
    duration: "2.5 hours",
    location: "Private Dining Room",
    subcategory: "Steak",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
    customerName: "Chinedu Okoro",
    menuChoice: "Butter-Poached Maine Lobster",
    date: "March 12, 2024",
    description:
      "Celebrated our anniversary here. The lobster was perfectly cooked and the service was impeccable.",
    likes: 38,
    isLiked: false,
    type: "food",
    rating: 5,
    duration: "3 hours",
    location: "Window Table",
    subcategory: "Seafood",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
    customerName: "Funke Adebayo",
    menuChoice: "Truffle-Infused Wagyu Beef Tenderloin",
    date: "March 10, 2024",
    description:
      "The truffle aroma alone was worth the visit! Every bite was a journey.",
    likes: 56,
    isLiked: false,
    type: "food",
    rating: 5,
    duration: "2 hours",
    location: "Chef's Counter",
    subcategory: "Steak",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2081&q=80",
    customerName: "Emeka Nwankwo",
    menuChoice: "Wild Mushroom & Foie Gras Ravioli",
    date: "March 8, 2024",
    description:
      "The ravioli was a work of art. The flavors were perfectly balanced.",
    likes: 29,
    isLiked: false,
    type: "food",
    rating: 4,
    duration: "1.5 hours",
    location: "Garden View",
    subcategory: "Pasta",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80",
    customerName: "Bisi Williams",
    menuChoice: "Saffron-Infused Dover Sole Meunière",
    date: "March 5, 2024",
    description:
      "The tableside preparation was a wonderful experience. The sole was delicate and flavorful.",
    likes: 34,
    isLiked: false,
    type: "food",
    rating: 5,
    duration: "2 hours",
    location: "Main Dining",
    subcategory: "Seafood",
  },
];

// Drink experiences data matching the view_drinks_experience page
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
    type: "drink",
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
    type: "drink",
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
    type: "drink",
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
    type: "drink",
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
    type: "drink",
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
    type: "drink",
    rating: 5,
    glassware: "Tasting Glass",
    servingStyle: "Flight",
    flavorProfile: ["Smoky", "Umami", "Fruity"],
    ingredients: ["Hibiki", "Yamazaki", "Hakushu"],
    occasion: "Whisky Tasting",
  },
];

// Combined experiences
const allExperiences: Experience[] = [...foodExperiences, ...drinkExperiences];

type FilterType = "all" | "food" | "drink";
type SortType = "newest" | "popular" | "rating";

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [likedExperiences, setLikedExperiences] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();

  // Filter and sort experiences
  const filteredAndSortedExperiences = useMemo(() => {
    let filtered = allExperiences;

    // Apply filter
    if (filter !== "all") {
      filtered = filtered.filter((exp) => exp.type === filter);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exp) =>
          (exp.type === "food"
            ? exp.menuChoice.toLowerCase().includes(query)
            : exp.drinkName.toLowerCase().includes(query)) ||
          exp.customerName.toLowerCase().includes(query) ||
          exp.description.toLowerCase().includes(query)
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popular":
          return b.likes - a.likes;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filter, sort, searchQuery]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLiked = new Set(likedExperiences);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedExperiences(newLiked);
  };

  const viewExperience = (experience: Experience) => {
    if (experience.type === "food") {
      router.push(`/home/gallery/view_experience/${experience.id}`);
    } else {
      router.push(`/home/gallery/view_drinks_experience/${experience.id}`);
    }
  };

  const getStars = (rating: number = 5) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getExperienceTitle = (experience: Experience) => {
    return experience.type === "food"
      ? experience.menuChoice
      : experience.drinkName;
  };

  const getIcon = (type: "food" | "drink") => {
    return type === "food" ? <Utensils size={16} /> : <Wine size={16} />;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 bg-amber-400/5 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 bg-amber-600/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-3 sm:py-6">
        {/* Header with Logo and Navigation */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sm:mb-8 pt-2"
        >
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="5 Star Restaurant Logo"
                width={80}
                height={80}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span
                className={`text-amber-400 text-sm font-semibold ${cormorant.className}`}
              >
                5 Star Restaurant
              </span>
            </div>
          </Link>
        </motion.header>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4`}
          >
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Experience
            </span>
            <br />
            <span
              className={`text-white text-xl sm:text-3xl lg:text-4xl ${alex_brush.className}`}
            >
              Gallery
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base text-gray-300 max-w-md mx-auto leading-relaxed px-2 ${cormorant.className}`}
          >
            Discover unforgettable moments shared by our guests.
          </p>
        </motion.div>

        {/* Stats Bar - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
              <div>
                <div
                  className={`text-lg sm:text-xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {allExperiences.length}
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Total
                </div>
              </div>
              <div>
                <div
                  className={`text-lg sm:text-xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {foodExperiences.length}
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Food
                </div>
              </div>
              <div>
                <div
                  className={`text-lg sm:text-xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {drinkExperiences.length}
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Drinks
                </div>
              </div>
              <div>
                <div
                  className={`text-lg sm:text-xl font-bold text-amber-400 mb-1 ${playfair.className}`}
                >
                  {allExperiences.reduce((acc, exp) => acc + exp.likes, 0)}+
                </div>
                <div
                  className={`text-gray-300 text-xs sm:text-sm ${cormorant.className}`}
                >
                  Likes
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-gray-700 p-3 sm:p-4">
            {/* Search Bar */}
            <div className="relative mb-3 sm:mb-4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm"
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Filter Buttons */}
              <div className="flex flex-1 gap-2">
                {(
                  [
                    { key: "all", label: "All", icon: <Sparkles size={16} /> },
                    {
                      key: "food",
                      label: "Food",
                      icon: <Utensils size={16} />,
                    },
                    { key: "drink", label: "Drinks", icon: <Wine size={16} /> },
                  ] as const
                ).map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`flex items-center justify-center gap-2 flex-1 px-3 py-3 rounded-lg transition-all duration-300 text-sm ${
                      filter === key
                        ? "bg-amber-400 text-black font-semibold"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-3 text-gray-300 hover:bg-gray-700/50 transition-colors text-sm"
                >
                  <Filter size={16} />
                  <span>
                    {sort === "newest" && "Newest"}
                    {sort === "popular" && "Popular"}
                    {sort === "rating" && "Rated"}
                  </span>
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-20"
                    >
                      {(
                        [
                          {
                            key: "newest",
                            label: "Newest",
                            icon: <Calendar size={14} />,
                          },
                          {
                            key: "popular",
                            label: "Popular",
                            icon: <TrendingUp size={14} />,
                          },
                          {
                            key: "rating",
                            label: "Rated",
                            icon: <Sparkles size={14} />,
                          },
                        ] as const
                      ).map(({ key, label, icon }) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSort(key);
                            setShowFilters(false);
                          }}
                          className={`flex items-center gap-2 w-full px-3 py-3 text-left transition-colors text-sm ${
                            sort === key
                              ? "bg-amber-400 text-black"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4"
        >
          <p className="text-gray-400 text-sm">
            Showing {filteredAndSortedExperiences.length} of{" "}
            {allExperiences.length} experiences
          </p>
        </motion.div>

        {/* Gallery Grid - IMPROVED: Better spacing and larger cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8"
        >
          <AnimatePresence mode="wait">
            {filteredAndSortedExperiences.map((experience, index) => (
              <motion.div
                key={`${experience.type}-${experience.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:border-amber-400/30"
                onClick={() => viewExperience(experience)}
              >
                {/* Image - IMPROVED: Increased height */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={getExperienceTitle(experience)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {getIcon(experience.type)}
                    <span className="text-amber-400 text-xs font-medium capitalize">
                      {experience.type}
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={(e) =>
                      handleLike(`${experience.type}-${experience.id}`, e)
                    }
                    className="absolute top-3 right-3 p-2 bg-black/60 rounded-full backdrop-blur-sm hover:bg-amber-400/20 transition-colors duration-300"
                  >
                    <Heart
                      size={16}
                      className={`${
                        likedExperiences.has(
                          `${experience.type}-${experience.id}`
                        )
                          ? "text-red-500 fill-red-500"
                          : "text-white"
                      } transition-colors duration-300`}
                    />
                  </button>

                  {/* Rating */}
                  <div className="absolute top-12 left-3">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-amber-400 text-xs">
                        {getStars(experience.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Duration for Food */}
                  {experience.type === "food" && experience.duration && (
                    <div className="absolute top-12 right-3">
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Clock size={12} className="text-amber-400" />
                        <span className="text-amber-400 text-xs">
                          {experience.duration}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Area - IMPROVED: Better spacing and typography */}
                <div className="p-4 sm:p-5 space-y-3">
                  {/* Title */}
                  <h3
                    className={`text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight ${playfair.className}`}
                  >
                    {getExperienceTitle(experience)}
                  </h3>

                  {/* Customer and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400">
                      <User size={14} />
                      <span className={`text-sm ${cormorant.className}`}>
                        {experience.customerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={12} />
                      <span className="text-xs">{experience.date}</span>
                    </div>
                  </div>

                  {/* Description - IMPROVED: Better spacing and line height */}
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {experience.description}
                  </p>

                  {/* Engagement Stats - IMPROVED: Better spacing */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-600/50">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Heart size={14} />
                      <span className="text-sm font-medium">
                        {experience.likes} likes
                      </span>
                    </div>
                    <div className="text-amber-400 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      View Story →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Sparkles className="text-amber-400 mx-auto mb-4" size={40} />
            <h3 className={`text-xl text-amber-400 mb-2 ${playfair.className}`}>
              No experiences found
            </h3>
            <p className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        {/* CTA Section - IMPROVED: Better spacing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border border-amber-400/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-lg mx-auto">
            <h2
              className={`text-xl sm:text-2xl font-bold text-amber-400 mb-3 ${playfair.className}`}
            >
              Share Your Experience
            </h2>
            <p
              className={`text-gray-300 mb-4 text-sm sm:text-base ${cormorant.className}`}
            >
              Had an unforgettable experience? Share your story with our
              community.
            </p>
            <motion.a
              href="/home/gallery/upload"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-amber-300 transition-colors duration-300 text-sm sm:text-base"
            >
              <Sparkles size={16} />
              <span>Share Your Story</span>
            </motion.a>
          </div>
        </motion.section>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
