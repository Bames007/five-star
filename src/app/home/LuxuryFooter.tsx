// components/LuxuryFooter.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
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

export default function LuxuryFooter() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { name: "Our Story", href: "/about" },
    { name: "Menus", href: "/menus" },
    { name: "Experiences", href: "/experiences" },
    { name: "Private Dining", href: "/private-dining" },
    { name: "Wine Cellar", href: "/wine" },
  ];

  const experiences = [
    { name: "Chef's Table", href: "/chefs-table" },
    { name: "Wine Tasting", href: "/wine-tasting" },
    { name: "Mixology Class", href: "/mixology" },
    { name: "Private Events", href: "/events" },
    { name: "Seasonal Menus", href: "/seasonal" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      href: "#",
      color: "hover:text-pink-400",
    },
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "X",
      icon: "M18.244 2H21.5l-7.37 8.43L22 22h-6.78l-5.33-7.09L4.68 22H1.42l7.88-9.01L2 2h6.92l4.77 6.34L18.24 2zM17 20h1.92L8.64 4H6.58L17 20z",
      href: "#",
      color: "hover:text-sky-400",
    },
    {
      name: "YouTube",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      href: "#",
      color: "hover:text-red-400",
    },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-900/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Luxury Logo */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  alt="5 Star Restaurant Logo"
                  width={70}
                  height={70}
                  src="/logo.png"
                />
              </div>
              <p
                className={`text-gray-300 leading-relaxed ${cormorant.className}`}
              >
                Where culinary artistry meets unparalleled luxury in an
                atmosphere of refined elegance and sophistication.
              </p>
            </div>

            {/* Awards & Recognition */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles size={16} />
                <span className={`text-sm ${cormorant.className}`}>
                  Michelin Star 2024
                </span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles size={16} />
                <span className={`text-sm ${cormorant.className}`}>
                  World&apos;s 50 Best Restaurants
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className={`text-xl font-bold mb-6 text-amber-400 ${playfair.className}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 group"
                  >
                    <ChevronRight
                      size={16}
                      className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className={cormorant.className}>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className={`text-xl font-bold mb-6 text-amber-400 ${playfair.className}`}
            >
              Experiences
            </h3>
            <ul className="space-y-3">
              {experiences.map((experience, index) => (
                <motion.li
                  key={experience.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a
                    href={experience.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 group"
                  >
                    <ChevronRight
                      size={16}
                      className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className={cormorant.className}>
                      {experience.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3
              className={`text-xl font-bold mb-6 text-amber-400 ${playfair.className}`}
            >
              Contact Info
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="text-amber-400 mt-1 flex-shrink-0"
                  size={18}
                />
                <div>
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
              <div className="flex items-center gap-3">
                <Phone className="text-amber-400 flex-shrink-0" size={18} />
                <a
                  href="tel:+2348123456789"
                  className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
                >
                  +234 812 345 6789
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="text-amber-400 flex-shrink-0" size={18} />
                <a
                  href="mailto:reservations@5starrestaurant.com"
                  className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
                >
                  reservations@5starrestaurant.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock
                  className="text-amber-400 mt-1 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className={`text-gray-300 ${cormorant.className}`}>
                    Mon - Sun: 6:00 PM - 11:00 PM
                    <br />
                    Lunch: Fri - Sun: 12:00 PM - 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4
                className={`text-lg font-semibold mb-4 text-amber-400 ${playfair.className}`}
              >
                Follow Our Journey
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  // const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} border border-gray-700 hover:border-amber-400`}
                    >
                      <svg
                        className="text-amber-400 group-hover:scale-110 transition-transform duration-300"
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="currentColor"
                        // fontSize={12}
                      >
                        <path d={social.icon} />
                      </svg>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className={`text-2xl font-bold text-amber-400 mb-2 ${playfair.className}`}
              >
                Join Our Exclusive List
              </h3>
              <p className={`text-gray-300 ${cormorant.className}`}>
                Be the first to know about seasonal menus, special events, and
                exclusive offers.
              </p>
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          <p className={`text-gray-400 text-sm ${cormorant.className}`}>
            © {currentYear} 5 STAR Restaurant. All rights reserved. Crafted with
            excellence.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="/privacy"
              className={`text-gray-400 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={`text-gray-400 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
            >
              Terms of Service
            </a>
            <a
              href="/sitemap"
              className={`text-gray-400 hover:text-amber-400 transition-colors duration-300 ${cormorant.className}`}
            >
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
