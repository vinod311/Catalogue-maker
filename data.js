/* ====== EDIT THIS FILE ONLY ======
   1. Change your company details in CONFIG
   2. Add / edit / delete products in PRODUCTS (copy one block, paste, change)
   3. Product photos: put the file in the "images" folder and write its name in image: "name.jpg"
      (leave image: "" to show a nice bottle graphic)
*/
const CONFIG = {
  brand: "Your Company Name",
  tagline: "Authorised Dealer of Givaudan",
  whatsapp: "919999999999",      // country code + number, no + or spaces
  phone: "+91 99999 99999",
  city: "Your City, India",
  currency: "₹",
  priceNote: "Prices are ex-works and subject to GST. Rates may change without notice."
};

const PRODUCTS = [
  { id: 1, name: "Oud Royale", code: "GV-1001", category: "Woody", color: "#6b3e26", tag: "Bestseller", image: "",
    desc: "Rich, smoky oud with warm amber depth. Ideal for attars, premium perfumes and incense.",
    notes: { top: "Saffron, Bergamot", heart: "Oud, Rose", base: "Amber, Musk" }, dosage: "15–25%",
    variants: [ { size: "100 g", price: 4500, mrp: 5200 }, { size: "500 g", price: 20500, mrp: 24000 }, { size: "1 kg", price: 39000, mrp: 46000 } ] },
  { id: 2, name: "Ocean Breeze", code: "GV-1002", category: "Fresh", color: "#2a7fa8", tag: "New", image: "",
    desc: "Clean aquatic freshness with a crisp citrus lift. Great for body sprays, soaps and detergents.",
    notes: { top: "Lemon, Sea Salt", heart: "Marine, Lavender", base: "Cedar, Musk" }, dosage: "5–10%",
    variants: [ { size: "100 g", price: 1800, mrp: 2200 }, { size: "1 kg", price: 16500, mrp: 20000 } ] },
  { id: 3, name: "Velvet Rose", code: "GV-1003", category: "Floral", color: "#b5385b", tag: "", image: "",
    desc: "Lush Bulgarian-style rose with soft powdery sweetness. A timeless floral for fine fragrance.",
    notes: { top: "Pink Pepper, Lychee", heart: "Rose, Peony", base: "Vanilla, Sandalwood" }, dosage: "10–20%",
    variants: [ { size: "100 g", price: 3200, mrp: 3800 }, { size: "500 g", price: 14800, mrp: 17500 } ] },
  { id: 4, name: "Midnight Amber", code: "GV-1004", category: "Oriental", color: "#a8691d", tag: "Trending", image: "",
    desc: "Sweet, resinous and sensual. Warm spices melt into creamy amber and tonka.",
    notes: { top: "Cardamom, Cinnamon", heart: "Labdanum, Iris", base: "Tonka, Amber" }, dosage: "15–25%",
    variants: [ { size: "100 g", price: 3900, mrp: 4600 }, { size: "1 kg", price: 36000, mrp: 43000 } ] },
  { id: 5, name: "Citrus Spark", code: "GV-1005", category: "Fresh", color: "#e0a800", tag: "", image: "",
    desc: "Juicy bergamot, mandarin and grapefruit. Bright, energetic and long lasting for its type.",
    notes: { top: "Bergamot, Mandarin", heart: "Neroli, Green Tea", base: "Vetiver, Musk" }, dosage: "5–12%",
    variants: [ { size: "100 g", price: 1500, mrp: 1900 }, { size: "1 kg", price: 13500, mrp: 17000 } ] },
  { id: 6, name: "Jasmine Noir", code: "GV-1006", category: "Floral", color: "#4b3a63", tag: "", image: "",
    desc: "Indolic night jasmine wrapped in dark woods. Bold and luxurious.",
    notes: { top: "Mandarin, Plum", heart: "Jasmine, Tuberose", base: "Patchouli, Cashmere" }, dosage: "10–18%",
    variants: [ { size: "100 g", price: 3600, mrp: 4300 }, { size: "500 g", price: 16800, mrp: 20000 } ] }
];
