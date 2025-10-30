export interface DrinkPairing {
  name: string;
  type: string;
  pairing_notes: string;
}

export interface SideDish {
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: "Main Course";
  subcategory:
    | "Steak"
    | "Seafood"
    | "Poultry"
    | "Pasta"
    | "Lamb"
    | "Vegetarian"
    | "Japanese";
  content?: string;
  ingredients: string[];
  allergies: string[];
  dietary_restrictions: string[];
  preparation_time: number; // in minutes for timer function
  fun_fact: string;
  price: number; // in Naira
  recommended_drinks: DrinkPairing[];
  recommended_sides: SideDish[];
}

export const mainCourse: MenuItem[] = [
  {
    id: "1",
    title: "A5 Japanese Wagyu Ribeye Steak",
    excerpt:
      "Miyazaki A5 Wagyu ribeye with wasabi foam and seasonal vegetables",
    date: "May 15, 2025",
    image: "/images/maincourse_one.jpg",
    category: "Main Course",
    subcategory: "Steak",
    content:
      "The pinnacle of beef excellence - Miyazaki A5 Wagyu ribeye, known for its exceptional marbling and buttery texture. Cooked over binchotan charcoal at 800°F for the perfect sear. Served with delicate wasabi foam and seasonal market vegetables.",
    ingredients: [
      "A5 Miyazaki Wagyu",
      "Fresh wasabi",
      "Soy sauce",
      "Mirin",
      "Seasonal vegetables",
      "Sea salt",
    ],
    allergies: ["Soy"],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 25,
    fun_fact:
      "Miyazaki Wagyu has won the 'Wagyu Olympics' multiple times, awarded best beef in Japan",
    price: 185000,
    recommended_drinks: [
      {
        name: "Bordeaux, Château Lafite Rothschild",
        type: "Red Wine",
        pairing_notes: "The ultimate luxury pairing",
      },
    ],
    recommended_sides: [
      {
        name: "Truffle French Fries",
        price: 12000,
      },
    ],
  },
  {
    id: "2",
    title: "Butter-Poached Maine Lobster",
    excerpt:
      "Atlantic lobster poached in European butter, served with champagne beurre blanc",
    date: "May 15, 2025",
    image: "/images/maincourse_two.jpg",
    category: "Main Course",
    subcategory: "Seafood",
    content:
      "Succulent Maine lobster tail gently poached in rich European butter to perfection. Served with a delicate champagne beurre blanc sauce and sweet heirloom carrot puree. The lobster is cooked at precisely 140°F for 8 minutes to achieve the ideal texture.",
    ingredients: [
      "Maine lobster tail",
      "European butter",
      "Champagne",
      "Shallots",
      "Heirloom carrots",
      "Double cream",
      "Chives",
      "Lemon zest",
    ],
    allergies: ["Shellfish", "Dairy"],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 30,
    fun_fact:
      "Maine lobsters must shed their shells 25 times before reaching 1 pound in weight",
    price: 85000,
    recommended_drinks: [
      {
        name: "Montrachet Grand Cru",
        type: "White Wine",
        pairing_notes: "Buttery notes complement the poaching liquid",
      },
    ],
    recommended_sides: [
      {
        name: "Asparagus with Hollandaise",
        price: 8000,
      },
    ],
  },
  {
    id: "3",
    title: "Duck Confit with Blackberry Gastrique",
    excerpt:
      "48-hour cured duck leg confit with blackberry reduction and roasted fingerling potatoes",
    date: "May 15, 2025",
    image: "/images/maincourse_three.jpg",
    category: "Main Course",
    subcategory: "Poultry",
    content:
      "Traditional French duck confit prepared with a 48-hour curing process in sea salt and herbs, then slow-poached in duck fat until falling-off-the-bone tender. Served with a sweet-tart blackberry gastrique and crispy roasted fingerling potatoes.",
    ingredients: [
      "Duck leg",
      "Duck fat",
      "Blackberries",
      "Red wine vinegar",
      "Honey",
      "Fingerling potatoes",
      "Thyme",
      "Garlic",
    ],
    allergies: [],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 35,
    fun_fact:
      "Traditional duck confit was a preservation method - the meat can last up to 6 months when properly stored in its own fat",
    price: 65000,
    recommended_drinks: [
      {
        name: "Pinot Noir, Domaine de la Romanée-Conti",
        type: "Red Wine",
        pairing_notes: "Fruitiness complements the blackberry sauce",
      },
    ],
    recommended_sides: [
      {
        name: "Honey-Glazed Heirloom Carrots",
        price: 6000,
      },
    ],
  },
  {
    id: "4",
    title: "Wild Mushroom & Foie Gras Ravioli",
    excerpt:
      "Handmade pasta filled with duck foie gras and wild mushrooms in black truffle emulsion",
    date: "May 15, 2025",
    image: "/images/maincourse_four.jpg",
    category: "Main Course",
    subcategory: "Pasta",
    content:
      "Exquisite handmade pasta dough rested for 24 hours creates the perfect vessel for our rich filling of duck foie gras and wild porcini mushrooms. Tossed in a luxurious black truffle emulsion and finished with Parmigiano-Reggiano shavings.",
    ingredients: [
      "00 Flour",
      "Duck eggs",
      "Duck foie gras",
      "Porcini mushrooms",
      "Black truffle",
      "Truffle oil",
      "Parmesan cheese",
      "White wine",
    ],
    allergies: ["Gluten", "Eggs", "Dairy"],
    dietary_restrictions: [],
    preparation_time: 22,
    fun_fact:
      "Foie gras production dates back to ancient Egypt, where Egyptians discovered geese could be fattened by force-feeding",
    price: 75000,
    recommended_drinks: [
      {
        name: "Barbaresco DOCG",
        type: "Red Wine",
        pairing_notes: "Robust enough for the rich foie gras",
      },
    ],
    recommended_sides: [
      {
        name: "Arugula Salad",
        price: 7000,
      },
    ],
  },
  {
    id: "5",
    title: "Herb-Crusted Rack of Lamb",
    excerpt:
      "New Zealand spring lamb with Dijon mustard and herb crust, rosemary jus",
    date: "May 15, 2025",
    image: "/images/maincourse_five.png",
    category: "Main Course",
    subcategory: "Lamb",
    content:
      "Premium New Zealand spring lamb rack coated with Dijon mustard and a fragrant herb crust. Cooked to perfect medium-rare and rested for 10 minutes to seal in juices. Served with a rich rosemary red wine jus.",
    ingredients: [
      "Rack of lamb",
      "Dijon mustard",
      "Breadcrumbs",
      "Rosemary",
      "Thyme",
      "Garlic",
      "Red wine",
      "Lamb jus",
    ],
    allergies: ["Gluten"],
    dietary_restrictions: [],
    preparation_time: 28,
    fun_fact:
      "New Zealand lamb is grass-fed year-round, giving it a distinct flavor profile different from grain-fed lamb",
    price: 72000,
    recommended_drinks: [
      {
        name: "Château Margaux",
        type: "Red Wine",
        pairing_notes: "Elegant tannins complement the lamb",
      },
    ],
    recommended_sides: [
      {
        name: "Gratin Dauphinois",
        price: 9000,
      },
    ],
  },
  {
    id: "6",
    title: "Saffron-Infused Dover Sole Meunière",
    excerpt:
      "Whole Dover sole deboned tableside, with saffron brown butter and capers",
    date: "May 15, 2025",
    image: "/images/maincourse_six.jpg",
    category: "Main Course",
    subcategory: "Seafood",
    content:
      "The king of flatfish - whole Dover sole expertly prepared and deboned tableside using traditional French technique. Sautéed in saffron-infused brown butter with capers and finished with fresh lemon and parsley.",
    ingredients: [
      "Dover sole",
      "French butter",
      "Saffron threads",
      "Capers",
      "Lemon",
      "Parsley",
      "White wine",
    ],
    allergies: ["Fish", "Dairy"],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 20,
    fun_fact:
      "Dover sole is known as the 'king of flatfish' and can only be caught in the English Channel and North Sea",
    price: 68000,
    recommended_drinks: [
      {
        name: "Puligny-Montrachet",
        type: "White Wine",
        pairing_notes: "Citrus notes enhance the brown butter",
      },
    ],
    recommended_sides: [
      {
        name: "Haricots Verts Amandine",
        price: 8000,
      },
    ],
  },
  {
    id: "7",
    title: "Truffle-Infused Wagyu Beef Tenderloin",
    excerpt:
      "A5 Japanese Wagyu tenderloin with white truffle oil and Parmigiano-Reggiano",
    date: "May 15, 2025",
    image: "/images/maincourse_seven.jpg",
    category: "Main Course",
    subcategory: "Steak",
    content:
      "The finest A5 Japanese Wagyu tenderloin, featuring incredible marbling and buttery texture. Enhanced with white truffle oil and topped with fresh micro-arugula and Parmigiano-Reggiano shavings. Each bite melts in your mouth with unparalleled richness.",
    ingredients: [
      "A5 Japanese Wagyu tenderloin",
      "White truffle oil",
      "Micro-arugula",
      "Parmigiano-Reggiano",
      "Black lava salt",
      "Cracked black pepper",
      "Extra virgin olive oil",
    ],
    allergies: ["Dairy"],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 18,
    fun_fact:
      "Wagyu beef contains up to 300% more monounsaturated fat than regular beef, giving it its signature marbling",
    price: 165000,
    recommended_drinks: [
      {
        name: "Dom Pérignon Vintage Champagne",
        type: "Sparkling Wine",
        pairing_notes: "The bubbles cut through the richness of the Wagyu",
      },
    ],
    recommended_sides: [
      {
        name: "Saffron Risotto",
        price: 11000,
      },
    ],
  },
  {
    id: "8",
    title: "Japanese Kobe Beef Sukiyaki",
    excerpt: "Traditional Kobe beef sukiyaki with fresh vegetables and tofu",
    date: "May 15, 2025",
    image: "/images/maincourse_one.jpg", // Cycling back to first image
    category: "Main Course",
    subcategory: "Japanese",
    content:
      "Authentic Japanese sukiyaki featuring premium Kobe beef, slowly simmered with fresh vegetables, tofu, and shirataki noodles in a sweet-savory soy-based broth. Served with raw egg for dipping in the traditional style.",
    ingredients: [
      "Kobe beef slices",
      "Tofu",
      "Shirataki noodles",
      "Napa cabbage",
      "Green onions",
      "Shiitake mushrooms",
      "Soy sauce",
      "Mirin",
      "Sugar",
      "Raw egg",
    ],
    allergies: ["Soy", "Eggs"],
    dietary_restrictions: [],
    preparation_time: 32,
    fun_fact:
      "Kobe beef comes from Tajima strain Wagyu cattle raised in Japan's Hyōgo Prefecture under strict standards",
    price: 145000,
    recommended_drinks: [
      {
        name: "Japanese Sake - Dassai 45",
        type: "Sake",
        pairing_notes:
          "Traditional Japanese pairing that complements the sweet-savory broth",
      },
    ],
    recommended_sides: [
      {
        name: "Steamed Japanese Rice",
        price: 5000,
      },
    ],
  },
  {
    id: "9",
    title: "Herb-Roasted Organic Chicken",
    excerpt:
      "Free-range organic chicken with roasted root vegetables and natural jus",
    date: "May 15, 2025",
    image: "/images/maincourse_two.jpg", // Cycling to second image
    category: "Main Course",
    subcategory: "Poultry",
    content:
      "Perfectly roasted free-range organic chicken, brined for 24 hours and stuffed with fresh herbs. Served with seasonal roasted root vegetables and a natural chicken jus made from the roasting pan drippings.",
    ingredients: [
      "Organic free-range chicken",
      "Fresh rosemary",
      "Fresh thyme",
      "Garlic",
      "Lemon",
      "Carrots",
      "Parsnips",
      "Potatoes",
      "Chicken stock",
    ],
    allergies: [],
    dietary_restrictions: ["Gluten-free"],
    preparation_time: 45,
    fun_fact:
      "Organic free-range chickens have access to outdoor spaces and are fed organic feed, resulting in better flavor and texture",
    price: 48000,
    recommended_drinks: [
      {
        name: "Chardonnay, Meursault",
        type: "White Wine",
        pairing_notes: "Buttery notes complement the roasted chicken",
      },
    ],
    recommended_sides: [
      {
        name: "Garlic Mashed Potatoes",
        price: 6000,
      },
    ],
  },
  {
    id: "10",
    title: "Black Truffle Risotto",
    excerpt: "Arborio rice with fresh black truffles and Parmigiano-Reggiano",
    date: "May 15, 2025",
    image: "/images/maincourse_three.jpg", // Cycling to third image
    category: "Main Course",
    subcategory: "Vegetarian",
    content:
      "Creamy Arborio rice cooked slowly with white wine, shallots, and rich vegetable stock. Finished with generous shavings of fresh black truffles, Parmigiano-Reggiano, and a touch of butter for ultimate indulgence.",
    ingredients: [
      "Arborio rice",
      "Fresh black truffles",
      "Parmigiano-Reggiano",
      "White wine",
      "Shallots",
      "Vegetable stock",
      "Butter",
      "Olive oil",
    ],
    allergies: ["Dairy"],
    dietary_restrictions: ["Vegetarian"],
    preparation_time: 38,
    fun_fact:
      "Black truffles can sell for up to $1,000 per pound and are found using specially trained dogs or pigs",
    price: 95000,
    recommended_drinks: [
      {
        name: "Barolo DOCG",
        type: "Red Wine",
        pairing_notes: "Earthy notes complement the truffles perfectly",
      },
    ],
    recommended_sides: [
      {
        name: "Mixed Green Salad",
        price: 5500,
      },
    ],
  },
];
