import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Pizza,
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Utensils,
  Car,
  Truck,
  Clock,
  Expand,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Flame,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  cafe,
  destination,
  directionsUrl,
  menuItems,
  orderableItems,
  whatsappUrl,
  pizzaAddOns,
  type MenuItem,
  type MenuCategory,
} from "@/lib/cafe";
import hero from "@/assets/pizza-hero.webp";
import corn from "@/assets/corn-pizza.webp";
import classic from "@/assets/pizza-classic.webp";
import peppers from "@/assets/pizza-peppers.webp";
import table from "@/assets/pizza-table.webp";
import detail from "@/assets/pizza-detail.webp";
import ingredients from "@/assets/pizza-ingredients.webp";
import gallerySlices from "@/assets/gallery-slices.webp";
import galleryCrust from "@/assets/gallery-crust.webp";
import burgerImg from "@/assets/dish-burger.jpg";
import sandwichImg from "@/assets/dish-sandwich.jpg";
import pastaImg from "@/assets/dish-pasta.jpg";
import wrapImg from "@/assets/dish-wrap.jpg";
import friesImg from "@/assets/dish-fries.jpg";
import subImg from "@/assets/dish-sub.jpg";

function getDishImage(item: MenuItem): string {
  if (item.category === "Burgers") return burgerImg;
  if (item.category === "Sandwiches") return sandwichImg;
  if (item.category === "Pasta") return pastaImg;
  if (item.category === "Wraps") return wrapImg;
  if (item.category === "Fries") return friesImg;
  if (item.category === "Subs") return subImg;

  // Pizzas
  if (item.id === "gold-corn-pizza") return corn;
  if (item.id === "spl-atta-pizza") return galleryCrust;
  if (
    item.id === "punjabi-style-pizza" ||
    item.id === "peppy-paneer-pizza" ||
    item.id === "tandoori-paneer-pizza" ||
    item.id === "mexican-pizza"
  ) {
    return peppers;
  }
  if (
    item.id === "veggie-pizza" ||
    item.id === "farm-fresh-pizza" ||
    item.id === "mushroom-pizza" ||
    item.id === "pasta-pizza"
  ) {
    return gallerySlices;
  }
  return classic;
}

const title = "Lazeez Pizza Cafe | Pizza in Gurdaspur, Punjab";
const description =
  "Discover Lazeez Pizza Cafe in Arya Nagar, Civil Lines, Gurdaspur. Explore our full menu of pizzas, burgers, sandwiches, pasta, wraps and subs.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Lazeez Pizza Cafe",
          telephone: "+918558022097",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Arya Nagar, Civil Lines",
            addressLocality: "Gurdaspur",
            addressRegion: "Punjab",
            postalCode: "143521",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const nav: [string, string][] = [
  ["home", "Home"],
  ["signature", "Signatures"],
  ["menu", "Our Menu"],
  ["about", "About"],
  ["gallery", "Gallery"],
  ["reviews", "Reviews"],
  ["contact", "Contact"],
];

const menuCategories: (MenuCategory | "All")[] = [
  "All",
  "Pizzas",
  "Special Pizzas",
  "Burgers",
  "Sandwiches",
  "Pasta",
  "Wraps",
  "Fries",
  "Subs",
];

const services = [
  { icon: Pizza, name: "Pizza, at the heart of it", text: "A cafe for authentic pizza moments." },
  { icon: Utensils, name: "Dine-in", text: "Stay for a hot slice and good company." },
  { icon: Car, name: "Drive-through", text: "A convenient stop along your way." },
  { icon: Truck, name: "No-contact delivery", text: "Enjoy Lazeez wherever you are." },
  { icon: MessageCircle, name: "Easy ordering", text: "Just a call or WhatsApp message away." },
];

const gallery = [
  {
    src: ingredients,
    name: "An Italian-inspired table",
    alt: "Illustrative dough, tomatoes and basil still life",
  },
  {
    src: gallerySlices,
    name: "A little pizza inspiration",
    alt: "Illustrative pizza slices on a ceramic plate",
  },
  {
    src: galleryCrust,
    name: "Colour in every slice",
    alt: "Illustrative close-up of baked pizza crust and cheese",
  },
];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="Lazeez Pizza Cafe home">
      <span className="brand-mark">
        <Pizza size={24} strokeWidth={1.3} />
      </span>
      <span className="brand-name">
        Lazeez<span className="brand-sub">Pizza Cafe · Gurdaspur</span>
      </span>
    </a>
  );
}

function Stars() {
  return (
    <span className="stars" aria-label="Five star symbols">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [category, setCategory] = useState<MenuCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderItem, setOrderItem] = useState<MenuItem | null>(null);
  const [orderSize, setOrderSize] = useState<string>("");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menuBoardOpen, setMenuBoardOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    nav.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleOrderClick(item: MenuItem, defaultSize?: string) {
    setOrderItem(item);
    if (defaultSize) {
      setOrderSize(defaultSize);
    } else if (item.prices) {
      const sizes = Object.keys(item.prices);
      setOrderSize(sizes[0] || "");
    } else {
      setOrderSize("");
    }
    setOrderModalOpen(true);
  }

  function handleGeneralOrder() {
    setOrderItem(null);
    setOrderSize("");
    setOrderModalOpen(true);
  }

  const splLazeez = menuItems.find((i) => i.id === "spl-lazeez-pizza") || menuItems[0]!;
  const goldCorn = menuItems.find((i) => i.id === "gold-corn-pizza") || menuItems[0]!;
  const punjabiStyle = menuItems.find((i) => i.id === "punjabi-style-pizza") || menuItems[0]!;

  const signatureHighlights: {
    item: MenuItem;
    img: string;
    tag: string;
    highlight: string;
    priceInfo: string;
  }[] = [
    {
      item: splLazeez,
      img: classic,
      tag: "CHEF'S SIGNATURE",
      highlight: "House specialty loaded with paneer, olives, chef's secret sauce & rich cheese.",
      priceInfo: "From ₹250 (Small)",
    },
    {
      item: goldCorn,
      img: corn,
      tag: "CUSTOMER FAVOURITE",
      highlight: "American sweet golden corn kernels baked into luscious stringy mozzarella cheese.",
      priceInfo: "From ₹130 (Small)",
    },
    {
      item: punjabiStyle,
      img: peppers,
      tag: "DESI TADKA SPECIAL",
      highlight: "Authentic Punjabi tadka herbs, spiced cottage cheese, onions & robust desi flavours.",
      priceInfo: "From ₹410 (Small)",
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(q) ||
      (item.punjabiName && item.punjabiName.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const currentPhoto = lightbox === null ? null : gallery[lightbox];

  return (
    <>
      <div className="announcement">Fresh Flavours · Delicious Moments · Civil Lines, Gurdaspur</div>
      <header className="navbar">
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-links" aria-label="Main navigation">
            {nav.map(([id, label]) => (
              <a className={`nav-link ${active === id ? "active" : ""}`} key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <Button className="nav-order" onClick={handleGeneralOrder}>
            Order Now <ArrowUpRight />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(([id, label]) => (
              <a className="nav-link" key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>
                {label}
              </a>
            ))}
            <Button
              onClick={() => {
                setMobileOpen(false);
                handleGeneralOrder();
              }}
            >
              Order Now <ArrowUpRight />
            </Button>
          </nav>
        )}
      </header>
      <main>
        <section className="hero" id="home">
          <img
            className="hero-photo"
            src={hero}
            alt="Illustrative freshly baked pizza with melted mozzarella, tomatoes and basil"
            width={1920}
            height={1024}
            fetchPriority="high"
          />
          <div className="container hero-inner reveal">
            <div className="hero-live-badge">
              <span className="live-dot" /> Freshly Handcrafted · 100% Mozzarella · Gurdaspur
            </div>
            <div className="eyebrow">Your neighbourhood pizza cafe</div>
            <h1>
              A Slice of Italy.
              <br />A Taste of <em>Lazeez.</em>
            </h1>
            <p className="hero-description">
              Discover 56 handcrafted dishes — artisanal pizzas, juicy burgers, grilled sandwiches,
              creamy pasta, and fresh subs, freshly baked in Gurdaspur.
            </p>
            <div className="hero-buttons">
              <Button size="lg" className="btn-shimmer" asChild>
                <a href="#menu">
                  Explore Full Menu ({menuItems.length}) <ArrowUpRight />
                </a>
              </Button>
              <Button variant="hero" size="lg" className="btn-glow" onClick={handleGeneralOrder}>
                Order Now <ArrowUpRight />
              </Button>
            </div>
            <div className="hero-meta">
              <Stars />
              <span>
                <strong>{cafe.rating}</strong> / 5 on Google ({cafe.reviewCount} reviews)
              </span>
              <span className="meta-divider" />
              <span className="flex items-center gap-1">
                <MapPin size={13} /> Civil Lines, Gurdaspur
              </span>
            </div>
          </div>
          <div className="hero-seal">
            <span>GOOD FOOD</span>
            <Pizza size={28} strokeWidth={1} />
            <span>GREAT MOMENTS</span>
          </div>
          <span className="photo-note">
            AI-generated image · illustrative, not an actual cafe photograph
          </span>
        </section>
        <div className="service-ribbon">
          <div className="container ribbon-inner">
            {[
              { icon: Utensils, name: "Dine-in & good times" },
              { icon: Car, name: "Drive-through convenience" },
              { icon: Truck, name: "No-contact delivery" },
              { icon: MapPin, name: "Civil Lines, Gurdaspur" },
            ].map((s) => (
              <div className="ribbon-item" key={s.name}>
                <s.icon strokeWidth={1.5} />
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* Signature Showcase Section */}
        <section className="section" id="signature">
          <div className="container scroll-reveal">
            <div className="section-header">
              <div>
                <div className="eyebrow">The pizza edit</div>
                <h2>Made to Make You Crave More.</h2>
                <p className="section-sub">
                  Chef's hand-picked favourites from our authentic Lazeez kitchen.
                </p>
              </div>
              <Button variant="editorial" asChild>
                <a href="#menu">
                  View all 56 dishes <ArrowRight />
                </a>
              </Button>
            </div>
            <div className="pizza-grid">
              {signatureHighlights.map((sig) => (
                <article className="pizza-card" key={sig.item.id}>
                  <div className="pizza-image-wrap">
                    <img
                      src={sig.img}
                      alt={`Illustrative photograph for ${sig.item.name}`}
                      width={512}
                      height={1024}
                      loading="lazy"
                    />
                    <span className="card-label">{sig.tag}</span>
                  </div>
                  <div className="card-body">
                    <div className="flex items-center justify-between gap-2">
                      <h3>{sig.item.name}</h3>
                      <span className="veg-dot" title="Vegetarian" />
                    </div>
                    <p>{sig.highlight}</p>
                    <div className="card-bottom">
                      <span className="font-semibold text-primary">{sig.priceInfo}</span>
                      <Button
                        variant="editorial"
                        size="sm"
                        onClick={() => handleOrderClick(sig.item)}
                      >
                        Order <ArrowUpRight />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="disclosure">
              Food imagery is illustrative. Dish names, ingredients and prices match the confirmed
              Lazeez Pizza Cafe menu.
            </p>
          </div>
        </section>

        {/* Full Interactive Menu Section */}
        <section className="section menu-section" id="menu">
          <div className="container scroll-reveal">
            <div className="center-heading">
              <div className="eyebrow">Handcrafted with care</div>
              <h2>Explore Our Menu</h2>
              <p className="section-sub">
                56 confirmed dishes freshly prepared to order at Lazeez Pizza Cafe, Civil Lines,
                Gurdaspur.
              </p>
            </div>

            {/* Menu Controls: Search & Official Board Link */}
            <div className="menu-controls">
              <div className="menu-search-box">
                <Search className="menu-search-icon" />
                <input
                  type="text"
                  className="menu-search-input"
                  placeholder="Search 56 dishes (e.g. Margherita, Paneer, Tandoori, Atta)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search dishes"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="menu-search-clear"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="button"
                className="menu-view-card-btn"
                onClick={() => setMenuBoardOpen(true)}
              >
                <ImageIcon size={15} />
                <span>View Official Menu Board</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {menuCategories.map((cat) => {
                const count =
                  cat === "All"
                    ? menuItems.length
                    : menuItems.filter((i) => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={category === cat}
                    className="menu-tab"
                    onClick={() => setCategory(cat)}
                  >
                    {cat === "Pizzas" && <Pizza size={14} />}
                    {cat === "Special Pizzas" && <Flame size={14} />}
                    {cat === "All" && <Sparkles size={14} />}
                    <span>{cat}</span>
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Pizza Add-Ons Banner */}
            {(category === "All" || category === "Pizzas" || category === "Special Pizzas") &&
              !searchQuery && (
                <div className="addons-banner">
                  <div className="addons-banner-title">
                    <Sparkles size={16} /> Pizza Add-Ons & Upgrades
                  </div>
                  <div className="addons-list">
                    {pizzaAddOns.map((addon) => (
                      <div className="addon-pill" key={addon.name}>
                        <span className="addon-name">{addon.name}:</span>
                        <div className="addon-prices">
                          <span>S: ₹{addon.prices.S}</span> · 
                          <span>M: ₹{addon.prices.M}</span> · 
                          <span>L: ₹{addon.prices.L}</span> · 
                          <span>XL: ₹{addon.prices.XL}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Menu Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="menu-empty-state">
                <h3>No dishes found</h3>
                <p>
                  We couldn't find any dish matching "{searchQuery}". Try searching for Paneer,
                  Burger, Tandoori, Cheese or Pasta.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="menu-grid">
                {filteredItems.map((item) => (
                  <article className="menu-card" key={item.id}>
                    <div className="menu-card-img-wrap">
                      <img
                        src={getDishImage(item)}
                        alt={`Delicious freshly prepared ${item.name}`}
                        className="menu-card-img"
                        loading="lazy"
                        width={400}
                        height={240}
                      />
                      <span className="card-img-category">{item.category}</span>
                      <div className="card-img-badges">
                        <span className="veg-dot" title="100% Vegetarian" aria-label="Vegetarian" />
                        {item.isSpecial && (
                          <span className="special-badge">
                            <Flame size={10} /> Special
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="menu-card-top">
                      <div className="card-header-row">
                        <div className="card-title-group">
                          <h3>{item.name}</h3>
                          {item.punjabiName && (
                            <span className="punjabi-badge">{item.punjabiName}</span>
                          )}
                        </div>
                      </div>
                      <p>{item.description}</p>
                    </div>

                    <div className="menu-card-bottom">
                      <div className="price-and-sizes">
                        {item.prices ? (
                          <div className="sizes-chips">
                            {Object.entries(item.prices).map(([size, price]) => (
                              <button
                                key={size}
                                type="button"
                                className="size-chip-btn"
                                title={`Order ${item.name} (${size}) for ₹${price}`}
                                onClick={() => handleOrderClick(item, size)}
                              >
                                <span>{size}</span>: ₹{price}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="single-price-tag">₹{item.price}</span>
                        )}
                      </div>
                      <div className="card-actions">
                        <Button size="sm" onClick={() => handleOrderClick(item)}>
                          Order <ArrowUpRight />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <p className="disclosure">
              Authentic printed menu & genuine prices verified from Lazeez Pizza Cafe, Civil Lines,
              Gurdaspur.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="section" id="about">
          <div className="container about-layout scroll-reveal">
            <figure className="about-image">
              <img
                className="about-photo"
                src={table}
                alt="Illustrative pizza being served at a welcoming cafe table"
                width={1280}
                height={1024}
                loading="lazy"
              />
              <figcaption>Italian-inspired imagery · not the actual Lazeez cafe</figcaption>
            </figure>
            <div className="about-content">
              <div className="eyebrow">A little about us</div>
              <h2>
                Good Food.
                <br />
                Great Moments.
                <br />
                That’s Lazeez.
              </h2>
              <p className="section-sub">
                A beloved local pizza takeaway and cafe in Gurdaspur, Lazeez is a warm space for
                handcrafted pizza cravings and time together with family and friends.
              </p>
              <p className="section-sub">
                Located in Arya Nagar, Civil Lines, Gurdaspur. Stop by for dine-in, pick up at our
                drive-through, or message us for no-contact delivery right to your door.
              </p>
              <p className="about-signoff">See you for a slice.</p>
              <Button variant="editorial" asChild className="mt-6">
                <a href="#contact">
                  Come say hello <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Lazeez Section */}
        <section className="why-section">
          <div className="container scroll-reveal">
            <div className="center-heading">
              <div className="eyebrow">Your pizza. Your way.</div>
              <h2>More Ways to Enjoy Lazeez</h2>
            </div>
            <div className="features">
              {services.map((s) => (
                <div className="feature" key={s.name}>
                  <s.icon strokeWidth={1.4} />
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section" id="gallery">
          <div className="container scroll-reveal">
            <div className="section-header">
              <div>
                <div className="eyebrow">A feast for the eyes</div>
                <h2>The Delicious Details.</h2>
              </div>
              <p className="section-sub">
                Italian-inspired food imagery.
                <br />
                Original cafe photographs coming soon.
              </p>
            </div>
            <div className="gallery-grid">
              {gallery.map((g, i) => (
                <Button
                  variant="ghost"
                  className="gallery-image"
                  key={g.src}
                  onClick={() => setLightbox(i)}
                  aria-label={`View ${g.name}`}
                >
                  <img src={g.src} alt={g.alt} width={1280} height={1024} loading="lazy" />
                  <Expand size={20} />
                </Button>
              ))}
            </div>
            <p className="disclosure">
              Illustrative AI-generated photographs — not actual Lazeez food or premises.
            </p>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="section reviews-section" id="reviews">
          <div className="container reviews-layout scroll-reveal">
            <div>
              <div className="eyebrow">A little local love</div>
              <h2>
                What Our
                <br />
                Customers Say
              </h2>
              <div className="rating">
                <strong>
                  {cafe.rating}
                  <span className="text-xl">/5</span>
                </strong>
                <div>
                  <Stars />
                  <p>{cafe.reviewCount} Google reviews · verified rating</p>
                </div>
              </div>
            </div>
            <div className="review-themes">
              <h3>
                Pizza worth talking about.
                <br />
                <em>Moments worth coming back for.</em>
              </h3>
              <p>
                Customers love the authentic fresh dough crust, rich melted cheese blends, fast
                service, and delicious variety across burgers, pasta, and pizzas.
              </p>
              <p>
                Verified Google customer satisfaction rating for Lazeez Pizza Cafe, Civil Lines,
                Gurdaspur.
              </p>
              <Button variant="editorial" asChild className="mt-5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Find Lazeez on Google <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="container scroll-reveal">
            <div className="eyebrow">Your next pizza stop</div>
            <h2>Find Your Way to Lazeez</h2>
            <div className="contact-layout">
              <div>
                <div className="contact-detail">
                  <MapPin />
                  <div>
                    <h3>Lazeez Pizza Cafe</h3>
                    <p>
                      Arya Nagar, Civil Lines,
                      <br />
                      Gurdaspur, Punjab 143521, India.
                    </p>
                  </div>
                </div>
                <div className="contact-detail">
                  <Phone />
                  <div>
                    <h3>Let’s talk pizza</h3>
                    <a href={cafe.callUrl}>{cafe.phone}</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <Clock />
                  <div>
                    <h3>Fresh until late</h3>
                    <p>
                      Listed closing time: {cafe.closingTime}
                      <br />
                      Please call to confirm today’s opening hours.
                    </p>
                  </div>
                </div>
                <div className="contact-actions">
                  <Button asChild>
                    <a href={directionsUrl} target="_blank" rel="noreferrer">
                      Get Directions <ArrowUpRight />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={cafe.callUrl}>
                      <Phone /> Call Now
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                      <MessageCircle /> WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              <iframe
                className="map"
                title="Google Maps search for Lazeez Pizza Cafe in Civil Lines, Gurdaspur"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <img
            src={detail}
            alt="Illustrative pizza slice with melted cheese"
            width={1536}
            height={1024}
            loading="lazy"
          />
          <div className="container final-inner">
            <h2>Your Next Favourite Slice Is Waiting.</h2>
            <p>Explore all 56 dishes and discover something delicious at Lazeez Pizza Cafe.</p>
            <div className="final-buttons">
              <Button size="lg" asChild>
                <a href="#menu">
                  Explore Full Menu <ArrowUpRight />
                </a>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <a href={cafe.callUrl}>
                  <Phone /> Call to Order
                </a>
              </Button>
            </div>
          </div>
          <span className="photo-note">Illustrative AI-generated image</span>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand />
              <p>
                Your neighbourhood pizza cafe.
                <br />
                Good food. Great moments. Gurdaspur.
              </p>
            </div>
            <div>
              <h3>Around the table</h3>
              <nav className="footer-links" aria-label="Footer navigation">
                {nav.map(([id, label]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h3>Come find us</h3>
              <p>
                Arya Nagar, Civil Lines,
                <br />
                Gurdaspur, Punjab 143521
                <br />
                <a className="contact-link" href={cafe.callUrl}>
                  {cafe.phone}
                </a>
                <br />
                Closing time: {cafe.closingTime}
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Lazeez Pizza Cafe. All rights reserved.</span>
            <span>A little Italy. A lot of Lazeez.</span>
          </div>
        </div>
      </footer>

      {/* Floating Call & WhatsApp Buttons */}
      <div className="floating-contact">
        <Button asChild size="icon" variant="outline">
          <a href={cafe.callUrl} aria-label="Call Lazeez Pizza Cafe" title="Call Lazeez">
            <Phone />
          </a>
        </Button>
        <Button asChild size="icon" className="whatsapp">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Order on WhatsApp"
            title="Message Lazeez on WhatsApp"
          >
            <MessageCircle />
          </a>
        </Button>
      </div>

      {/* Interactive Order Dialog */}
      <Dialog
        open={orderModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setOrderModalOpen(false);
            setOrderItem(null);
            setOrderSize("");
          }
        }}
      >
        <DialogContent>
          <DialogTitle className="font-display text-2xl sm:text-3xl">
            {orderItem ? `Order ${orderItem.name}` : "Your next slice starts here."}
          </DialogTitle>
          <DialogDescription>
            {orderItem
              ? `${orderItem.category} · Freshly prepared at Lazeez Pizza Cafe, Gurdaspur.`
              : "Get in touch with Lazeez Pizza Cafe to enquire and order."}
          </DialogDescription>

          {orderItem && (
            <div className="my-2 p-3 bg-secondary/40 rounded-lg border border-border">
              <div className="flex gap-3 items-start">
                <img
                  src={getDishImage(orderItem)}
                  alt={orderItem.name}
                  className="w-16 h-16 rounded-md object-cover border border-border flex-shrink-0"
                  width={64}
                  height={64}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="veg-dot" title="Vegetarian" />
                      <span className="font-semibold text-sm truncate">{orderItem.name}</span>
                    </div>
                    {orderItem.punjabiName && (
                      <span className="punjabi-badge">{orderItem.punjabiName}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {orderItem.description}
                  </p>
                </div>
              </div>

              {orderItem.prices && (
                <div className="mt-3">
                  <div className="order-size-prompt">Select Size / Portion:</div>
                  <div className="modal-sizes-group">
                    {Object.entries(orderItem.prices).map(([size, price]) => (
                      <button
                        key={size}
                        type="button"
                        className={`modal-size-btn ${orderSize === size ? "active" : ""}`}
                        onClick={() => setOrderSize(size)}
                      >
                        <span className="size-label">{size}</span>
                        <span className="size-val">₹{price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60">
                <span className="text-xs text-muted-foreground">Price:</span>
                <span className="text-base font-bold text-primary">
                  {orderItem.prices && orderSize
                    ? `₹${orderItem.prices[orderSize]} (${orderSize})`
                    : orderItem.price
                      ? `₹${orderItem.price}`
                      : orderItem.priceDisplay}
                </span>
              </div>
            </div>
          )}

          <div className="order-options">
            <Button size="lg" asChild>
              <a
                href={
                  orderItem
                    ? whatsappUrl(
                        orderItem.name,
                        orderSize && orderItem.prices
                          ? `${orderSize} · ₹${orderItem.prices[orderSize]}`
                          : orderItem.price
                            ? `₹${orderItem.price}`
                            : undefined,
                      )
                    : whatsappUrl()
                }
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle /> {orderItem ? "Order on WhatsApp" : "Order on WhatsApp"}{" "}
                <ArrowUpRight />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={cafe.callUrl}>
                <Phone /> Call {cafe.phone}
              </a>
            </Button>
            <p className="order-fine">
              Opening WhatsApp starts a direct chat with Lazeez Pizza Cafe. The cafe team will
              confirm availability, preparation time, and delivery details.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Official Menu Board Lightbox Dialog */}
      <Dialog
        open={menuBoardOpen}
        onOpenChange={(open) => {
          if (!open) setMenuBoardOpen(false);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="font-display text-2xl">
            Official Menu Board · Lazeez Pizza Cafe
          </DialogTitle>
          <DialogDescription>
            Photograph of the authentic printed menu board at Arya Nagar, Civil Lines, Gurdaspur.
          </DialogDescription>
          <img
            src="/menu-card.jpg"
            alt="Official printed menu card of Lazeez Pizza Cafe showing Pizzas, Burgers, Sandwiches, Pasta, Wraps, Fries, and Subs"
            className="menu-board-preview"
          />
          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">
              All 56 dishes and prices on this website are directly verified from this menu.
            </span>
            <Button variant="outline" size="sm" asChild>
              <a href="/menu-card.jpg" target="_blank" rel="noreferrer">
                Open Full Photo <ArrowUpRight />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Lightbox */}
      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogTitle>{currentPhoto?.name}</DialogTitle>
          <DialogDescription>
            AI-generated inspiration, not actual Lazeez photography.
          </DialogDescription>
          {currentPhoto && (
            <img className="lightbox-photo" src={currentPhoto.src} alt={currentPhoto.alt} />
          )}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous photograph"
              onClick={() => setLightbox((i) => ((i ?? 0) + gallery.length - 1) % gallery.length)}
            >
              <ChevronLeft />
            </Button>
            <span className="text-xs text-muted-foreground">
              {(lightbox ?? 0) + 1} / {gallery.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next photograph"
              onClick={() => setLightbox((i) => ((i ?? 0) + 1) % gallery.length)}
            >
              <ChevronRight />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
