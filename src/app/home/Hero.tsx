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
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

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

  // Prevent hydration mismatch by rendering nothing on initial server render
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-gold">Loading...</div>
      </div>
    );
  }

  const handleReserveTable = () => {
    // You can add reservation logic here
    console.log("Reserve table clicked");
    // Or navigate to reservation page
    // router.push("/reservation");
  };

  // const handleExploreMenu = () => {
  //   router.push("/menu");
  // };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Refined Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -right-24 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute w-80 h-80 -bottom-40 -left-20 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-16 transition-all duration-1000 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Prestige Indicator - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex items-center gap-4 mb-6 lg:mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent max-w-24"></div>
              <span className="text-gold text-sm font-medium tracking-widest uppercase whitespace-nowrap">
                MICHELIN STAR EXPERIENCE
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent max-w-24"></div>
            </div>

            {/* Mobile Prestige Indicator */}
            <div className="lg:hidden text-center mb-4">
              <span className="text-gold text-xs font-medium tracking-widest uppercase">
                MICHELIN STAR EXPERIENCE
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className={`block ${playfair.className}`}>5 STAR</span>
                <span
                  className={`block text-gold mt-1 lg:mt-2 ${alexBrush.className} text-3xl sm:text-4xl lg:text-6xl`}
                >
                  Restaurant
                </span>
              </h1>

              {/* Heading Underline */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="h-0.5 bg-gold flex-1 max-w-8 lg:max-w-24 rounded"></div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                <div className="h-0.5 bg-gold flex-1 max-w-8 lg:max-w-24 rounded"></div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-2 text-center lg:text-left">
              <p
                className={`text-lg sm:text-xl lg:text-2xl text-white/90 ${cormorant.className} font-light`}
              >
                Exquisite culinary artistry meets
              </p>
              <p
                className={`text-xl sm:text-2xl lg:text-3xl text-gold ${cormorant.className} font-semibold`}
              >
                unparalleled luxury dining
              </p>
            </div>

            {/* Description */}
            <p
              className={`text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl text-center lg:text-left ${cormorant.className}`}
            >
              Experience world-class cuisine crafted by award-winning chefs in
              an atmosphere of refined elegance. Every detail is meticulously
              designed for an unforgettable dining experience.
            </p>

            {/* CTA Buttons - Equal Width with Enhanced Hover Effects */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full max-w-md mx-auto lg:mx-0">
              <button
                onClick={handleReserveTable}
                className="flex-1 px-6 py-4 bg-gold text-black font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/40 hover:bg-white min-h-[56px] relative overflow-hidden group"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
                  Reserve Your Table
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <Link href="/menu" passHref className="flex-1">
                <button className="w-full px-6 py-4 border-2 border-white/40 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-gold hover:text-gold bg-white/5 backdrop-blur-sm min-h-[56px] relative overflow-hidden group">
                  <span className="relative z-10 transition-all duration-300">
                    Explore Our Menu
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Enhanced Features Grid with Beautiful Hover Effects */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 pt-6 lg:pt-8">
              <FeatureCard
                icon={<Award className="w-6 h-6 lg:w-8 lg:h-8" />}
                title="Michelin Star"
                description="Award-winning Excellence"
                playfair={playfair}
                cormorant={cormorant}
              />
              <FeatureCard
                icon={<Wine className="w-6 h-6 lg:w-8 lg:h-8" />}
                title="Fine Wines"
                description="Premium Selection"
                playfair={playfair}
                cormorant={cormorant}
              />
              <FeatureCard
                icon={<ChefHat className="w-6 h-6 lg:w-8 lg:h-8" />}
                title="Master Chef"
                description="Expert Craft"
                playfair={playfair}
                cormorant={cormorant}
              />
            </div>
          </div>

          {/* Right Column - Image with Enhanced Hover Effects */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <Image
                height={1200}
                width={1200}
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Luxury dining at 5 Star Restaurant"
                className="w-full h-64 sm:h-80 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 group-hover:opacity-50 transition-opacity duration-700"></div>

              {/* Enhanced Image Badge */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-black/80 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-gold/30 flex items-center gap-2 animate-float group-hover:scale-110 group-hover:border-gold/60 transition-all duration-300">
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

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-3 text-white/60 text-sm tracking-widest uppercase">
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent rounded-full animate-bounce"></div>
        <span>Scroll to Discover</span>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
        <div className="w-px h-6 bg-gradient-to-b from-gold to-transparent rounded-full animate-bounce"></div>
        <span>Scroll</span>
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
      `}</style>
    </div>
  );
}

// Enhanced Feature Card Component with Beautiful Animations
const FeatureCard = ({
  icon,
  title,
  description,
  playfair,
  cormorant,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  playfair: NextFontWithVariable;
  cormorant: NextFontWithVariable;
}) => (
  <div className="group p-4 lg:p-6 bg-gradient-to-br from-white/5 via-white/3 to-gold/8 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/20 hover:border-gold/40 relative overflow-hidden">
    {/* Animated background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Subtle shine effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

    <div className="relative z-10 flex flex-col items-center text-center space-y-2 lg:space-y-3">
      {/* Enhanced Icon Container */}
      <div className="p-3 lg:p-4 bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 rounded-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-gold/20 group-hover:to-gold/10 group-hover:border-gold/40 group-hover:scale-110 group-hover:rotate-3">
        <div className="text-gold transition-all duration-500 group-hover:scale-110">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-500 group-hover:translate-y-1">
        <h3
          className={`font-bold text-white text-sm lg:text-lg mb-1 transition-all duration-500 group-hover:text-gold ${playfair.className}`}
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
