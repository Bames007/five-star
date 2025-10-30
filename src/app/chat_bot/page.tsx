// components/LuxuryChatBot.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Wine,
  Sparkles,
  Clock,
  User,
} from "lucide-react";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Alex_Brush,
} from "next/font/google";
import Image from "next/image";
import { mainCourse, MenuItem } from "../menu/food";
import { drinks, Drink } from "../menu/drinks";

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

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?:
    | "recommendation"
    | "question"
    | "general"
    | "menu_item"
    | "drink_item"
    | "comparison";
  data?: MenuItem | Drink | any;
}

interface UserSession {
  name: string;
  preferences: {
    dietary: string[];
    allergies: string[];
    priceRange: "budget" | "moderate" | "luxury" | "any";
    favoriteCategories: string[];
  };
}

export default function LuxuryChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageIdCounter = useRef(0);

  // Generate unique message IDs
  const generateMessageId = () => {
    messageIdCounter.current += 1;
    return `msg-${Date.now()}-${messageIdCounter.current}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (!userSession?.name) {
        setMessages([
          {
            id: generateMessageId(),
            text: "Welcome to 5 STAR Restaurant! I'm **Maître d'AI**, your personal culinary assistant. To make your experience more personal, may I have your name?",
            sender: "bot",
            timestamp: new Date(),
            type: "general",
          },
        ]);
      }
    }
  }, [isOpen, messages.length, userSession]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const findMostExpensiveItem = (): MenuItem => {
    return mainCourse.reduce(
      (max, item) => (item.price > max.price ? item : max),
      mainCourse[0]
    );
  };

  const findCheapestItem = (): MenuItem => {
    return mainCourse.reduce(
      (min, item) => (item.price < min.price ? item : min),
      mainCourse[0]
    );
  };

  const findMostExpensiveDrink = (): Drink => {
    return drinks.reduce(
      (max, drink) => (drink.price > max.price ? drink : max),
      drinks[0]
    );
  };

  const findCheapestDrink = (): Drink => {
    return drinks.reduce(
      (min, drink) => (drink.price < min.price ? drink : min),
      drinks[0]
    );
  };

  const findItemsByCategory = (category: string): MenuItem[] => {
    return mainCourse.filter(
      (item) =>
        item.subcategory.toLowerCase().includes(category.toLowerCase()) ||
        item.title.toLowerCase().includes(category.toLowerCase())
    );
  };

  const findDrinksByCategory = (category: string): Drink[] => {
    return drinks.filter(
      (drink) =>
        drink.category.toLowerCase().includes(category.toLowerCase()) ||
        drink.subcategory.toLowerCase().includes(category.toLowerCase()) ||
        drink.name.toLowerCase().includes(category.toLowerCase())
    );
  };

  const findPerfectPairings = (menuItem: MenuItem): Drink[] => {
    return drinks.filter((drink) =>
      menuItem.recommended_drinks.some(
        (rec) =>
          rec.name.toLowerCase().includes(drink.name.toLowerCase()) ||
          rec.type.toLowerCase().includes(drink.subcategory.toLowerCase())
      )
    );
  };

  const getCompatibleSides = (menuItem: MenuItem) => {
    return menuItem.recommended_sides;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Check if we're waiting for user's name
    if (
      !userSession?.name &&
      messages.some((msg) => msg.text.includes("may I have your name"))
    ) {
      const userName = inputMessage.trim();
      setUserSession({
        name: userName,
        preferences: {
          dietary: [],
          allergies: [],
          priceRange: "any",
          favoriteCategories: [],
        },
      });

      const welcomeMessage: Message = {
        id: generateMessageId(),
        text: `Wonderful to meet you, ${userName}! I'm Maître d'AI, your culinary guide. I can help you discover exquisite dishes, find perfect pairings, and answer any questions about our menu. What would you like to explore today?`,
        sender: "bot",
        timestamp: new Date(),
        type: "general",
      };

      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          text: inputMessage,
          sender: "user",
          timestamp: new Date(),
        },
        welcomeMessage,
      ]);
      setInputMessage("");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      generateBotResponse(inputMessage.toLowerCase());
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string) => {
    let response: Message[] = [];
    const userName = userSession?.name || "there";

    // Price-related queries
    if (
      userInput.includes("most expensive") ||
      userInput.includes("highest price")
    ) {
      if (
        userInput.includes("drink") ||
        userInput.includes("wine") ||
        userInput.includes("beverage")
      ) {
        const expensiveDrink = findMostExpensiveDrink();
        response = [
          {
            id: generateMessageId(),
            text: `Our most exclusive beverage is the **${
              expensiveDrink.name
            }** - ${formatPrice(expensiveDrink.price)}`,
            sender: "bot",
            timestamp: new Date(),
            type: "drink_item",
            data: expensiveDrink,
          },
        ];
      } else {
        const expensiveItem = findMostExpensiveItem();
        response = [
          {
            id: generateMessageId(),
            text: `Our crown jewel is the **${
              expensiveItem.title
            }** - ${formatPrice(expensiveItem.price)}`,
            sender: "bot",
            timestamp: new Date(),
            type: "menu_item",
            data: expensiveItem,
          },
        ];
      }
    }
    // Cheapest items
    else if (
      userInput.includes("cheapest") ||
      userInput.includes("lowest price") ||
      userInput.includes("most affordable")
    ) {
      if (
        userInput.includes("drink") ||
        userInput.includes("wine") ||
        userInput.includes("beverage")
      ) {
        const cheapDrink = findCheapestDrink();
        response = [
          {
            id: generateMessageId(),
            text: `Our most accessible beverage is **${
              cheapDrink.name
            }** - ${formatPrice(cheapDrink.price)}`,
            sender: "bot",
            timestamp: new Date(),
            type: "drink_item",
            data: cheapDrink,
          },
        ];
      } else {
        const cheapItem = findCheapestItem();
        response = [
          {
            id: generateMessageId(),
            text: `Our most affordable luxury is **${
              cheapItem.title
            }** - ${formatPrice(cheapItem.price)}`,
            sender: "bot",
            timestamp: new Date(),
            type: "menu_item",
            data: cheapItem,
          },
        ];
      }
    }
    // Side dishes
    else if (
      userInput.includes("side") ||
      userInput.includes("go with") ||
      userInput.includes("accompaniment")
    ) {
      const dishMatch = mainCourse.find(
        (item) =>
          userInput.includes(item.title.toLowerCase().split(" ")[0]) ||
          item.title
            .toLowerCase()
            .split(" ")
            .some((word) => userInput.includes(word))
      );

      if (dishMatch) {
        const sides = getCompatibleSides(dishMatch);
        response = [
          {
            id: generateMessageId(),
            text: `For **${dishMatch.title}**, I recommend these exquisite accompaniments:`,
            sender: "bot",
            timestamp: new Date(),
            type: "comparison",
            data: { dish: dishMatch, sides },
          },
        ];
      } else {
        response = [
          {
            id: generateMessageId(),
            text: `I'd be delighted to suggest side dishes! Which main course are you considering? For example, you could ask "What sides go with the Wagyu steak?"`,
            sender: "bot",
            timestamp: new Date(),
            type: "general",
          },
        ];
      }
    }
    // Drink pairings
    else if (
      userInput.includes("pair") ||
      userInput.includes("wine with") ||
      userInput.includes("drink with")
    ) {
      const dishMatch = mainCourse.find(
        (item) =>
          userInput.includes(item.title.toLowerCase().split(" ")[0]) ||
          item.title
            .toLowerCase()
            .split(" ")
            .some((word) => userInput.includes(word))
      );

      if (dishMatch) {
        const pairings = findPerfectPairings(dishMatch);
        response = [
          {
            id: generateMessageId(),
            text: `Perfect pairings for **${dishMatch.title}**:`,
            sender: "bot",
            timestamp: new Date(),
            type: "comparison",
            data: { dish: dishMatch, pairings },
          },
        ];
      } else {
        response = [
          {
            id: generateMessageId(),
            text: `I'd love to suggest the perfect beverage pairing! Which dish are you considering? Try "What drinks pair with the lobster?"`,
            sender: "bot",
            timestamp: new Date(),
            type: "general",
          },
        ];
      }
    }
    // Category-based recommendations
    else if (
      userInput.includes("steak") ||
      userInput.includes("beef") ||
      userInput.includes("wagyu")
    ) {
      const steakItems = findItemsByCategory("steak");
      response = createMenuItemsResponse(
        steakItems,
        "Our premium steak selection:"
      );
    } else if (
      userInput.includes("seafood") ||
      userInput.includes("fish") ||
      userInput.includes("lobster")
    ) {
      const seafoodItems = findItemsByCategory("seafood");
      response = createMenuItemsResponse(
        seafoodItems,
        "Ocean-to-table excellence:"
      );
    } else if (
      userInput.includes("wine") ||
      userInput.includes("red wine") ||
      userInput.includes("white wine")
    ) {
      const wineDrinks = findDrinksByCategory("wine");
      response = createDrinksResponse(
        wineDrinks,
        "Our curated wine collection:"
      );
    } else if (
      userInput.includes("cocktail") ||
      userInput.includes("martini") ||
      userInput.includes("mojito")
    ) {
      const cocktailDrinks = findDrinksByCategory("cocktail");
      response = createDrinksResponse(
        cocktailDrinks,
        "Artisanal cocktail creations:"
      );
    }
    // Greetings
    else if (
      userInput.includes("hello") ||
      userInput.includes("hi") ||
      userInput.includes("hey")
    ) {
      response = [
        {
          id: generateMessageId(),
          text: `Hello${
            userName !== "there" ? `, ${userName}` : ""
          }! I'm Maître d'AI, your guide to culinary excellence at 5 STAR Restaurant. How may I assist your dining journey today?`,
          sender: "bot",
          timestamp: new Date(),
          type: "general",
        },
      ];
    }
    // Thank you
    else if (userInput.includes("thank") || userInput.includes("thanks")) {
      response = [
        {
          id: generateMessageId(),
          text: `The pleasure is mine${
            userName !== "there" ? `, ${userName}` : ""
          }! Is there anything else you'd like to know about our culinary offerings?`,
          sender: "bot",
          timestamp: new Date(),
          type: "general",
        },
      ];
    }
    // Default response
    else {
      response = [
        {
          id: generateMessageId(),
          text: `I'd be delighted to help you explore our offerings! You can ask me about:\n\n• **Price ranges** - "most expensive dish" or "cheapest option"\n• **Pairings** - "what drinks go with steak?"\n• **Sides** - "what sides for the lobster?"\n• **Categories** - "show me seafood" or "wine selection"\n• **Specific items** - "tell me about the Wagyu"\n\nWhat would you like to discover?`,
          sender: "bot",
          timestamp: new Date(),
          type: "general",
        },
      ];
    }

    setMessages((prev) => [...prev, ...response]);
  };

  const createMenuItemsResponse = (
    items: MenuItem[],
    introText: string
  ): Message[] => {
    const response: Message[] = [
      {
        id: generateMessageId(),
        text: introText,
        sender: "bot",
        timestamp: new Date(),
        type: "general",
      },
    ];

    items.forEach((item) => {
      response.push({
        id: generateMessageId(),
        text: "",
        sender: "bot",
        timestamp: new Date(),
        type: "menu_item",
        data: item,
      });
    });

    return response;
  };

  const createDrinksResponse = (
    drinks: Drink[],
    introText: string
  ): Message[] => {
    const response: Message[] = [
      {
        id: generateMessageId(),
        text: introText,
        sender: "bot",
        timestamp: new Date(),
        type: "general",
      },
    ];

    drinks.forEach((drink) => {
      response.push({
        id: generateMessageId(),
        text: "",
        sender: "bot",
        timestamp: new Date(),
        type: "drink_item",
        data: drink,
      });
    });

    return response;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Most expensive dish",
    "Cheapest option",
    "Steak recommendations",
    "Wine pairings",
    "Seafood menu",
    "Cocktail selection",
  ];

  const renderMenuItem = (item: MenuItem) => (
    <div className="bg-black/50 rounded-xl p-4 border border-amber-400/20 mb-3">
      <div className="flex gap-4 mb-3">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4
              className={`text-amber-400 font-bold text-sm ${playfair.className}`}
            >
              {item.title}
            </h4>
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-amber-400" />
              <span className="text-amber-400 text-xs">
                {item.preparation_time}m
              </span>
            </div>
          </div>
          <p
            className={`text-gray-300 text-xs leading-tight mb-2 ${cormorant.className}`}
          >
            {item.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold text-sm">
              {formatPrice(item.price)}
            </span>
            <span className="px-2 py-1 bg-amber-400/10 text-amber-400 rounded-full text-[10px] border border-amber-400/20">
              {item.subcategory}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-amber-400 mb-1">Recommended Sides</p>
          <div className="space-y-1">
            {item.recommended_sides.map((side, idx) => (
              <div
                key={`${item.id}-side-${idx}`}
                className="flex justify-between text-gray-300"
              >
                <span>{side.name}</span>
                <span>{formatPrice(side.price)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-amber-400 mb-1">Perfect Pairings</p>
          <div className="space-y-1">
            {item.recommended_drinks.map((drink, idx) => (
              <div
                key={`${item.id}-drink-${idx}`}
                className="text-gray-300 text-[11px] leading-tight"
              >
                {drink.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDrinkItem = (drink: Drink) => (
    <div className="bg-black/50 rounded-xl p-4 border border-amber-400/20 mb-3">
      <div className="flex gap-4 mb-3">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center">
          <Wine size={20} className="text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4
              className={`text-amber-400 font-bold text-sm ${playfair.className}`}
            >
              {drink.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs">
                {drink.alcohol_content}%
              </span>
            </div>
          </div>
          <p
            className={`text-gray-300 text-xs leading-tight mb-2 ${cormorant.className}`}
          >
            {drink.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold text-sm">
              {formatPrice(drink.price)}
            </span>
            <div className="flex gap-1">
              <span className="px-2 py-1 bg-amber-400/10 text-amber-400 rounded-full text-[10px] border border-amber-400/20">
                {drink.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs space-y-2">
        <div>
          <p className="text-amber-400 mb-1">Tasting Notes</p>
          <p className="text-gray-300">
            {drink.tasting_notes.aroma.slice(0, 3).join(", ")}
          </p>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Body: {drink.tasting_notes.body}</span>
          <span>Sweetness: {drink.tasting_notes.sweetness}</span>
        </div>
      </div>
    </div>
  );

  const renderComparison = (data: any) => {
    if (data.sides) {
      return (
        <div className="bg-black/50 rounded-xl p-4 border border-amber-400/20">
          <h4
            className={`text-amber-400 font-bold text-sm mb-3 ${playfair.className}`}
          >
            Perfect sides for {data.dish.title}
          </h4>
          <div className="space-y-2">
            {data.sides.map((side: any, idx: number) => (
              <div
                key={`${data.dish.id}-side-${idx}`}
                className="flex justify-between items-center p-2 bg-gray-800/50 rounded-lg"
              >
                <span className="text-gray-300 text-sm">{side.name}</span>
                <span className="text-amber-400 font-bold text-sm">
                  {formatPrice(side.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (data.pairings) {
      return (
        <div className="bg-black/50 rounded-xl p-4 border border-amber-400/20">
          <h4
            className={`text-amber-400 font-bold text-sm mb-3 ${playfair.className}`}
          >
            Expert pairings for {data.dish.title}
          </h4>
          <div className="space-y-3">
            {data.pairings.slice(0, 3).map((drink: Drink, idx: number) => (
              <div
                key={`${data.dish.id}-pairing-${idx}`}
                className="p-2 bg-gray-800/50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-amber-400 text-sm font-semibold">
                    {drink.name}
                  </span>
                  <span className="text-amber-400 text-sm">
                    {formatPrice(drink.price)}
                  </span>
                </div>
                <p className="text-gray-300 text-xs">{drink.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {/* Chat Bot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-amber-400 text-black rounded-full shadow-2xl flex items-center justify-center group border-2 border-amber-300 hover:border-amber-200 transition-all duration-300"
      >
        <MessageCircle
          size={24}
          className="group-hover:scale-110 transition-transform duration-300"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-20 right-4 left-4 sm:right-8 sm:left-auto sm:w-96 h-[600px] max-h-[80vh] bg-gradient-to-br from-gray-900 to-black border-2 border-amber-400/30 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 border-b border-amber-400/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                        <Sparkles size={20} className="text-black" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
                    </div>
                    <div>
                      <h3
                        className={`text-white font-bold ${playfair.className}`}
                      >
                        Maître d'AI
                      </h3>
                      <p
                        className={`text-amber-400 text-xs ${cormorant.className}`}
                      >
                        Your Culinary Assistant
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-300"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-black">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                        <Sparkles size={12} className="text-black" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-amber-400 text-black rounded-br-none"
                          : "bg-gray-800/80 text-white rounded-bl-none border border-amber-400/20"
                      }`}
                    >
                      {message.type === "menu_item" && message.data ? (
                        renderMenuItem(message.data)
                      ) : message.type === "drink_item" && message.data ? (
                        renderDrinkItem(message.data)
                      ) : message.type === "comparison" && message.data ? (
                        renderComparison(message.data)
                      ) : (
                        // Regular text message
                        <p
                          className={`text-sm leading-relaxed whitespace-pre-line ${cormorant.className}`}
                        >
                          {message.text}
                        </p>
                      )}

                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-black/60"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                        <User size={12} className="text-black" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-2">
                      <Sparkles size={12} className="text-black" />
                    </div>
                    <div className="bg-gray-800/80 text-white rounded-2xl rounded-bl-none p-3 border border-amber-400/20">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="border-t border-amber-400/20 p-3 bg-gray-900/50">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={`quick-${index}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setInputMessage(question);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="px-3 py-1.5 bg-amber-400/10 text-amber-400 rounded-full text-xs border border-amber-400/20 hover:bg-amber-400/20 transition-colors duration-300"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      userSession?.name
                        ? `Ask anything, ${userSession.name}...`
                        : "Type your name to begin..."
                    }
                    className="flex-1 bg-gray-800 border border-amber-400/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="w-12 h-12 bg-amber-400 text-black rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-300 transition-colors duration-300"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
