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
  ExternalLink,
} from "lucide-react";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
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
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-900/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-amber-400/5 rounded-full blur-xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 bg-amber-600/5 rounded-full blur-xl sm:blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
        {/* Top Section - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Luxury Logo */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Image
                  src="/images/logo.png"
                  alt="5 Star Restaurant"
                  width={60}
                  height={60}
                  className="w-12 h-12 sm:w-14 sm:h-14"
                />
                <div>
                  <h2
                    className={`text-xl sm:text-2xl font-bold text-amber-400 ${playfair.className}`}
                  >
                    5 STAR Restaurant
                  </h2>
                  <p
                    className={`text-gray-400 text-xs sm:text-sm ${cormorant.className}`}
                  >
                    Luxury Dining Experience
                  </p>
                </div>
              </div>
              <p
                className={`text-gray-300 leading-relaxed text-sm sm:text-base ${cormorant.className}`}
              >
                Where culinary artistry meets unparalleled luxury in an
                atmosphere of refined elegance and sophistication.
              </p>
            </div>

            {/* Awards & Recognition */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles size={14} className="sm:size-4" />
                <span className={`text-xs sm:text-sm ${cormorant.className}`}>
                  Michelin Star 2024
                </span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <Sparkles size={14} className="sm:size-4" />
                <span className={`text-xs sm:text-sm ${cormorant.className}`}>
                  World&apos;s 50 Best Restaurants
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-400 ${playfair.className}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <ChevronRight
                      size={14}
                      className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                    />
                    <span className={cormorant.className}>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Experiences - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-400 ${playfair.className}`}
            >
              Experiences
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {experiences.map((experience, index) => (
                <motion.li
                  key={experience.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    href={experience.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <ChevronRight
                      size={14}
                      className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                    />
                    <span className={cormorant.className}>
                      {experience.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h3
              className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-400 ${playfair.className}`}
            >
              Contact Info
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {/* Address */}
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin
                  className="text-amber-400 mt-0.5 sm:mt-1 flex-shrink-0"
                  size={16}
                />
                <div>
                  <p
                    className={`text-gray-300 text-sm sm:text-base ${cormorant.className}`}
                  >
                    123 Luxury Avenue
                    <br />
                    Maitama
                    <br />
                    Abuja, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="text-amber-400 flex-shrink-0" size={16} />
                <a
                  href="tel:+2348123456789"
                  className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base ${cormorant.className}`}
                >
                  +234 812 345 6789
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="text-amber-400 flex-shrink-0" size={16} />
                <a
                  href="mailto:reservations@5starrestaurant.com"
                  className={`text-gray-300 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base ${cormorant.className} break-all`}
                >
                  reservations@5starrestaurant.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2 sm:gap-3">
                <Clock
                  className="text-amber-400 mt-0.5 sm:mt-1 flex-shrink-0"
                  size={16}
                />
                <div>
                  <p
                    className={`text-gray-300 text-sm sm:text-base ${cormorant.className}`}
                  >
                    Mon - Sun: 6:00 PM - 11:00 PM
                    <br />
                    Lunch: Fri - Sun: 12:00 PM - 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media - Mobile Optimized */}
            <div className="mt-4 sm:mt-6">
              <h4
                className={`text-base sm:text-lg font-semibold mb-3 text-amber-400 ${playfair.className}`}
              >
                Follow Our Journey
              </h4>
              <div className="flex gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} border border-gray-700 hover:border-amber-400`}
                    aria-label={social.name}
                  >
                    <svg
                      className="text-amber-400"
                      viewBox="0 0 24 24"
                      width={14}
                      height={14}
                      fill="currentColor"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <h3
                className={`text-xl sm:text-2xl font-bold text-amber-400 mb-2 ${playfair.className}`}
              >
                Join Our Exclusive List
              </h3>
              <p
                className={`text-gray-300 text-sm sm:text-base ${cormorant.className} max-w-md mx-auto lg:mx-0`}
              >
                Be the first to know about seasonal menus, special events, and
                exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md lg:max-w-none">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm sm:text-base w-full"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-800 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left"
        >
          {/* Copyright and Credits */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <p
              className={`text-gray-400 text-xs sm:text-sm ${cormorant.className}`}
            >
              © {currentYear} 5 STAR Restaurant. All rights reserved. Crafted
              with excellence.
            </p>

            {/* EBCom Technologies Credit */}
            <div className="flex items-center justify-center lg:justify-start gap-1 text-gray-400">
              <span className={`text-xs ${cormorant.className}`}>Built by</span>
              <a
                href="https://ebcom.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors duration-300"
              >
                <span
                  className={`text-xs font-semibold ${cormorant.className}`}
                >
                  EBCom Technologies
                </span>
                <ExternalLink
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-end text-xs sm:text-sm">
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
