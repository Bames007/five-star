// components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Playfair_Display,
  Alex_Brush,
  Cormorant_Garamond,
} from "next/font/google";
import { Award, ChefHat, Wine } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Luxury font configurations
const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function HeroPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleReserveTable = () => {
    console.log("Reserve table clicked");
  };

  // Prevent hydration mismatch by rendering nothing on initial server render
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -right-24 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute w-80 h-80 -bottom-40 -left-20 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Header with Logo */}
      <header className="relative z-30 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-start items-center py-4 lg:py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="5 Star Restaurant Logo"
                  width={80}
                  height={80}
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  priority
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              {/* Logo Text - Hidden on mobile, visible on larger screens */}
              <div className="ml-3 lg:ml-4 hidden sm:block">
                <span
                  className={`text-gold text-lg lg:text-xl font-bold ${playfair.className}`}
                >
                  5 STAR
                </span>
                <span
                  className={`text-white text-sm lg:text-base block ${alexBrush.className}`}
                >
                  Restaurant
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div
        className={`relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 transition-all duration-1000 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-4 lg:space-y-8 order-2 lg:order-1">
            {/* Prestige Indicator - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex items-center gap-4 mb-4 lg:mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent max-w-24"></div>
              <span className="text-gold text-sm font-medium tracking-widest uppercase whitespace-nowrap">
                MICHELIN STAR EXPERIENCE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent max-w-24"></div>
            </div>

            {/* Mobile Prestige Indicator */}
            <div className="lg:hidden text-center mb-3">
              <span className="text-gold text-xs font-medium tracking-widest uppercase">
                MICHELIN STAR EXPERIENCE
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 lg:space-y-4 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold leading-tight">
                <span className={`block ${playfair.className}`}>5 STAR</span>
                <span
                  className={`block text-gold mt-1 lg:mt-2 ${alexBrush.className} text-2xl sm:text-3xl lg:text-6xl`}
                >
                  Restaurant
                </span>
              </h1>

              {/* Heading Underline */}
              <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3">
                <div className="h-0.5 bg-gold flex-1 max-w-6 lg:max-w-24 rounded"></div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                <div className="h-0.5 bg-gold flex-1 max-w-6 lg:max-w-24 rounded"></div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-1 lg:space-y-2 text-center lg:text-left">
              <p
                className={`text-base sm:text-lg lg:text-2xl text-white/90 ${cormorant.className} font-light`}
              >
                Exquisite culinary artistry meets
              </p>
              <p
                className={`text-lg sm:text-xl lg:text-3xl text-gold ${cormorant.className} font-semibold`}
              >
                unparalleled luxury dining
              </p>
            </div>

            {/* Description */}
            <p
              className={`text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl text-center lg:text-left ${cormorant.className}`}
            >
              Experience world-class cuisine crafted by award-winning chefs in
              an atmosphere of refined elegance. Every detail is meticulously
              designed for an unforgettable dining experience.
            </p>

            {/* CTA Buttons - Optimized for Mobile */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 w-full max-w-md mx-auto lg:mx-0">
              <button
                onClick={handleReserveTable}
                className="flex-1 px-4 py-3 lg:px-6 lg:py-4 bg-gold text-black font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-xl lg:hover:shadow-2xl hover:shadow-gold/40 hover:bg-white min-h-[48px] lg:min-h-[56px] relative overflow-hidden group"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:scale-105 text-sm lg:text-base">
                  Reserve Your Table
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <Link href="/menu" passHref className="flex-1">
                <button className="w-full px-4 py-3 lg:px-6 lg:py-4 border-2 border-white/40 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-lg lg:hover:shadow-xl hover:border-gold hover:text-gold bg-white/5 backdrop-blur-sm min-h-[48px] lg:min-h-[56px] relative overflow-hidden group">
                  <span className="relative z-10 transition-all duration-300 text-sm lg:text-base">
                    Explore Our Menu
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Enhanced Features Grid - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 pt-4 lg:pt-8">
              <FeatureCard
                icon={<Award className="w-5 h-5 lg:w-8 lg:h-8" />}
                title="Michelin Star"
                description="Award-winning Excellence"
              />
              <FeatureCard
                icon={<Wine className="w-5 h-5 lg:w-8 lg:h-8" />}
                title="Fine Wines"
                description="Premium Selection"
              />
              <FeatureCard
                icon={<ChefHat className="w-5 h-5 lg:w-8 lg:h-8" />}
                title="Master Chef"
                description="Expert Craft"
              />
            </div>
          </div>

          {/* Right Column - Image with Enhanced Hover Effects */}
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl group cursor-pointer">
              <Image
                height={600}
                width={600}
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Luxury dining at 5 Star Restaurant"
                className="w-full h-48 sm:h-64 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 group-hover:opacity-50 transition-opacity duration-700"></div>

              {/* Enhanced Image Badge */}
              <div className="absolute top-3 right-3 lg:top-6 lg:right-6 bg-black/80 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-full border border-gold/30 flex items-center gap-1 lg:gap-2 animate-float group-hover:scale-110 group-hover:border-gold/60 transition-all duration-300">
                <span className="text-sm lg:text-lg">⭐</span>
                <span className="text-xs lg:text-sm font-medium text-white whitespace-nowrap">
                  Best Fine Dining 2024
                </span>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Fixed positioning for mobile */}
      <div className="fixed lg:absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
        <div className="w-px h-6 bg-gradient-to-b from-gold to-transparent rounded-full animate-bounce"></div>
        <span className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          Scroll
        </span>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        :root {
          --gold: #d4af37;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(212, 175, 55, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(212, 175, 55, 0.03) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }

        .text-gold {
          color: var(--gold);
        }

        .bg-gold {
          background-color: var(--gold);
        }

        .border-gold {
          border-color: var(--gold);
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Enhanced glow effects */
        .hover-glow:hover {
          box-shadow: 0 10px 25px rgba(221, 166, 41, 0.4);
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

// Enhanced Feature Card Component with Mobile Optimizations
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="group p-3 lg:p-6 bg-gradient-to-br from-white/5 via-white/3 to-gold/8 backdrop-blur-sm border border-white/10 rounded-lg lg:rounded-xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-lg lg:hover:shadow-2xl hover:shadow-gold/20 hover:border-gold/40 relative overflow-hidden">
    {/* Animated background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Subtle shine effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

    <div className="relative z-10 flex flex-col items-center text-center space-y-1 lg:space-y-3">
      {/* Enhanced Icon Container */}
      <div className="p-2 lg:p-4 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-lg lg:rounded-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-gold/20 group-hover:to-gold/10 group-hover:border-gold/40 group-hover:scale-110 group-hover:rotate-3">
        <div className="text-gold transition-all duration-500 group-hover:scale-110">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-500 group-hover:translate-y-1">
        <h3
          className={`font-bold text-white text-xs lg:text-lg mb-1 transition-all duration-500 group-hover:text-gold ${playfair.className}`}
        >
          {title}
        </h3>
        <p
          className={`text-white/70 text-xs lg:text-sm font-light leading-tight transition-all duration-500 group-hover:text-white/90 ${cormorant.className}`}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
);
