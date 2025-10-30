// app/drinkmenu/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { drinks } from "@/app/menu/drinks";

export default function DrinkDetail() {
  const params = useParams();
  const router = useRouter();
  const [drink, setDrink] = useState<(typeof drinks)[0] | null>(null);

  useEffect(() => {
    const foundDrink = drinks.find((d) => d.id === params.id);
    setDrink(foundDrink || null);
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
      Wine: "#8B0000",
      Spirit: "#D4AF37",
      Beer: "#FFA500",
      Cocktail: "#E75480",
      Champagne: "#FFD700",
      Sake: "#F5F5DC",
      Digestif: "#8B4513",
      "Non-Alcoholic": "#00CED1",
    };
    return colors[category] || "#DDA629";
  };

  if (!drink) {
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
        className="fixed top-6 left-6 z-50 w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-[#DDA629] hover:text-black transition-all duration-300 text-xl font-bold font-poppins"
      >
        ←
      </motion.button>

      {/* Hero Section */}
      <div className="relative h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${drink.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-[#DDA629] mb-4 font-bebas"
          >
            {drink.name}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-white font-poppins">
            <span
              className="px-4 py-2 rounded-xl font-medium text-black"
              style={{ backgroundColor: getCategoryColor(drink.category) }}
            >
              {drink.category}
            </span>
            <span className="text-2xl font-bold">
              {formatPrice(drink.price)}
            </span>
            <span className="flex items-center space-x-2">
              <span>🍷</span>
              <span>{drink.alcohol_content}% ABV</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand and Origin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-[#DDA629]/10 to-transparent border-l-4 border-[#DDA629] pl-6 py-4 rounded-r-2xl"
            >
              <h3 className="text-white text-2xl font-bold mb-2 font-bebas">
                {drink.brand}
              </h3>
              <p className="text-gray-300 font-poppins">
                {drink.country_of_origin}
                {drink.region && ` • ${drink.region}`}
                {drink.vintage && ` • Vintage ${drink.vintage}`}
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-300 text-lg leading-relaxed font-poppins">
                {drink.description}
              </p>
            </motion.div>

            {/* Tasting Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                🎯 Tasting Notes
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-3 font-poppins">
                    Aroma
                  </h4>
                  <div className="space-y-2">
                    {drink.tasting_notes.aroma.map((note, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#DDA629] rounded-full" />
                        <span className="text-gray-300 text-sm font-poppins">
                          {note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-3 font-poppins">
                    Palate
                  </h4>
                  <div className="space-y-2">
                    {drink.tasting_notes.palate.map((note, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#DDA629] rounded-full" />
                        <span className="text-gray-300 text-sm font-poppins">
                          {note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-3 font-poppins">
                    Finish
                  </h4>
                  <div className="space-y-2">
                    {drink.tasting_notes.finish.map((note, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#DDA629] rounded-full" />
                        <span className="text-gray-300 text-sm font-poppins">
                          {note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-[#DDA629] font-bold text-sm font-poppins">
                    Body
                  </div>
                  <div className="text-white font-poppins">
                    {drink.tasting_notes.body}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[#DDA629] font-bold text-sm font-poppins">
                    Sweetness
                  </div>
                  <div className="text-white font-poppins">
                    {drink.tasting_notes.sweetness}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[#DDA629] font-bold text-sm font-poppins">
                    Acidity
                  </div>
                  <div className="text-white font-poppins">
                    {drink.tasting_notes.acidity}
                  </div>
                </div>
                {drink.tasting_notes.tannins && (
                  <div className="text-center">
                    <div className="text-[#DDA629] font-bold text-sm font-poppins">
                      Tannins
                    </div>
                    <div className="text-white font-poppins">
                      {drink.tasting_notes.tannins}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Ingredients */}
            {drink.ingredients && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                  🍋 Ingredients
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {drink.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-2 h-2 bg-[#DDA629] rounded-full" />
                      <span className="text-gray-300 font-poppins">
                        {ingredient}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Serving Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                🍷 Serving
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-2 font-poppins">
                    Temperature
                  </h4>
                  <p className="text-white font-poppins">
                    {drink.serving_temperature}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-2 font-poppins">
                    Glassware
                  </h4>
                  <p className="text-white font-poppins">{drink.glassware}</p>
                </div>

                <div>
                  <h4 className="text-[#DDA629] text-lg font-bold mb-2 font-poppins">
                    Serving Size
                  </h4>
                  <p className="text-white font-poppins">
                    {drink.serving_size.glass}ml glass
                    {drink.serving_size.bottle &&
                      ` • ${drink.serving_size.bottle}ml bottle`}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Food Pairings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                🍽️ Perfect Pairings
              </h3>
              <div className="space-y-4">
                {drink.food_pairings.map((pairing, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-l-4 border-[#DDA629] pl-4 py-2"
                  >
                    <h4 className="text-white font-bold text-lg mb-1 font-poppins">
                      {pairing.name}
                    </h4>
                    <p className="text-[#DDA629] text-sm font-medium mb-1 font-poppins">
                      {pairing.type}
                    </p>
                    <p className="text-gray-400 text-sm font-poppins">
                      {pairing.pairing_notes}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/30 rounded-2xl p-6"
            >
              <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                📊 Details
              </h3>

              <div className="space-y-3">
                {drink.aging && (
                  <div>
                    <h4 className="text-[#DDA629] text-sm font-bold font-poppins">
                      Aging
                    </h4>
                    <p className="text-white text-sm font-poppins">
                      {drink.aging}
                    </p>
                  </div>
                )}

                {drink.subcategory && (
                  <div>
                    <h4 className="text-[#DDA629] text-sm font-bold font-poppins">
                      Style
                    </h4>
                    <p className="text-white text-sm font-poppins">
                      {drink.subcategory}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Awards */}
            {drink.awards && drink.awards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-[#DDA629]/20 to-transparent rounded-2xl p-6 border border-[#DDA629]/30"
              >
                <h3 className="text-3xl font-bold text-white mb-6 font-bebas">
                  🏆 Awards
                </h3>
                <div className="space-y-2">
                  {drink.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-[#DDA629] text-lg">★</span>
                      <span className="text-white text-sm font-poppins">
                        {award}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-3 font-bebas">
                💫 Did You Know?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-poppins">
                {drink.fun_fact}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
