// components/LuxuryContact.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Sparkles } from "lucide-react";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Alex_Brush,
} from "next/font/google";

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
  weight: "400",
});

export default function LuxuryContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    guests: "",
    date: "",
    message: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      href: "#",
      followers: "45.2K",
    },
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      href: "#",
      followers: "28.7K",
    },
    {
      name: "X",
      icon: "M18.244 2H21.5l-7.37 8.43L22 22h-6.78l-5.33-7.09L4.68 22H1.42l7.88-9.01L2 2h6.92l4.77 6.34L18.24 2zM17 20h1.92L8.64 4H6.58L17 20z",
      href: "#",
      followers: "32.1K",
    },
    {
      name: "YouTube",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      href: "#",
      followers: "15.8K",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <Sparkles className="text-amber-400" size={24} />
            <span
              className={`text-amber-400 text-sm tracking-widest uppercase ${cormorant.className}`}
            >
              Get In Touch
            </span>
            <Sparkles className="text-amber-400" size={24} />
            <div className="w-12 h-px bg-gradient-to-r from-amber-500 to-transparent" />
          </div>
          <h1
            className={`text-4xl sm:text-5xl lg:text-8xl font-bold mb-4 lg:mb-6`}
          >
            <span
              className={`bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent ${playfair.className}`}
            >
              Contact
            </span>
            <br />
            <span
              className={`text-white text-3xl sm:text-4xl lg:text-7xl ${alex_brush.className}`}
            >
              Us
            </span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed ${cormorant.className}`}
          >
            Ready to create unforgettable memories? Our dedicated team is here
            to ensure your experience with us is nothing short of extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8"
          >
            <h2
              className={`text-3xl font-bold mb-2 text-amber-400 ${playfair.className}`}
            >
              Make a Reservation
            </h2>
            <p className={`text-gray-300 mb-8 ${cormorant.className}`}>
              Complete the form below and our reservations team will contact you
              within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                    placeholder="+234 812 345 6789"
                  />
                </div>

                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Special Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  >
                    <option value="">Select an occasion</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="birthday">Birthday</option>
                    <option value="business">Business Dinner</option>
                    <option value="celebration">Celebration</option>
                    <option value="proposal">Marriage Proposal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3-4">3-4 People</option>
                    <option value="5-6">5-6 People</option>
                    <option value="7+">7+ People</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-amber-400 mb-2 ${cormorant.className}`}
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-amber-400 mb-2 ${cormorant.className}`}
                >
                  Additional Requests
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 resize-none"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold py-4 px-8 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Send size={20} />
                <span>Submit Reservation Request</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-amber-900/20 to-amber-600/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-amber-400 mx-auto mb-4" size={48} />
                  <p className={`text-amber-400 ${playfair.className}`}>
                    Interactive Map
                  </p>
                  <p
                    className={`text-gray-300 text-sm mt-2 ${cormorant.className}`}
                  >
                    123 Luxury Avenue, Maitama, Abuja
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8">
              <h3
                className={`text-2xl font-bold mb-6 text-amber-400 ${playfair.className}`}
              >
                Visit Us
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-400/10 rounded-lg">
                    <MapPin className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold text-white mb-1 ${playfair.className}`}
                    >
                      Address
                    </h4>
                    <p className={`text-gray-300 ${cormorant.className}`}>
                      123 Luxury Avenue
                      <br />
                      Maitama
                      <br />
                      Abuja, Nigeria
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-400/10 rounded-lg">
                    <Phone className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold text-white mb-1 ${playfair.className}`}
                    >
                      Phone
                    </h4>
                    <a
                      href="tel:+2348123456789"
                      className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
                    >
                      +234 812 345 6789
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-400/10 rounded-lg">
                    <Mail className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold text-white mb-1 ${playfair.className}`}
                    >
                      Email
                    </h4>
                    <a
                      href="mailto:reservations@5starrestaurant.com"
                      className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
                    >
                      reservations@5starrestaurant.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-400/10 rounded-lg">
                    <Clock className="text-amber-400" size={24} />
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-semibold text-white mb-1 ${playfair.className}`}
                    >
                      Hours
                    </h4>
                    <div className={`text-gray-300 ${cormorant.className}`}>
                      <p className="mb-1">
                        <span className="text-amber-400">Dinner:</span> Mon -
                        Sun: 6:00 PM - 11:00 PM
                      </p>
                      <p>
                        <span className="text-amber-400">Lunch:</span> Fri -
                        Sun: 12:00 PM - 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4
                  className={`text-lg font-semibold mb-4 text-amber-400 ${playfair.className}`}
                >
                  Follow Our Journey
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 bg-black/50 rounded-xl border border-gray-700 hover:border-amber-400 transition-all duration-300 group text-center"
                      >
                        <svg
                          className="text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                          fontSize={12}
                        >
                          <path d={social.icon} />
                        </svg>

                        <p
                          className={`text-amber-400 text-xs ${cormorant.className}`}
                        >
                          {social.followers}
                        </p>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 text-amber-400 mb-4">
            <Sparkles size={24} />
            <span
              className={`text-sm tracking-widest uppercase ${cormorant.className}`}
            >
              For large events & private dining, please contact us at least 72
              hours in advance
            </span>
            <Sparkles size={24} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
