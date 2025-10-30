// components/PremiumMenuPage.tsx
"use client";

import { useState, useEffect } from "react";
import { mainCourse } from "./food";
import { drinks } from "./drinks";
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  Filter,
  Wine,
  Utensils,
  Sparkles,
  Crown,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Mail,
  Lock,
  Heart,
  Share2,
  Eye,
  EyeOff,
  Target,
  Timer,
  Award,
  ChefHat,
  Leaf,
  Wheat,
  Fish,
  Beef,
  Citrus,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Font classes
const fontClasses = {
  playfair: "font-playfair",
  alexBrush: "font-alexBrush",
  cormorant: "font-cormorant",
};

function PremiumMenuPage() {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price" | "name">("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showMembership, setShowMembership] = useState(false);
  const [showItemDetail, setShowItemDetail] = useState<any>(null);
  const [showWaitingPage, setShowWaitingPage] = useState(false);

  // Fixed filter and sort function
  const filteredItems = (activeTab === "food" ? mainCourse : drinks)
    .filter((item: any) => {
      const itemName = activeTab === "food" ? item.title : item.name;
      const itemDescription = item.excerpt || item.description;

      const matchesSearch =
        itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itemDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        (activeTab === "food"
          ? item.subcategory === selectedCategory
          : item.category === selectedCategory);

      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      const aName = activeTab === "food" ? a.title : a.name;
      const bName = activeTab === "food" ? b.title : b.name;

      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "name":
          return aName.localeCompare(bName);
        default:
          return 0;
      }
    });

  const categories = {
    food: [
      "all",
      "Steak",
      "Seafood",
      "Poultry",
      "Pasta",
      "Lamb",
      "Vegetarian",
      "Japanese",
    ],
    drinks: [
      "all",
      "Wine",
      "Champagne",
      "Sake",
      "Spirit",
      "Cocktail",
      "Non-Alcoholic",
      "Beer",
      "Digestif",
    ],
  };

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          type: activeTab,
          displayName: activeTab === "food" ? item.title : item.name,
        },
      ];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === id);
      if (!item) return prev;

      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    if (!tableNumber) {
      alert("Please enter your table number");
      return;
    }
    setShowWaitingPage(true);
  };

  if (showWaitingPage) {
    return <WaitingPage onBack={() => setShowWaitingPage(false)} />;
  }

  if (showMembership) {
    return <MembershipPage onBack={() => setShowMembership(false)} />;
  }

  if (showItemDetail) {
    return (
      <ItemDetailPage
        item={showItemDetail}
        type={activeTab}
        onBack={() => setShowItemDetail(null)}
        onAddToCart={addToCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/7 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Image
                  alt="5 Star Restaurant Logo"
                  width={70}
                  height={70}
                  src="/logo.png"
                />
              </Link>
            </div>

            <button
              onClick={() => setShowMembership(true)}
              className="bg-gold/20 hover:bg-gold/30 border border-gold/40 rounded-xl px-4 py-2 transition-all duration-300 group"
            >
              <span
                className={`${fontClasses.cormorant} text-gold text-sm font-semibold group-hover:scale-105 transition-transform`}
              >
                Join Club
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Island Cart */}
      {cart.length > 0 && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
            isCartExpanded ? "w-11/12 max-w-md" : "w-32"
          }`}
        >
          <div
            className={`bg-gray-900/95 backdrop-blur-xl border-2 ${
              isCartExpanded
                ? "border-gold/50 rounded-2xl"
                : "border-gold/30 rounded-full"
            } transition-all duration-500 overflow-hidden`}
          >
            {/* Collapsed State */}
            {!isCartExpanded && (
              <button
                onClick={() => setIsCartExpanded(true)}
                className="w-full p-3 flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-gold" />
                  <span className="text-white font-semibold text-sm">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="text-gold text-sm font-semibold">
                  ₦{totalAmount.toLocaleString()}
                </div>
              </button>
            )}

            {/* Expanded State */}
            {isCartExpanded && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`${fontClasses.playfair} text-lg text-gold`}>
                    Your Order
                  </h3>
                  <button
                    onClick={() => setIsCartExpanded(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>

                {/* Table Number */}
                <div className="mb-4">
                  <label
                    className={`${fontClasses.cormorant} block text-sm font-semibold text-gray-300 mb-2`}
                  >
                    Table Number
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                {/* Cart Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={item.image}
                          alt={item.displayName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`${fontClasses.cormorant} font-semibold text-white text-sm truncate`}
                          >
                            {item.displayName}
                          </h4>
                          <p className="text-gold text-xs">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 bg-gold text-black rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total and Actions */}
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`${fontClasses.cormorant} font-semibold`}>
                      Total
                    </span>
                    <span
                      className={`${fontClasses.playfair} text-lg text-gold font-semibold`}
                    >
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-gold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-gold/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Place Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 text-gold" />
              <span
                className={`${fontClasses.cormorant} text-gold text-sm font-semibold`}
              >
                Michelin Star Experience
              </span>
            </div>
            <h1 className={`${fontClasses.playfair} text-5xl md:text-6xl mb-4`}>
              Exquisite{" "}
              <span
                className={`${fontClasses.alexBrush} text-gold text-6xl md:text-7xl`}
              >
                Menu
              </span>
            </h1>
            <p
              className={`${fontClasses.cormorant} text-lg text-gray-300 max-w-2xl mx-auto`}
            >
              Discover culinary masterpieces crafted with passion, precision,
              and the finest ingredients
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-1 border border-gray-700">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("food")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === "food"
                      ? "bg-gold text-black shadow-lg shadow-gold/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Utensils className="w-5 h-5" />
                  <span className={`${fontClasses.cormorant} font-semibold`}>
                    Food
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("drinks")}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === "drinks"
                      ? "bg-gold text-black shadow-lg shadow-gold/20"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Wine className="w-5 h-5" />
                  <span className={`${fontClasses.cormorant} font-semibold`}>
                    Drinks
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                >
                  {categories[activeTab].map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="default">Sort by</option>
                  <option value="price">Price: Low to High</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: any) => (
              <MenuItemCard
                key={item.id}
                item={item}
                type={activeTab}
                onAddToCart={addToCart}
                onViewDetails={() => setShowItemDetail(item)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3
                className={`${fontClasses.playfair} text-2xl text-gray-300 mb-2`}
              >
                No items found
              </h3>
              <p className={`${fontClasses.cormorant} text-gray-400`}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add global styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap");

        :root {
          --gold: #d4af37;
          --gold-light: #f4e4a6;
          --gold-dark: #b8941f;
        }

        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        .font-alexBrush {
          font-family: "Alex Brush", cursive;
        }

        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
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

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--gold);
          border-radius: 3px;
        }

        /* Smooth transitions */
        * {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// Menu Item Card Component
function MenuItemCard({ item, type, onAddToCart, onViewDetails }: any) {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (category: string) => {
    const icons: any = {
      Steak: Beef,
      Seafood: Fish,
      Vegetarian: Leaf,
      Poultry: ChefHat,
      Wine: Wine,
      Champagne: Sparkles,
      Cocktail: Citrus,
      Beer: Wheat,
      Sake: Wine,
      Spirit: Award,
      "Non-Alcoholic": Leaf,
      Digestif: Award,
    };
    const IconComponent = icons[category] || Utensils;
    return <IconComponent className="w-4 h-4" />;
  };

  const itemName = type === "food" ? item.title : item.name;
  const itemCategory = type === "food" ? item.subcategory : item.category;

  return (
    <div
      className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gold/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={itemName}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/30">
          {getCategoryIcon(itemCategory)}
          <span className={`font-cormorant text-gold text-xs font-semibold`}>
            {itemCategory}
          </span>
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full shadow-lg">
          <span className={`font-cormorant font-bold text-sm`}>
            ₦{item.price.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div
          className={`absolute bottom-4 right-4 flex space-x-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors border border-white/20"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="bg-gold text-black p-2 rounded-full hover:bg-yellow-500 transition-colors shadow-lg shadow-gold/30"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`font-playfair text-xl font-semibold text-white flex-1 pr-2 leading-tight`}
          >
            {itemName}
          </h3>
          <div className="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className={`font-cormorant text-xs text-gray-300`}>4.8</span>
          </div>
        </div>

        <p
          className={`font-cormorant text-gray-300 text-sm mb-4 leading-relaxed`}
        >
          {item.excerpt || item.description}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-400">
            {type === "food" ? (
              <>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-cormorant">
                    {item.preparation_time}m
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Leaf className="w-4 h-4" />
                  <span className="font-cormorant">
                    {item.dietary_restrictions[0]}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-1">
                  <Wine className="w-4 h-4" />
                  <span className="font-cormorant">
                    {item.alcohol_content}%
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span className="font-cormorant">
                    {item.country_of_origin}
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onViewDetails}
            className={`font-cormorant text-gold hover:text-yellow-400 text-sm font-semibold transition-colors flex items-center space-x-1`}
          >
            <span>Details</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Item Detail Page Component
function ItemDetailPage({ item, type, onBack, onAddToCart }: any) {
  const itemName = type === "food" ? item.title : item.name;
  const itemDescription = type === "food" ? item.content : item.description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
              <span className="font-cormorant">Back to Menu</span>
            </button>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-gold text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <img
                src={item.image}
                alt={itemName}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className={`font-playfair text-3xl font-semibold mb-2`}>
                      {itemName}
                    </h1>
                    <p className={`font-cormorant text-gray-300 text-lg`}>
                      {item.excerpt || item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-playfair text-3xl text-gold font-bold mb-2`}
                    >
                      ₦{item.price.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1 justify-end">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`font-cormorant text-gray-300`}>
                        4.8 • 124 reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {type === "food" ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gold" />
                        <span className="font-cormorant">
                          {item.preparation_time} minutes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChefHat className="w-5 h-5 text-gold" />
                        <span className="font-cormorant">Chef's Special</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <Wine className="w-5 h-5 text-gold" />
                        <span className="font-cormorant">
                          {item.alcohol_content}% ABV
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-gold" />
                        <span className="font-cormorant">
                          {item.country_of_origin}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <p
                  className={`font-cormorant text-gray-300 leading-relaxed mb-6`}
                >
                  {itemDescription}
                </p>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className={`font-playfair text-xl font-semibold mb-3`}>
                    {type === "food" ? "Ingredients" : "Tasting Notes"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(type === "food"
                      ? item.ingredients
                      : Object.values(item.tasting_notes).flat()
                    )
                      .slice(0, 8)
                      .map((ingredient: any, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-700/50 px-3 py-1 rounded-full text-sm border border-gray-600"
                        >
                          {ingredient}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Dietary Info */}
                {type === "food" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className={`font-cormorant font-semibold mb-2`}>
                        Allergies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.allergies.map(
                          (allergy: string, index: number) => (
                            <span
                              key={index}
                              className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs border border-red-500/30"
                            >
                              {allergy}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-cormorant font-semibold mb-2`}>
                        Dietary
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.dietary_restrictions.map(
                          (restriction: string, index: number) => (
                            <span
                              key={index}
                              className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs border border-green-500/30"
                            >
                              {restriction}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommended Pairings */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <h3 className={`font-playfair text-xl font-semibold mb-4`}>
                  {type === "food" ? "Perfect Pairings" : "Food Pairings"}
                </h3>
                <div className="space-y-4">
                  {(type === "food"
                    ? item.recommended_drinks
                    : item.food_pairings
                  ).map((pairing: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50"
                    >
                      <Wine className="w-8 h-8 text-gold" />
                      <div className="flex-1">
                        <h4 className={`font-cormorant font-semibold`}>
                          {pairing.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{pairing.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="bg-gold/10 border border-gold/20 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className={`font-playfair text-gold font-semibold`}>
                    Did You Know?
                  </h3>
                </div>
                <p
                  className={`font-cormorant text-gold/90 text-sm leading-relaxed`}
                >
                  {item.fun_fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Membership Page Component
function MembershipPage({ onBack }: any) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle membership registration
    alert("Membership registration would be processed here!");
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
              <span className="font-cormorant">Back to Menu</span>
            </button>
            <div className={`font-alexBrush text-2xl text-gold`}>
              5-Star Restaurant
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-10">
        <div className="max-w-md mx-auto px-4">
          {/* Membership Card */}
          <div className="bg-gradient-to-br from-gold/20 to-yellow-600/10 rounded-3xl p-8 border border-gold/30 mb-8">
            <div className="text-center">
              <Crown className="w-16 h-16 text-gold mx-auto mb-4" />
              <h1 className={`font-playfair text-3xl font-semibold mb-2`}>
                5-Star Premium Membership
              </h1>
              <p className={`font-cormorant text-gray-300 mb-6`}>
                Join our exclusive membership for premium benefits and rewards
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-cormorant">10% off all orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-cormorant">Priority reservations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-cormorant">
                    Exclusive tasting events
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-cormorant">Birthday rewards</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50"
          >
            <h2
              className={`font-playfair text-2xl font-semibold mb-6 text-center`}
            >
              Join Now
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className={`font-cormorant block text-sm font-semibold text-gray-300 mb-2`}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`font-cormorant block text-sm font-semibold text-gray-300 mb-2`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`font-cormorant block text-sm font-semibold text-gray-300 mb-2`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className={`font-cormorant block text-sm font-semibold text-gray-300 mb-2`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-gold transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-gold transition-all duration-300 shadow-lg shadow-gold/20 mt-6"
              >
                <span className="font-cormorant">Become a Member</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

// Waiting Page Component
function WaitingPage({ onBack }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-8"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
          <span className="font-cormorant">Back to Menu</span>
        </button>

        <div className="text-center">
          <div className="w-32 h-32 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
            <Clock className="w-16 h-16 text-gold animate-pulse" />
          </div>

          <h1 className={`font-playfair text-4xl font-semibold mb-4`}>
            Order Confirmed!
          </h1>

          <p
            className={`font-cormorant text-xl text-gray-300 mb-8 max-w-md mx-auto`}
          >
            Your culinary experience is being prepared with care. Estimated
            time: 15-25 minutes
          </p>

          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h2 className={`font-playfair text-2xl font-semibold mb-6`}>
              Pass the Time with Our Mini Game
            </h2>
            <p className={`font-cormorant text-gray-300 mb-8`}>
              Score high and earn discounts on your next visit!
            </p>

            <GameComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

// Game Component (Separated as requested)
function GameComponent() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const startGame = () => {
    setGameActive(true);
    setTimeLeft(30);
    setScore(0);
    generateTargets();
  };

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      });
    }
    setTargets(newTargets);
  };

  const hitTarget = (id: number) => {
    if (!gameActive) return;

    setScore((prev) => prev + 10);
    setTargets((prev) => prev.filter((target) => target.id !== id));

    setTimeout(() => {
      if (gameActive) {
        setTargets((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          },
        ]);
      }
    }, 500);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  const discount = score >= 100 ? 15 : score >= 50 ? 10 : score >= 25 ? 5 : 0;

  return (
    <div className="text-center">
      {!gameActive ? (
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-gold to-yellow-600 text-black px-8 py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-gold transition-all duration-300 shadow-lg shadow-gold/20"
        >
          <span className={`font-cormorant text-lg`}>
            {timeLeft === 30 ? "Start Game" : "Play Again"}
          </span>
        </button>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <div className="text-left">
              <div className="text-2xl text-gold font-bold">{score}</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-red-400 font-bold">{timeLeft}s</div>
              <div className="text-sm text-gray-400">Time</div>
            </div>
          </div>

          <div className="relative h-64 bg-gray-900 rounded-xl border-2 border-gold/30 cursor-crosshair">
            {targets.map((target) => (
              <button
                key={target.id}
                className="absolute w-8 h-8 bg-red-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse hover:scale-110 transition-transform shadow-lg shadow-red-500/30"
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                onClick={() => hitTarget(target.id)}
              >
                <Target className="w-4 h-4 text-white mx-auto" />
              </button>
            ))}
          </div>
        </div>
      )}

      {discount > 0 && (
        <div className="mt-6 p-4 bg-gold/20 border border-gold/40 rounded-xl">
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="w-6 h-6 text-gold" />
            <span className={`font-cormorant font-semibold text-gold`}>
              You earned {discount}% off your next visit!
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PremiumMenuPage;
