// app/food/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { mainCourse } from "@/app/menu/food";
import {
  ChevronLeft,
  Clock,
  Utensils,
  Flame,
  Fish,
  Carrot,
  Wheat,
  Sparkles,
  Wine,
  ChefHat,
  Star,
  Award,
  Info,
} from "lucide-react";

export default function FoodDetail() {
  const params = useParams();
  const router = useRouter();
  const [food, setFood] = useState<(typeof mainCourse)[0] | null>(null);

  useEffect(() => {
    const foundFood = mainCourse.find((f) => f.id === params.id);
    setFood(foundFood || null);
  }, [params.id]);

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
      Steak: <Flame size={20} />,
      Seafood: <Fish size={20} />,
      Poultry: <Utensils size={20} />,
      Pasta: <Wheat size={20} />,
      Lamb: <Sparkles size={20} />,
      Vegetarian: <Carrot size={20} />,
      Japanese: <Sparkles size={20} />,
    };
    return icons[category] || <Utensils size={20} />;
  };

  if (!food) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-[#DDA629] hover:text-black transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Hero Section */}
      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${food.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[#DDA629] mb-4"
          >
            {food.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-white">
            <span
              className="px-4 py-2 rounded-xl font-medium text-black flex items-center space-x-2"
              style={{ backgroundColor: getCategoryColor(food.subcategory) }}
            >
              {getCategoryIcon(food.subcategory)}
              <span>{food.subcategory}</span>
            </span>
            <span className="text-2xl font-bold">
              {formatPrice(food.price)}
            </span>
            <span className="flex items-center space-x-2 bg-black/80 px-4 py-2 rounded-xl backdrop-blur-sm">
              <Clock size={20} />
              <span>{food.preparation_time} minutes</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                {food.content}
              </p>
            </motion.div>

            {/* Chef's Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#DDA629]/10 to-transparent border-l-4 border-[#DDA629] pl-6 py-4 rounded-r-2xl"
            >
              <h3 className="text-[#DDA629] text-2xl font-bold mb-3 flex items-center space-x-2">
                <ChefHat size={24} />
                <span>Chef&apos;s Note</span>
              </h3>
              <p className="text-gray-300">{food.fun_fact}</p>
            </motion.div>

            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Utensils size={28} />
                <span>Ingredients</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {food.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-2 h-2 bg-[#DDA629] rounded-full" />
                    <span className="text-gray-300">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Perfect Pairings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Wine size={28} />
                <span>Perfect Pairings</span>
              </h3>
              <div className="space-y-4">
                {food.recommended_drinks.map((drink, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="border-l-4 border-[#DDA629] pl-4 py-2"
                  >
                    <h4 className="text-white font-bold text-lg mb-1">
                      {drink.name}
                    </h4>
                    <p className="text-[#DDA629] text-sm font-medium mb-1">
                      {drink.type}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {drink.pairing_notes}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Sides */}
            {food.recommended_sides.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800/30 rounded-2xl p-6"
              >
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Sparkles size={28} />
                  <span>Recommended Sides</span>
                </h3>
                <div className="space-y-3">
                  {food.recommended_sides.map((side, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex justify-between items-center bg-gray-800/30 border border-gray-700 p-4 rounded-2xl hover:border-[#DDA629] transition-all duration-300"
                    >
                      <span className="text-white font-medium">
                        {side.name}
                      </span>
                      <span className="text-[#DDA629] font-bold text-lg">
                        {formatPrice(side.price)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Dietary Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Info size={28} />
                <span>Dietary Information</span>
              </h3>
              <div className="space-y-4">
                {food.allergies.length > 0 && (
                  <div>
                    <h4 className="text-red-400 text-lg font-bold mb-3 flex items-center space-x-2">
                      <span>⚠️</span>
                      <span>Allergens</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {food.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="text-sm bg-red-500/20 text-red-300 px-4 py-2 rounded-xl border border-red-500/30"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {food.dietary_restrictions.length > 0 && (
                  <div>
                    <h4 className="text-green-400 text-lg font-bold mb-3 flex items-center space-x-2">
                      <span>🌱</span>
                      <span>Dietary</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {food.dietary_restrictions.map((restriction, index) => (
                        <span
                          key={index}
                          className="text-sm bg-green-500/20 text-green-300 px-4 py-2 rounded-xl border border-green-500/30"
                        >
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Preparation Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-[#DDA629]/20 to-transparent rounded-2xl p-6 border border-[#DDA629]/30"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Clock size={24} />
                <span>Preparation</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Preparation Time</span>
                  <span className="text-[#DDA629] font-bold">
                    {food.preparation_time} minutes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Difficulty</span>
                  <span className="text-[#DDA629] font-bold">
                    Chef&apos;s Special
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Serving Size</span>
                  <span className="text-[#DDA629] font-bold">1 Person</span>
                </div>
              </div>
            </motion.div>

            {/* Chef's Signature */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
                <Award size={24} />
                <span>Chef&apos;s Signature</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This dish is prepared with utmost care and attention to detail
                by our executive chef. Each ingredient is meticulously selected
                to ensure the perfect balance of flavors and textures.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Cooking Method Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800/30 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
            <Flame size={28} />
            <span>Cooking Method</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DDA629] rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="text-black" size={24} />
              </div>
              <h4 className="text-[#DDA629] font-bold mb-2">Preparation</h4>
              <p className="text-gray-300 text-sm">
                Meticulous preparation of all ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DDA629] rounded-full flex items-center justify-center mx-auto mb-3">
                <Flame className="text-black" size={24} />
              </div>
              <h4 className="text-[#DDA629] font-bold mb-2">Cooking</h4>
              <p className="text-gray-300 text-sm">
                Expert temperature control and timing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DDA629] rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="text-black" size={24} />
              </div>
              <h4 className="text-[#DDA629] font-bold mb-2">Plating</h4>
              <p className="text-gray-300 text-sm">
                Artistic presentation with attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DDA629] rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="text-black" size={24} />
              </div>
              <h4 className="text-[#DDA629] font-bold mb-2">Serving</h4>
              <p className="text-gray-300 text-sm">
                Served at perfect temperature with care
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
