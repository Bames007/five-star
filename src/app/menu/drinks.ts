export interface DrinkPairing {
  name: string;
  type: string;
  pairing_notes: string;
}

export interface TastingNotes {
  aroma: string[];
  palate: string[];
  finish: string[];
  body: "Light" | "Medium" | "Full";
  sweetness: "Dry" | "Off-Dry" | "Medium" | "Sweet" | "Very Sweet";
  acidity: "Low" | "Medium" | "High";
  tannins?: "Low" | "Medium" | "High";
  bitterness?: "Low" | "Medium" | "High";
}

export interface Drink {
  id: string;
  name: string;
  brand: string;
  category:
    | "Wine"
    | "Beer"
    | "Spirit"
    | "Cocktail"
    | "Non-Alcoholic"
    | "Sake"
    | "Champagne"
    | "Digestif";
  subcategory:
    | "Red Wine"
    | "White Wine"
    | "Rosé"
    | "Sparkling Wine"
    | "Dessert Wine"
    | "Craft Beer"
    | "Lager"
    | "IPA"
    | "Stout"
    | "Wheat Beer"
    | "Sour Beer"
    | "Whiskey"
    | "Vodka"
    | "Gin"
    | "Trappist Beer"
    | "Rum"
    | "Tequila"
    | "Cognac"
    | "Brandy"
    | "Classic Cocktail"
    | "Signature Cocktail"
    | "Martini"
    | "Highball"
    | "Juice"
    | "Soda"
    | "Tea"
    | "Coffee"
    | "Mocktail"
    | "Junmai"
    | "Honjozo"
    | "Ginjo"
    | "Daiginjo"
    | "Brut"
    | "Extra Brut"
    | "Sec"
    | "Demi-Sec"
    | "Amaro"
    | "Liqueur"
    | "Port"
    | "Sherry";
  description: string;
  excerpt: string;
  date: string;
  image: string;
  price: number; // per bottle or per glass
  serving_size: {
    glass: number; // in ml
    bottle?: number; // in ml, if applicable
  };
  alcohol_content: number; // ABV percentage
  country_of_origin: string;
  region?: string; // Specific region like Bordeaux, Scotland, etc.
  vintage?: number; // For wines and some spirits
  aging?: string; // Aging process description
  tasting_notes: TastingNotes;
  ingredients?: string[]; // For cocktails and mixed drinks
  allergens: string[];
  dietary_restrictions: string[];
  serving_temperature: string; // Recommended serving temperature
  glassware: string; // Recommended glass type
  fun_fact: string;
  food_pairings: DrinkPairing[];
  awards?: string[]; // Awards and recognition
}

export const drinks: Drink[] = [
  {
    id: "d1",
    name: "Château Lafite Rothschild",
    brand: "Château Lafite Rothschild",
    category: "Wine",
    subcategory: "Red Wine",
    description:
      "First growth Bordeaux from Pauillac, known for its elegance, complexity and aging potential. A blend of Cabernet Sauvignon, Merlot, Cabernet Franc, and Petit Verdot.",
    excerpt: "Premier Grand Cru Classé from Pauillac, Bordeaux",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop",
    price: 450000,
    serving_size: {
      glass: 150,
      bottle: 750,
    },
    alcohol_content: 13.5,
    country_of_origin: "France",
    region: "Pauillac, Bordeaux",
    vintage: 2018,
    aging: "Aged 18-20 months in 100% new French oak barrels",
    tasting_notes: {
      aroma: ["Blackcurrant", "Cedar", "Graphite", "Tobacco", "Violet"],
      palate: ["Black fruits", "Pencil shavings", "Fine tannins", "Minerality"],
      finish: ["Long", "Elegant", "Persistent"],
      body: "Full",
      sweetness: "Dry",
      acidity: "Medium",
      tannins: "High",
    },
    allergens: ["Sulfites"],
    dietary_restrictions: ["Vegetarian", "Vegan"],
    serving_temperature: "16-18°C",
    glassware: "Bordeaux wine glass",
    fun_fact:
      "Château Lafite Rothschild was owned by the same family for centuries until purchased by Baron James de Rothschild in 1868",
    food_pairings: [
      {
        name: "A5 Japanese Wagyu Ribeye Steak",
        type: "Steak",
        pairing_notes: "The wine's tannins cut through the fat of the Wagyu",
      },
    ],
    awards: ["100 points - Robert Parker", "Premier Grand Cru Classé 1855"],
  },
  {
    id: "d2",
    name: "Montrachet Grand Cru",
    brand: "Domaine de la Romanée-Conti",
    category: "Wine",
    subcategory: "White Wine",
    description:
      "The most famous white Burgundy from the Montrachet vineyard, producing rich, complex Chardonnay with incredible aging potential.",
    excerpt: "Legendary white Burgundy from the Côte de Beaune",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
    price: 320000,
    serving_size: {
      glass: 150,
      bottle: 750,
    },
    alcohol_content: 13.8,
    country_of_origin: "France",
    region: "Puligny-Montrachet, Burgundy",
    vintage: 2019,
    aging: "Aged 12 months in French oak barrels, 50% new",
    tasting_notes: {
      aroma: [
        "Buttered toast",
        "Hazelnut",
        "White flowers",
        "Minerality",
        "Citrus",
      ],
      palate: [
        "Rich",
        "Creamy",
        "Concentrated",
        "Balanced acidity",
        "Oak spice",
      ],
      finish: ["Exceptionally long", "Layered", "Complex"],
      body: "Full",
      sweetness: "Dry",
      acidity: "High",
    },
    allergens: ["Sulfites"],
    dietary_restrictions: ["Vegetarian"],
    serving_temperature: "12-14°C",
    glassware: "Burgundy white wine glass",
    fun_fact:
      "Montrachet is often called the 'greatest dry white wine in the world' and commands prices higher than most red Burgundies",
    food_pairings: [
      {
        name: "Butter-Poached Maine Lobster",
        type: "Seafood",
        pairing_notes: "Buttery notes complement the lobster preparation",
      },
    ],
  },
  {
    id: "d3",
    name: "Dom Pérignon Vintage Champagne",
    brand: "Moët & Chandon",
    category: "Champagne",
    subcategory: "Brut",
    description:
      "Prestige cuvée champagne that is only produced in exceptional vintages. A blend of Chardonnay and Pinot Noir aged for at least 7 years.",
    excerpt: "Iconic vintage Champagne from Moët & Chandon",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
    price: 185000,
    serving_size: {
      glass: 120,
      bottle: 750,
    },
    alcohol_content: 12.5,
    country_of_origin: "France",
    region: "Champagne",
    vintage: 2012,
    aging: "Aged 7 years on lees in the cellars",
    tasting_notes: {
      aroma: ["Brioche", "Citrus zest", "White flowers", "Mineral"],
      palate: ["Fine bubbles", "Complex", "Structured", "Balanced"],
      finish: ["Long", "Clean", "Persistent"],
      body: "Medium",
      sweetness: "Dry",
      acidity: "High",
    },
    allergens: ["Sulfites"],
    dietary_restrictions: ["Vegetarian"],
    serving_temperature: "8-10°C",
    glassware: "Champagne flute or white wine glass",
    fun_fact:
      "Dom Pérignon is named after the Benedictine monk who was an important quality pioneer for Champagne wine",
    food_pairings: [
      {
        name: "Truffle-Infused Wagyu Beef Tenderloin",
        type: "Steak",
        pairing_notes: "Bubbles cut through the richness of the Wagyu",
      },
    ],
  },
  {
    id: "d4",
    name: "Dassai 45 Junmai Daiginjo",
    brand: "Asahi Shuzo",
    category: "Sake",
    subcategory: "Daiginjo",
    description:
      "Premium sake made with Yamada Nishiki rice polished to 45% of its original size. Known for its fruity aroma and smooth, clean finish.",
    excerpt: "Premium Japanese sake with 45% rice polishing ratio",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    price: 65000,
    serving_size: {
      glass: 60,
      bottle: 720,
    },
    alcohol_content: 16,
    country_of_origin: "Japan",
    region: "Yamaguchi Prefecture",
    tasting_notes: {
      aroma: ["Melon", "Pear", "Apple", "Floral"],
      palate: ["Smooth", "Clean", "Fruity", "Well-balanced"],
      finish: ["Clean", "Refreshing"],
      body: "Medium",
      sweetness: "Off-Dry",
      acidity: "Low",
    },
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegan"],
    serving_temperature: "Chilled (10-15°C) or room temperature",
    glassware: "Sake glass or white wine glass",
    fun_fact:
      "The number '45' refers to the seimai buai (rice polishing ratio) - only 45% of each rice grain remains after polishing",
    food_pairings: [
      {
        name: "Japanese Kobe Beef Sukiyaki",
        type: "Japanese",
        pairing_notes:
          "Traditional Japanese pairing that complements the sweet-savory broth",
      },
    ],
  },
  {
    id: "d5",
    name: "Macallan 18 Year Old Sherry Oak",
    brand: "The Macallan",
    category: "Spirit",
    subcategory: "Whiskey",
    description:
      "Single malt Scotch whisky aged for 18 years in selected sherry oak casks from Jerez, Spain. Known for its rich dried fruit and spice notes.",
    excerpt: "Aged single malt Scotch whisky from Speyside",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    price: 280000,
    serving_size: {
      glass: 50,
      bottle: 700,
    },
    alcohol_content: 43,
    country_of_origin: "Scotland",
    region: "Speyside",
    aging: "18 years in Oloroso sherry-seasoned oak casks",
    tasting_notes: {
      aroma: ["Dried fruits", "Ginger", "Toffee", "Orange zest"],
      palate: ["Rich fruitcake", "Dark chocolate", "Spices", "Oak"],
      finish: ["Long", "Warming", "Spicy"],
      body: "Full",
      sweetness: "Medium",
      acidity: "Low",
    },
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegan"],
    serving_temperature: "Room temperature, with or without a drop of water",
    glassware: "Glencairn whisky glass",
    fun_fact:
      "The Macallan spends more on oak casks than any other single malt Scotch whisky producer",
    food_pairings: [
      {
        name: "Dark Chocolate Fondant",
        type: "Dessert",
        pairing_notes: "Whisky's spice complements the dark chocolate",
      },
    ],
  },
  {
    id: "d6",
    name: "Hendrick's Gin",
    brand: "William Grant & Sons",
    category: "Spirit",
    subcategory: "Gin",
    description:
      "Unusual gin infused with Bulgarian rose and cucumber, distilled in small batches using a Carter-Head still and Bennett still.",
    excerpt: "Scottish gin with rose and cucumber infusions",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=2070&q=80",
    price: 42000,
    serving_size: {
      glass: 50,
      bottle: 700,
    },
    alcohol_content: 41.4,
    country_of_origin: "Scotland",
    region: "Girvan, Ayrshire",
    tasting_notes: {
      aroma: ["Rose", "Cucumber", "Juniper", "Citrus"],
      palate: ["Refreshing", "Floral", "Complex", "Smooth"],
      finish: ["Clean", "Aromatic"],
      body: "Medium",
      sweetness: "Dry",
      acidity: "Low",
    },
    ingredients: [
      "Juniper berries",
      "Bulgarian rose",
      "Cucumber",
      "Citrus peel",
      "Spices",
    ],
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegan"],
    serving_temperature: "Chilled, with ice",
    glassware: "Copa glass or martini glass",
    fun_fact:
      "Hendrick's uses two different types of stills - a 19th-century Bennett still and a rare Carter-Head still - to create its unique flavor profile",
    food_pairings: [
      {
        name: "Smoked Salmon Canapés",
        type: "Appetizer",
        pairing_notes: "Cucumber notes complement the smoked salmon",
      },
    ],
  },
  {
    id: "d7",
    name: "Westvleteren 12",
    brand: "Sint-Sixtusabdij van Westvleteren",
    category: "Beer",
    subcategory: "Trappist Beer",
    description:
      "Trappist beer brewed by the monks of Saint Sixtus Abbey in Westvleteren, Belgium. Often rated as one of the best beers in the world.",
    excerpt: "World-renowned Belgian Trappist quadrupel",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80",
    price: 35000,
    serving_size: {
      glass: 330,
      bottle: 330,
    },
    alcohol_content: 10.2,
    country_of_origin: "Belgium",
    region: "West Flanders",
    tasting_notes: {
      aroma: ["Dark fruit", "Caramel", "Spice", "Yeast"],
      palate: ["Complex", "Malty", "Fruity", "Balanced"],
      finish: ["Long", "Warming"],
      body: "Full",
      sweetness: "Medium",
      acidity: "Low",
      bitterness: "Medium",
    },
    allergens: ["Gluten"],
    dietary_restrictions: ["Vegetarian"],
    serving_temperature: "12-14°C",
    glassware: "Chalice or tulip glass",
    fun_fact:
      "Westvleteren 12 is so difficult to obtain that buyers must make an appointment by phone and promise not to resell it",
    food_pairings: [
      {
        name: "Belgian Chocolate Mousse",
        type: "Dessert",
        pairing_notes: "Beer's dark fruit notes complement chocolate",
      },
    ],
  },
  {
    id: "d8",
    name: "Classic Mojito",
    brand: "House Signature",
    category: "Cocktail",
    subcategory: "Classic Cocktail",
    description:
      "Refreshing Cuban cocktail made with white rum, fresh lime juice, mint leaves, sugar, and soda water.",
    excerpt: "Classic Cuban rum cocktail with mint and lime",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    price: 18000,
    serving_size: {
      glass: 300,
    },
    alcohol_content: 15,
    country_of_origin: "Cuba",
    ingredients: [
      "White rum",
      "Fresh lime juice",
      "Mint leaves",
      "Cane sugar",
      "Soda water",
      "Crushed ice",
    ],
    tasting_notes: {
      aroma: ["Fresh mint", "Lime", "Rum"],
      palate: ["Refreshing", "Citrus", "Sweet", "Herbal"],
      finish: ["Clean", "Minty"],
      body: "Light",
      sweetness: "Medium",
      acidity: "High",
    },
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegan"],
    serving_temperature: "Cold, with crushed ice",
    glassware: "Highball glass",
    fun_fact:
      "The Mojito was allegedly Ernest Hemingway's favorite drink when he lived in Cuba",
    food_pairings: [
      {
        name: "Ceviche",
        type: "Appetizer",
        pairing_notes:
          "Refreshing qualities complement citrus-marinated seafood",
      },
    ],
  },
  {
    id: "d9",
    name: "Artisanal Ginger Beer",
    brand: "Fever-Tree",
    category: "Non-Alcoholic",
    subcategory: "Soda",
    description:
      "Premium non-alcoholic ginger beer made with three types of ginger from Nigeria, Cochin, and the Ivory Coast.",
    excerpt: "Craft ginger beer with three ginger varieties",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    price: 8000,
    serving_size: {
      glass: 200,
      bottle: 200,
    },
    alcohol_content: 0,
    country_of_origin: "United Kingdom",
    ingredients: [
      "Spring water",
      "Natural ginger extract",
      "Cane sugar",
      "Natural flavors",
    ],
    tasting_notes: {
      aroma: ["Fresh ginger", "Citrus", "Spice"],
      palate: ["Spicy", "Refreshing", "Natural ginger heat"],
      finish: ["Clean", "Warming"],
      body: "Medium",
      sweetness: "Medium",
      acidity: "Medium",
    },
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegan", "Non-alcoholic"],
    serving_temperature: "4-6°C",
    glassware: "Highball glass or copper mug",
    fun_fact:
      "Fever-Tree uses ginger from three different regions to create a complex flavor profile with both heat and aroma",
    food_pairings: [
      {
        name: "Spicy Asian Cuisine",
        type: "Various",
        pairing_notes: "Ginger complements and cools spicy dishes",
      },
    ],
  },
  {
    id: "d10",
    name: "Espresso Martini",
    brand: "House Signature",
    category: "Cocktail",
    subcategory: "Signature Cocktail",
    description:
      "Sophisticated cocktail combining vodka, fresh espresso, coffee liqueur, and sugar syrup. Topped with three coffee beans for luck.",
    excerpt: "Vodka cocktail with fresh espresso and coffee liqueur",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    price: 22000,
    serving_size: {
      glass: 120,
    },
    alcohol_content: 20,
    country_of_origin: "International",
    ingredients: [
      "Vodka",
      "Fresh espresso",
      "Coffee liqueur",
      "Simple syrup",
      "Coffee beans (garnish)",
    ],
    tasting_notes: {
      aroma: ["Fresh coffee", "Vanilla", "Alcohol"],
      palate: ["Bitter", "Sweet", "Creamy", "Robust coffee"],
      finish: ["Long", "Coffee-forward"],
      body: "Full",
      sweetness: "Medium",
      acidity: "Medium",
      bitterness: "High",
    },
    allergens: [],
    dietary_restrictions: ["Gluten-free", "Vegetarian"],
    serving_temperature: "Chilled",
    glassware: "Martini glass",
    fun_fact:
      "The Espresso Martini was invented in the 1980s by London bartender Dick Bradsell for a model who asked for a drink that would 'wake me up and f**k me up'",
    food_pairings: [
      {
        name: "Tiramisu",
        type: "Dessert",
        pairing_notes: "Coffee flavors complement the dessert",
      },
    ],
  },
  {
    id: "d11",
    name: "Amaro Montenegro",
    brand: "Montenegro",
    category: "Digestif",
    subcategory: "Amaro",
    description:
      "A legendary Italian liqueur crafted from a secret blend of over 40 herbs, spices, and fruits. Known for its perfectly balanced bittersweet profile and aromatic complexity, it is traditionally enjoyed as a digestif after meals.",
    excerpt: "Iconic Italian amaro with over 40 botanicals.",
    date: "2025-10-22",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    price: 32000,
    serving_size: {
      glass: 50,
      bottle: 700,
    },
    alcohol_content: 23,
    country_of_origin: "Italy",
    region: "Bologna",
    tasting_notes: {
      aroma: ["Orange peel", "Herbs", "Gentian", "Floral notes"],
      palate: ["Bitter", "Sweet", "Herbal", "Warm spices", "Vanilla"],
      finish: ["Long", "Warming", "Balanced"],
      body: "Medium",
      sweetness: "Medium",
      acidity: "Low",
      bitterness: "Medium",
    },
    allergens: [],
    dietary_restrictions: ["Vegetarian"],
    serving_temperature: "Room temperature or with ice",
    glassware: "Small snifter or rocks glass",
    fun_fact:
      "Amaro Montenegro was created in 1885 and has been produced with the same secret recipe for over 130 years.",
    food_pairings: [
      {
        name: "Dark Chocolate",
        type: "Dessert",
        pairing_notes:
          "The bittersweet notes of the amaro complement the richness of dark chocolate.",
      },
      {
        name: "Aged Cheese",
        type: "Cheese",
        pairing_notes:
          "Herbal complexity cuts through the fat and salt of cheeses like Pecorino or Gorgonzola.",
      },
    ],
  },
];
