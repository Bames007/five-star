// app/gallery/upload/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Camera,
  User,
  Utensils,
  Calendar,
  MessageCircle,
  X,
} from "lucide-react";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function UploadExperience() {
  const [formData, setFormData] = useState({
    customerName: "",
    menuChoice: "",
    date: "",
    description: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuOptions = [
    "A5 Japanese Wagyu Ribeye Steak",
    "Butter-Poached Maine Lobster",
    "Duck Confit with Blackberry Gastrique",
    "Wild Mushroom & Foie Gras Ravioli",
    "Herb-Crusted Rack of Lamb",
    "Saffron-Infused Dover Sole Meunière",
    "Truffle-Infused Wagyu Beef Tenderloin",
    "Japanese Kobe Beef Sukiyaki",
    "Herb-Roasted Organic Chicken",
    "Black Truffle Risotto",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      customerName: "",
      menuChoice: "",
      date: "",
      description: "",
      image: null,
    });
    setPreviewUrl(null);
    setIsSubmitting(false);

    // Show success message (you can replace this with a toast)
    alert(
      "Thank you for sharing your experience! Your submission is under review."
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen bg-black text-white py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={24} />
            <span
              className={`text-amber-400 text-sm tracking-widest uppercase ${cormorant.className}`}
            >
              Share Your Experience
            </span>
            <Sparkles className="text-amber-400" size={24} />
            <div className="w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>

          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 ${playfair.className}`}
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Share Your
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl">Story</span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed ${cormorant.className}`}
          >
            Help us celebrate culinary excellence by sharing your memorable
            dining experience. Your story inspires others to create their own
            unforgettable moments.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label
                className={`block text-amber-400 mb-4 text-lg ${playfair.className}`}
              >
                Your Food Photo
              </label>

              {previewUrl ? (
                <div className="relative">
                  <Image
                    width={800}
                    height={800}
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-2xl border-2 border-amber-400/30"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-400/30 rounded-2xl p-12 text-center cursor-pointer hover:border-amber-400/50 transition-colors duration-300"
                >
                  <Camera className="text-amber-400 mx-auto mb-4" size={48} />
                  <p
                    className={`text-amber-400 text-lg mb-2 ${playfair.className}`}
                  >
                    Click to Upload Your Photo
                  </p>
                  <p className={`text-gray-400 ${cormorant.className}`}>
                    Share a high-quality photo of your dining experience
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Customer Name */}
            <div>
              <label
                className={`block text-amber-400 mb-3 ${playfair.className}`}
              >
                <User className="inline mr-2" size={18} />
                Your Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Menu Choice */}
            <div>
              <label
                className={`block text-amber-400 mb-3 ${playfair.className}`}
              >
                <Utensils className="inline mr-2" size={18} />
                What Did You Enjoy?
              </label>
              <select
                name="menuChoice"
                value={formData.menuChoice}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors duration-300"
              >
                <option value="">Select your menu choice</option>
                {menuOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                className={`block text-amber-400 mb-3 ${playfair.className}`}
              >
                <Calendar className="inline mr-2" size={18} />
                Date of Visit
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            {/* Description */}
            <div>
              <label
                className={`block text-amber-400 mb-3 ${playfair.className}`}
              >
                <MessageCircle className="inline mr-2" size={18} />
                Your Experience
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                placeholder="Tell us about your experience... What made it special? How was the service? Any memorable moments?"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full py-4 px-8 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sharing Your Experience...</span>
                </>
              ) : (
                <>
                  <Upload size={20} />
                  <span>Share My Experience</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-amber-400/5 to-amber-600/5 border border-amber-400/20 rounded-2xl p-6">
            <h3
              className={`text-amber-400 text-lg font-semibold mb-3 ${playfair.className}`}
            >
              📸 Photo Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-amber-400">High Quality</strong>
                <p className={cormorant.className}>
                  Clear, well-lit photos work best
                </p>
              </div>
              <div>
                <strong className="text-amber-400">Food Focused</strong>
                <p className={cormorant.className}>
                  Showcase the beautiful dishes
                </p>
              </div>
              <div>
                <strong className="text-amber-400">Your Story</strong>
                <p className={cormorant.className}>
                  Share what made it special
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
