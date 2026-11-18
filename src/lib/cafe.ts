export const cafe = {
  phone: "085580 22097",
  callUrl: "tel:+918558022097",
  rating: 4.9,
  reviewCount: 14,
  closingTime: "10 PM",
  address: "Arya Nagar, Civil Lines, Gurdaspur, Punjab 143521, India",
};

export const destination = `Lazeez Pizza Cafe, ${cafe.address}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

export function whatsappUrl(item?: string, sizeOrDetails?: string) {
  let message: string;
  if (item && sizeOrDetails) {
    message = `Hello Lazeez Pizza Cafe! I'd like to order *${item}* (${sizeOrDetails}). Please confirm availability and preparation time.`;
  } else if (item) {
    message = `Hello Lazeez Pizza Cafe! I'd like to enquire about ordering *${item}*. Please share availability and current details.`;
  } else {
    message = "Hello Lazeez Pizza Cafe! I'd like to see your current menu and place an order.";
  }
  return `https://wa.me/918558022097?text=${encodeURIComponent(message)}`;
}

export type MenuCategory =
  | "Pizzas"
  | "Special Pizzas"
  | "Burgers"
  | "Sandwiches"
  | "Pasta"
  | "Wraps"
  | "Fries"
  | "Subs";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number | null;
  prices?: Record<string, number>;
  priceDisplay: string;
  description: string | null;
  punjabiName?: string;
  isSpecial?: boolean;
  confirmed: boolean;
};

export type PizzaAddOn = {
  name: string;
  prices: { S: number; M: number; L: number; XL: number };
};

export const pizzaAddOns: PizzaAddOn[] = [
  {
    name: "Extra Cheese",
    prices: { S: 30, M: 50, L: 70, XL: 100 },
  },
  {
    name: "Extra Pan Pizza Crust",
    prices: { S: 30, M: 50, L: 70, XL: 100 },
  },
];

export const menuItems: MenuItem[] = [
  // ==========================================
  // PIZZAs (Classic)
  // Sizes: S, M, L, XL
  // ==========================================
  {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    category: "Pizzas",
    price: 100,
    prices: { S: 100, M: 250, L: 350, XL: 510 },
    priceDisplay: "₹100 (S) · ₹250 (M) · ₹350 (L) · ₹510 (XL)",
    description: "Classic pizza base with rich herb-infused tomato sauce and melted mozzarella cheese.",
    confirmed: true,
  },
  {
    id: "double-cheese-pizza",
    name: "Double Cheese Pizza",
    category: "Pizzas",
    price: 130,
    prices: { S: 130, M: 280, L: 380, XL: 540 },
    priceDisplay: "₹130 (S) · ₹280 (M) · ₹380 (L) · ₹540 (XL)",
    description: "Generous double blanket of creamy stringy mozzarella and cheddar blend.",
    confirmed: true,
  },
  {
    id: "country-spl-pizza",
    name: "Country Spl. Pizza",
    category: "Pizzas",
    price: 210,
    prices: { S: 210, M: 290, L: 390, XL: 550 },
    priceDisplay: "₹210 (S) · ₹290 (M) · ₹390 (L) · ₹550 (XL)",
    description: "Rustic country style pizza loaded with fresh crunchy garden veggies and herbs.",
    confirmed: true,
  },
  {
    id: "farm-fresh-pizza",
    name: "Farm Fresh Pizza",
    category: "Pizzas",
    price: 220,
    prices: { S: 220, M: 300, L: 400, XL: 570 },
    priceDisplay: "₹220 (S) · ₹300 (M) · ₹400 (L) · ₹570 (XL)",
    description: "Farm-picked crisp capsicum, ripe tomatoes, onions, sweet corn, and mozzarella.",
    confirmed: true,
  },
  {
    id: "peppy-paneer-pizza",
    name: "Peppy Paneer Pizza",
    category: "Pizzas",
    price: 230,
    prices: { S: 230, M: 310, L: 410, XL: 610 },
    priceDisplay: "₹230 (S) · ₹310 (M) · ₹410 (L) · ₹610 (XL)",
    description: "Flavor-packed spiced paneer chunks, crisp capsicum, and spicy red paprika.",
    confirmed: true,
  },
  {
    id: "tandoori-paneer-pizza",
    name: "Tandoori Paneer Pizza",
    category: "Pizzas",
    price: 240,
    prices: { S: 240, M: 330, L: 440, XL: 630 },
    priceDisplay: "₹240 (S) · ₹330 (M) · ₹440 (L) · ₹630 (XL)",
    description: "Clay-oven style tandoori spiced cottage cheese cubes, sliced red onions, and bell peppers.",
    confirmed: true,
  },
  {
    id: "pasta-pizza",
    name: "Pasta Pizza",
    category: "Pizzas",
    price: 260,
    prices: { S: 260, M: 330, L: 430, XL: 620 },
    priceDisplay: "₹260 (S) · ₹330 (M) · ₹430 (L) · ₹620 (XL)",
    description: "The ultimate fusion — creamy cheesy Italian pasta spread generously on a baked pizza crust.",
    confirmed: true,
  },
  {
    id: "veggie-pizza",
    name: "Veggie Pizza",
    category: "Pizzas",
    price: 270,
    prices: { S: 270, M: 360, L: 480, XL: 710 },
    priceDisplay: "₹270 (S) · ₹360 (M) · ₹480 (L) · ₹710 (XL)",
    description: "Supreme garden vegetable blend featuring capsicum, sweet corn, onions, and tomatoes.",
    confirmed: true,
  },
  {
    id: "pineapple-pizza",
    name: "Pineapple Pizza",
    category: "Pizzas",
    price: 150,
    prices: { S: 150, M: 250, L: 370, XL: 510 },
    priceDisplay: "₹150 (S) · ₹250 (M) · ₹370 (L) · ₹510 (XL)",
    description: "Juicy golden pineapple chunks harmonized with savoury melted mozzarella and pizza sauce.",
    confirmed: true,
  },
  {
    id: "mushroom-pizza",
    name: "Mushroom Pizza",
    category: "Pizzas",
    price: 180,
    prices: { S: 180, M: 300, L: 419, XL: 530 },
    priceDisplay: "₹180 (S) · ₹300 (M) · ₹419 (L) · ₹530 (XL)",
    description: "Tender sliced button mushrooms sautéed in Italian herbs over molten cheese.",
    confirmed: true,
  },
  {
    id: "paneer-pizza",
    name: "Paneer Pizza",
    category: "Pizzas",
    price: 190,
    prices: { S: 190, M: 320, L: 445, XL: 660 },
    priceDisplay: "₹190 (S) · ₹320 (M) · ₹445 (L) · ₹660 (XL)",
    description: "Fresh soft cottage cheese cubes layered over zesty tomato sauce and mozzarella.",
    confirmed: true,
  },
  {
    id: "gold-corn-pizza",
    name: "Gold Corn Pizza",
    category: "Pizzas",
    price: 130,
    prices: { S: 130, M: 250, L: 360, XL: 510 },
    priceDisplay: "₹130 (S) · ₹250 (M) · ₹360 (L) · ₹510 (XL)",
    description: "Sweet American golden corn kernels sprinkled over stringy melted mozzarella cheese.",
    confirmed: true,
  },
  {
    id: "cheese-lover-pizza",
    name: "Cheese Lover Pizza",
    category: "Pizzas",
    price: 200,
    prices: { S: 200, M: 350, L: 450, XL: 670 },
    priceDisplay: "₹200 (S) · ₹350 (M) · ₹450 (L) · ₹670 (XL)",
    description: "The dream pizza for cheese enthusiasts, loaded with multi-layer melted gourmet cheese.",
    confirmed: true,
  },

  // ==========================================
  // SPECIAL PIZZAs
  // Sizes: S, M, L, XL
  // ==========================================
  {
    id: "spl-lazeez-pizza",
    name: "Spl. Lazeez Pizza",
    category: "Special Pizzas",
    price: 250,
    prices: { S: 250, M: 350, L: 480, XL: 650 },
    priceDisplay: "₹250 (S) · ₹350 (M) · ₹480 (L) · ₹650 (XL)",
    description: "The house specialty loaded with chef's secret sauce, paneer, olives, crisp veggies, and extra cheese.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "paneer-tikka-pizza",
    name: "Paneer Tikka Pizza",
    category: "Special Pizzas",
    price: 350,
    prices: { M: 350, L: 450, XL: 580 },
    priceDisplay: "₹350 (M) · ₹450 (L) · ₹580 (XL)",
    description: "Charcoal-infused spiced paneer tikka, crunchy bell peppers, onions, and spicy tikka gravy.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "international-pizza",
    name: "International Pizza",
    category: "Special Pizzas",
    price: 350,
    prices: { S: 350, M: 510, L: 690, XL: 830 },
    priceDisplay: "₹350 (S) · ₹510 (M) · ₹690 (L) · ₹830 (XL)",
    description: "Gourmet exotic toppings including black olives, jalapeños, mushrooms, corn, and bell peppers.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "punjabi-style-pizza",
    name: "Punjabi Style Pizza",
    category: "Special Pizzas",
    price: 410,
    prices: { S: 410, M: 550, L: 770, XL: 890 },
    priceDisplay: "₹410 (S) · ₹550 (M) · ₹770 (L) · ₹890 (XL)",
    description: "Desi Punjabi tadka seasonings with marinated paneer, spicy masala, onions, and chillies.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "lazeez-half-2-half-pizza",
    name: "Lazeez Pizza Half 2 Half",
    category: "Special Pizzas",
    price: 250,
    prices: { S: 250, M: 370, L: 550, XL: 670 },
    priceDisplay: "₹250 (S) · ₹370 (M) · ₹550 (L) · ₹670 (XL)",
    description: "Two distinct signature flavours on two halves of the same pizza — ideal for sharing.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "mexican-pizza",
    name: "Mexican Pizza",
    category: "Special Pizzas",
    price: 250,
    prices: { S: 250, M: 400, L: 550, XL: 670 },
    priceDisplay: "₹250 (S) · ₹400 (M) · ₹550 (L) · ₹670 (XL)",
    description: "Spicy Mexican salsa, pickled jalapeños, sweet corn, capsicum, and Mexican seasoning.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "protein-pizza",
    name: "Protein Pizza",
    category: "Special Pizzas",
    price: 250,
    prices: { S: 250, M: 370, L: 650, XL: 770 },
    priceDisplay: "₹250 (S) · ₹370 (M) · ₹650 (L) · ₹770 (XL)",
    description: "Nutritious high-protein feast loaded with paneer cubes, mushrooms, and hearty veggies.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "cheesy-lawa-pizza",
    name: "Cheesy Lawa Pizza",
    category: "Special Pizzas",
    price: 250,
    prices: { S: 250, M: 370, L: 600, XL: 750 },
    priceDisplay: "₹250 (S) · ₹370 (M) · ₹600 (L) · ₹750 (XL)",
    description: "Erupting with molten cheesy lava center and loaded cheese crust for cheese devotees.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "makhani-pizza",
    name: "Makhani Pizza",
    category: "Special Pizzas",
    price: 240,
    prices: { S: 240, M: 350, L: 550, XL: 690 },
    priceDisplay: "₹240 (S) · ₹350 (M) · ₹550 (L) · ₹690 (XL)",
    description: "Velvety butter makhani gravy sauce with succulent paneer, onions, and rich mozzarella.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "spl-atta-pizza",
    name: "Special Atta Pizza",
    punjabiName: "ਸਪੈਸ਼ਲ ਆਟਾ ਪੀਜ਼ਾ",
    category: "Special Pizzas",
    price: 330,
    prices: { S: 330, M: 440, L: 659, XL: 770 },
    priceDisplay: "₹330 (S) · ₹440 (M) · ₹659 (L) · ₹770 (XL)",
    description: "100% wholesome whole-wheat (atta) crust baked crisp with fresh toppings and real cheese.",
    confirmed: true,
    isSpecial: true,
  },

  // ==========================================
  // SANDWICHES
  // ==========================================
  {
    id: "spl-lazeez-sandwich-pizza",
    name: "Spl. Lazeez Sandwich Pizza",
    category: "Sandwiches",
    price: 200,
    priceDisplay: "₹200",
    description: "Chef's signature grilled bread stuffed with pizza sauce, mozzarella cheese, and vegetables.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "cold-sandwich-corn",
    name: "Cold Sandwich Corn",
    category: "Sandwiches",
    price: 100,
    priceDisplay: "₹100",
    description: "Chilled fresh bread layered with sweet corn kernels and cool creamy dressing.",
    confirmed: true,
  },
  {
    id: "cold-sandwich-paneer",
    name: "Cold Sandwich Paneer",
    category: "Sandwiches",
    price: 130,
    priceDisplay: "₹130",
    description: "Refreshing cold sandwich packed with fresh paneer cubes, herbs, and crunchy salad veggies.",
    confirmed: true,
  },
  {
    id: "grilled-tandoori-paneer-sandwich",
    name: "Grilled Tandoori Paneer Sandwich",
    category: "Sandwiches",
    price: 130,
    priceDisplay: "₹130",
    description: "Hot pressed crispy sandwich stuffed with spicy tandoori paneer, onions, and mint mayo.",
    confirmed: true,
  },
  {
    id: "grilled-sandwich-corn",
    name: "Grilled Sandwich Corn",
    category: "Sandwiches",
    price: 120,
    priceDisplay: "₹120",
    description: "Golden toasted sandwich filled with sweet golden corn and melted cheese.",
    confirmed: true,
  },
  {
    id: "grilled-sandwich-mushroom",
    name: "Grilled Sandwich Mushroom",
    category: "Sandwiches",
    price: 120,
    priceDisplay: "₹120",
    description: "Crispy grilled bread packed with sautéed garlic mushrooms and melted mozzarella.",
    confirmed: true,
  },

  // ==========================================
  // PASTA
  // Sizes: Half, Full
  // ==========================================
  {
    id: "spl-lazeez-pasta",
    name: "Spl. Lazeez Pasta",
    category: "Pasta",
    price: 150,
    prices: { Half: 150, Full: 250 },
    priceDisplay: "Half: ₹150 · Full: ₹250",
    description: "Chef's signature pasta cooked with rich creamy secret sauce, cheese, and vegetables.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "mix-sauce-pasta",
    name: "Mix Sauce Pasta",
    category: "Pasta",
    price: 130,
    prices: { Half: 130, Full: 200 },
    priceDisplay: "Half: ₹130 · Full: ₹200",
    description: "The best blend of tangy marinara red sauce and velvety rich Alfredo white sauce.",
    confirmed: true,
  },
  {
    id: "white-sauce-pasta",
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 90,
    prices: { Half: 90, Full: 150 },
    priceDisplay: "Half: ₹90 · Full: ₹150",
    description: "Classic creamy white Alfredo sauce pasta tossed with herbs, sweet corn, and cheese.",
    confirmed: true,
  },
  {
    id: "red-sauce-pasta",
    name: "Red Sauce Pasta",
    category: "Pasta",
    price: 90,
    prices: { Half: 90, Full: 150 },
    priceDisplay: "Half: ₹90 · Full: ₹150",
    description: "Zesty Italian style tomato sauce simmered with garlic, basil, and capsicum.",
    confirmed: true,
  },
  {
    id: "tandoori-sauce-pasta",
    name: "Tandoori Sauce Pasta",
    category: "Pasta",
    price: 90,
    prices: { Half: 90, Full: 150 },
    priceDisplay: "Half: ₹90 · Full: ₹150",
    description: "Desi fusion pasta cooked in smoky spiced tandoori gravy with bell peppers and onions.",
    confirmed: true,
  },

  // ==========================================
  // WRAPS
  // ==========================================
  {
    id: "spl-tandoori-paneer-wrap",
    name: "Spl. Tandoori Paneer Wrap",
    category: "Wraps",
    price: 150,
    priceDisplay: "₹150",
    description: "Char-roasted tandoori paneer, sliced onions, and mint mayonnaise wrapped in a warm soft tortilla.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "cheese-corn-wrap",
    name: "Cheese Corn Wrap",
    category: "Wraps",
    price: 130,
    priceDisplay: "₹130",
    description: "Melted cheese, sweet corn kernels, and tangy sauce rolled in a toasted tortilla.",
    confirmed: true,
  },
  {
    id: "veggie-wrap",
    name: "Veggie Wrap",
    category: "Wraps",
    price: 130,
    priceDisplay: "₹130",
    description: "Crispy farm-fresh salad vegetables with flavorful house sauces in a light wrap.",
    confirmed: true,
  },

  // ==========================================
  // FRIES
  // Sizes: Regular, Large (or single)
  // ==========================================
  {
    id: "simple-fries",
    name: "Simple Fries",
    category: "Fries",
    price: 70,
    prices: { Regular: 70, Large: 100 },
    priceDisplay: "Regular: ₹70 · Large: ₹100",
    description: "Crispy golden salted potato french fries served hot and crunchy.",
    confirmed: true,
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    category: "Fries",
    price: 90,
    prices: { Regular: 90, Large: 130 },
    priceDisplay: "Regular: ₹90 · Large: ₹130",
    description: "Crunchy golden fries tossed in aromatic spicy Indian chatpata seasoning.",
    confirmed: true,
  },
  {
    id: "peri-peri-fries",
    name: "Peri-peri Fries",
    category: "Fries",
    price: 100,
    prices: { Regular: 100, Large: 130 },
    priceDisplay: "Regular: ₹100 · Large: ₹130",
    description: "Tossed in fiery and tangy peri-peri herb spice mix for an extra punch.",
    confirmed: true,
  },
  {
    id: "spl-cheese-fries",
    name: "Spl. Cheese Fries",
    category: "Fries",
    price: 150,
    priceDisplay: "₹150",
    description: "Loaded crispy french fries smothered in rich, warm golden liquid cheese sauce.",
    confirmed: true,
    isSpecial: true,
  },

  // ==========================================
  // BURGERS
  // ==========================================
  {
    id: "spl-lazeez-burger",
    name: "Spl. Lazeez Burger",
    category: "Burgers",
    price: 120,
    priceDisplay: "₹120",
    description: "Signature jumbo burger with double layer fillings, melted cheese, and special sauce.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "spl-lazeez-pizza-burger",
    name: "Spl. Lazeez Pizza Burger",
    category: "Burgers",
    price: 130,
    priceDisplay: "₹130",
    description: "A decadent burger filled with pizza sauce, mozzarella cheese, and herbs.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "paneer-patty-burger",
    name: "Paneer Patty Burger",
    category: "Burgers",
    price: 150,
    priceDisplay: "₹150",
    description: "Crispy golden paneer patty served with lettuce, onion slices, and spicy mayonnaise.",
    confirmed: true,
  },
  {
    id: "cheese-burst-burger",
    name: "Cheese Burst Burger",
    category: "Burgers",
    price: 100,
    priceDisplay: "₹100",
    description: "Overflowing with liquid cheese burst center in every hearty bite.",
    confirmed: true,
  },
  {
    id: "tandoori-burger",
    name: "Tandoori Burger",
    category: "Burgers",
    price: 90,
    priceDisplay: "₹90",
    description: "Crispy patty dressed in spicy smokey tandoori mayo and crunchy onions.",
    confirmed: true,
  },
  {
    id: "pizza-burger",
    name: "Pizza Burger",
    category: "Burgers",
    price: 60,
    priceDisplay: "₹60",
    description: "Toasted burger bun stuffed with Italian herbs, tomato pizza sauce, and cheese.",
    confirmed: true,
  },
  {
    id: "paneer-burger",
    name: "Paneer Burger",
    category: "Burgers",
    price: 70,
    priceDisplay: "₹70",
    description: "Soft fresh paneer slice topped with crispy vegetable patty and fresh sauces.",
    confirmed: true,
  },
  {
    id: "veg-burger",
    name: "Veg. Burger",
    category: "Burgers",
    price: 50,
    priceDisplay: "₹50",
    description: "Classic Indian spiced vegetable patty with crisp lettuce and creamy mayo.",
    confirmed: true,
  },
  {
    id: "corn-burger",
    name: "Corn Burger",
    category: "Burgers",
    price: 60,
    priceDisplay: "₹60",
    description: "Crisp potato and sweet corn patty with cool mint mayo and tomato slices.",
    confirmed: true,
  },
  {
    id: "salad-burger",
    name: "Salad Burger",
    category: "Burgers",
    price: 60,
    priceDisplay: "₹60",
    description: "Light and crunchy burger packed with crisp garden greens, cucumber, and dressing.",
    confirmed: true,
  },
  {
    id: "holiday-burger",
    name: "Holiday Burger",
    category: "Burgers",
    price: 50,
    priceDisplay: "₹50",
    description: "Tasty snack-sized burger with crunchy patty, seasoned to perfection.",
    confirmed: true,
  },

  // ==========================================
  // SUBWAY / SUBS
  // Sizes: 6", 12"
  // ==========================================
  {
    id: "aalu-patty-sub",
    name: "Aalu Patty Sub",
    category: "Subs",
    price: 130,
    prices: { '6"': 130, '12"': 230 },
    priceDisplay: '6": ₹130 · 12": ₹230',
    description: "Crispy spiced potato patty packed in a toasted sub roll with salad greens and dressings.",
    confirmed: true,
  },
  {
    id: "mexican-patty-sub",
    name: "Mexican Patty Sub",
    category: "Subs",
    price: 130,
    prices: { '6"': 130, '12"': 230 },
    priceDisplay: '6": ₹130 · 12": ₹230',
    description: "Spicy Mexican patty with pickled jalapeños, onions, crisp lettuce, and zesty sauce.",
    confirmed: true,
  },
  {
    id: "paneer-tikka-sub",
    name: "Paneer Tikka Sub",
    category: "Subs",
    price: 149,
    prices: { '6"': 149, '12"': 250 },
    priceDisplay: '6": ₹149 · 12": ₹250',
    description: "Smokey tandoori paneer tikka chunks layered with fresh veggies and mint mayo.",
    confirmed: true,
    isSpecial: true,
  },
  {
    id: "corn-and-peas-sub",
    name: "Corn & Peas Sub",
    category: "Subs",
    price: 140,
    prices: { '6"': 140, '12"': 240 },
    priceDisplay: '6": ₹140 · 12": ₹240',
    description: "Wholesome sweet corn and green peas patty filled with crunchy garden vegetables.",
    confirmed: true,
  },
];

export function orderableItems() {
  return menuItems.filter((item) => item.confirmed);
}

export function getItemsByCategory(cat: MenuCategory) {
  return menuItems.filter((item) => item.category === cat);
}
