"use client";

import { useState } from "react";

const menuItems = [
  // ================= SPECIAL WRAPS =================
  {
    name: "B.B.Q Wrap",
    category: "Special Wraps",
    price: "Rs. 250",
    description: "BBQ style wrap prepared fresh.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "R.F.S Wrap",
    category: "Special Wraps",
    price: "Rs. 350",
    description: "Royal Foods special wrap.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zinger Wrap",
    category: "Special Wraps",
    price: "Rs. 270",
    description: "Crispy zinger filling wrapped with fresh ingredients.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },

  // ================= SHAWARMA =================
  {
    name: "Chicken Shawarma",
    category: "Shawarma",
    price: "Rs. 180",
    description: "Fresh chicken shawarma prepared with flavorful sauces.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chicken Cheese Shawarma",
    category: "Shawarma",
    price: "Rs. 200",
    description: "Chicken shawarma with creamy cheese.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zinger Shawarma",
    category: "Shawarma",
    price: "Rs. 270",
    description: "Crispy zinger chicken wrapped in a delicious shawarma.",
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zinger Cheese Shawarma",
    category: "Shawarma",
    price: "Rs. 300",
    description: "Crispy zinger and cheese shawarma.",
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Open Platter Shawarma",
    category: "Shawarma",
    price: "Rs. 250",
    description: "Shawarma served as a delicious open platter.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chapli Kabab Shawarma",
    category: "Shawarma",
    price: "Rs. 250",
    description: "A flavorful shawarma featuring chapli kabab.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
  },

  // ================= FRIES =================
  {
    name: "Plain Fries",
    category: "Fries",
    price: "Rs. 100",
    description: "Crispy golden fries.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Loaded Fries",
    category: "Fries",
    price: "Rs. 350",
    description: "Loaded fries with delicious toppings.",
    image:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pizza Fries",
    category: "Fries",
    price: "Rs. 400",
    description: "Crispy fries with pizza-style toppings.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  },

  // ================= SALAD =================
  {
    name: "Mix Fruit Salad",
    category: "Salad",
    price: "Rs. 200",
    description: "Fresh mixed fruit salad.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85",
  },

  // ================= FRIED CORNER =================
  {
    name: "Chicken Broast",
    category: "Fried Corner",
    price: "Rs. 160",
    description: "Crispy fried chicken broast.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Fried Chicken",
    category: "Fried Corner",
    price: "Rs. 450",
    description: "Crispy fried chicken prepared fresh.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hot Wings",
    category: "Fried Corner",
    price: "Rs. 450",
    description: "Crispy spicy hot wings.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hotshot",
    category: "Fried Corner",
    price: "Rs. 450",
    description: "Crispy bite-sized chicken pieces.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Nuggets",
    category: "Fried Corner",
    price: "Rs. 450",
    description: "Crispy chicken nuggets.",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Drum Stick",
    category: "Fried Corner",
    price: "Rs. 500",
    description: "Crispy fried chicken drum stick.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
  },

  // ================= PARATHA ROLLS =================
  {
    name: "Chicken Paratha",
    category: "Paratha Rolls",
    price: "Rs. 200",
    description: "Chicken paratha roll prepared fresh.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chicken Cheese Paratha",
    category: "Paratha Rolls",
    price: "Rs. 230",
    description: "Chicken and cheese paratha roll.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zinger Paratha",
    category: "Paratha Rolls",
    price: "Rs. 270",
    description: "Crispy zinger paratha roll.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Zinger Cheese Paratha",
    category: "Paratha Rolls",
    price: "Rs. 300",
    description: "Zinger and cheese paratha roll.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Chapli Kabab Paratha",
    category: "Paratha Rolls",
    price: "Rs. 250",
    description: "Chapli kabab wrapped in a delicious paratha.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pizza Paratha",
    category: "Paratha Rolls",
    price: "Rs. 450",
    description: "Pizza-inspired stuffed paratha.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },

  // ================= ROYAL DEALS =================
  {
    name: "Smart Deal",
    category: "Royal Deals",
    price: "Rs. 670",
    description: "Hot Wings + Plain Fries + 1 Liter Coke.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Wraps Deal",
    category: "Royal Deals",
    price: "Rs. 800",
    description: "A special combination of Royal Foods wraps and drink.",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Star Deal",
    category: "Royal Deals",
    price: "Rs. 830",
    description: "A Royal Foods special meal deal.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hot Deal",
    category: "Royal Deals",
    price: "Rs. 1470",
    description: "A loaded hot food combination with a soft drink.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Students Deal",
    category: "Royal Deals",
    price: "Rs. 1590",
    description: "A filling student-friendly Royal Foods deal.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Burger Deal",
    category: "Royal Deals",
    price: "Rs. 2150",
    description: "A generous burger meal deal.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Friends Deal",
    category: "Royal Deals",
    price: "Rs. 2650",
    description: "A sharing deal designed for friends.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Family Deal",
    category: "Royal Deals",
    price: "Rs. 3400",
    description: "A larger family meal combination.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Pizza Viva Deal",
    category: "Royal Deals",
    price: "Rs. 2700",
    description: "A pizza-focused sharing deal.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  },
  {
  name: "Birthday Party",
  category: "Royal Deals",
  price: "Rs. 4200",
  description: "A birthday party meal package.",
  image:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
},
];

const features = [
  {
    number: "01",
    title: "Freshly Prepared",
    text: "Food prepared fresh for every order.",
  },
  {
    number: "02",
    title: "Made With Care",
    text: "Quality ingredients and careful preparation.",
  },
  {
    number: "03",
    title: "Easy Ordering",
    text: "Contact us directly for your order or enquiry.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= CONTACT DETAILS =================
  const whatsappNumber = "923341704444";
  const displayPhone = "+92 334 1704444";
  const address =
  "Bodla Colony Road, Opposite Boys High School No. 1, Rajanpur District, Pakistan";

  const whatsappMessage = encodeURIComponent(
    "Hello Royal Foods! I would like to place an order."
  );

  const mapUrl = "https://maps.app.goo.gl/z6S9DN5j1MTqQoUZA";

  return (
    <main className="min-h-screen bg-[#090806] text-white selection:bg-[#d7a84b] selection:text-black">
      {/* ================= GLOBAL GLOW ================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#b87925]/10 blur-[140px]" />
        <div className="absolute -right-40 top-[700px] h-[450px] w-[450px] rounded-full bg-[#d7a84b]/10 blur-[150px]" />
      </div>

      {/* ================= NAVBAR ================= */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-[#090806]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* LOGO */}

          <a href="#home" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7a84b]/40 bg-[#d7a84b]/10">
              <span className="text-xl">♛</span>
            </div>

            <div>
              <p className="font-serif text-xl font-bold tracking-wide text-[#f2d28a]">
                Royal Foods
              </p>

              <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/40">
                Taste • Quality • Royalty
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:text-[#d7a84b]"
            >
              Home
            </a>

            <a
              href="#menu"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:text-[#d7a84b]"
            >
              Menu
            </a>

            <a
              href="#about"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:text-[#d7a84b]"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:text-[#d7a84b]"
            >
              Contact
            </a>
          </nav>

          {/* NAV CTA */}

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-[#d7a84b] px-5 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-black transition hover:-translate-y-0.5 hover:bg-[#f0ca72] sm:block"
          >
            Order Now
          </a>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-[#0b0907] px-5 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              <a
                onClick={() => setMenuOpen(false)}
                href="#home"
                className="text-sm font-bold text-white/70"
              >
                Home
              </a>

              <a
                onClick={() => setMenuOpen(false)}
                href="#menu"
                className="text-sm font-bold text-white/70"
              >
                Menu
              </a>

              <a
                onClick={() => setMenuOpen(false)}
                href="#about"
                className="text-sm font-bold text-white/70"
              >
                About
              </a>

              <a
                onClick={() => setMenuOpen(false)}
                href="#contact"
                className="text-sm font-bold text-white/70"
              >
                Contact
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#d7a84b] px-5 py-4 text-center text-xs font-black uppercase tracking-widest text-black"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative z-10 flex min-h-screen items-center overflow-hidden pt-24"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
            alt="Restaurant food"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#090806]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090806] via-[#090806]/80 to-[#090806]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090806] via-transparent to-[#090806]/50" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-[#d7a84b]" />

              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d7a84b]">
                Welcome to Royal Foods
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Great Food.
              <br />
              <span className="text-[#d7a84b]">Royal Taste.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              Discover delicious food prepared with care, quality ingredients
              and a taste worth coming back for.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="rounded-full bg-[#d7a84b] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-1 hover:bg-[#f0ca72]"
              >
                Explore Menu
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#d7a84b]/50 hover:text-[#d7a84b]"
              >
                Order / Enquire
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <p className="text-xl text-[#d7a84b]">✦</p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  Fresh Preparation
                </p>
              </div>

              <div>
                <p className="text-xl text-[#d7a84b]">✦</p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  Quality Ingredients
                </p>
              </div>

              <div>
                <p className="text-xl text-[#d7a84b]">✦</p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  Easy Ordering
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30">
            Scroll
          </span>

          <div className="h-10 w-px bg-gradient-to-b from-[#d7a84b] to-transparent" />
        </div>
      </section>

      {/* ================= INTRO ================= */}

      <section className="relative z-10 border-y border-white/[0.06] bg-[#0c0a08]">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group border-b border-white/[0.06] p-8 transition hover:bg-white/[0.02] lg:border-b-0 lg:border-r lg:p-12"
            >
              <span className="text-xs font-black tracking-widest text-[#d7a84b]">
                {feature.number}
              </span>

              <h3 className="mt-5 font-serif text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MENU ================= */}

      <section id="menu" className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d7a84b]" />

                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d7a84b]">
                  Our Selection
                </span>
              </div>

              <h2 className="font-serif text-4xl font-bold sm:text-6xl">
                Something for
                <br />
                <span className="text-white/40">every craving.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/40">
              A selection of dishes for your next meal. Prices and menu items
              can be easily edited according to the business.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#11100d] transition duration-500 hover:-translate-y-2 hover:border-[#d7a84b]/30"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-[8px] font-black uppercase tracking-widest text-[#f0ca72] backdrop-blur-xl">
                    {item.category}
                  </span>

                  <span className="absolute bottom-4 right-4 rounded-full bg-[#d7a84b] px-3 py-2 text-[10px] font-black text-black">
                    {item.price}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/40">
                    {item.description}
                  </p>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `Hello Royal Foods! I want to enquire about ${item.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 block rounded-xl border border-white/10 py-3 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white/50 transition hover:border-[#d7a84b]/40 hover:text-[#d7a84b]"
                  >
                    Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-[10px] text-white/20">
            Menu items and prices shown here are editable demo content.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="relative z-10 overflow-hidden bg-[#0e0b08]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-[700px]">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
              alt="Restaurant interior"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e0b08] lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08] via-transparent to-transparent" />
          </div>

          <div className="flex items-center px-6 py-20 sm:px-10 lg:-ml-20 lg:px-0">
            <div className="relative max-w-xl lg:pl-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d7a84b]" />

                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d7a84b]">
                  Our Story
                </span>
              </div>

              <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">
                Food should be
                <br />
                <span className="text-[#d7a84b]">remembered.</span>
              </h2>

              <p className="mt-7 text-sm leading-7 text-white/50">
                Royal Foods is presented as a welcoming local food destination
                where customers can discover delicious meals and connect
                directly with the business.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/40">
                This section is fully editable and can be replaced with the
                owner's real story, history, specialties and values before the
                final website is delivered.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex rounded-full border border-[#d7a84b]/40 px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#d7a84b] transition hover:bg-[#d7a84b] hover:text-black"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#d7a84b]" />

                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d7a84b]">
                  The Experience
                </span>
              </div>

              <h2 className="font-serif text-4xl font-bold sm:text-5xl">
                Simple.
                <br />
                Beautiful.
                <br />
                Delicious.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
                The website focuses on making the customer journey simple:
                discover the food, see the menu, contact the business and place
                an enquiry.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden rounded-[28px]">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=85"
                  alt="Fresh food"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#d7a84b]">
                    Fresh
                  </p>

                  <p className="mt-1 font-serif text-2xl font-bold">
                    Made with care
                  </p>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-[28px]">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85"
                  alt="Restaurant dining"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#d7a84b]">
                    Royal
                  </p>

                  <p className="mt-1 font-serif text-2xl font-bold">
                    Enjoy the moment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT / CTA ================= */}

      <section id="contact" className="relative z-10 px-5 pb-24 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[#d7a84b]/20 bg-[#161109] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7a84b]/10 blur-[120px]" />

          <div className="relative">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d7a84b]">
              Ready when you are
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
              Your next favourite meal
              <br />
              <span className="text-[#d7a84b]">could be waiting.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/40">
              Contact Royal Foods directly for ordering, availability,
              location and other enquiries.
            </p>

            {/* CONTACT INFO */}

            <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              <a
                href={`tel:+${whatsappNumber}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition hover:border-[#d7a84b]/40"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-[#d7a84b]">
                  Call Us
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {displayPhone}
                </p>
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left transition hover:border-[#d7a84b]/40"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-[#d7a84b]">
                  Location
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {address}
                </p>
              </a>
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#d7a84b] px-9 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:-translate-y-1 hover:bg-[#f0ca72]"
              >
                WhatsApp Us
              </a>

              <a
                href={`tel:+${whatsappNumber}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-9 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 transition hover:border-[#d7a84b]/40 hover:text-[#d7a84b]"
              >
                Call Business
              </a>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.04] px-9 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 transition hover:border-[#d7a84b]/40 hover:text-[#d7a84b]"
              >
                View Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 border-t border-white/[0.07] bg-[#070605]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="grid gap-10 md:grid-cols-3">

            {/* BRAND */}

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a84b]/40 bg-[#d7a84b]/10">
                  ♛
                </div>

                <div>
                  <p className="font-serif text-lg font-bold text-[#f2d28a]">
                    Royal Foods
                  </p>

                  <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-white/30">
                    Taste • Quality • Royalty
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-xs leading-6 text-white/30">
                Delicious food, quality ingredients and a royal taste.
                Contact Royal Foods directly for orders and enquiries.
              </p>
            </div>

            {/* QUICK LINKS */}

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d7a84b]">
                Quick Links
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#home"
                  className="text-xs text-white/40 transition hover:text-white"
                >
                  Home
                </a>

                <a
                  href="#menu"
                  className="text-xs text-white/40 transition hover:text-white"
                >
                  Menu
                </a>

                <a
                  href="#about"
                  className="text-xs text-white/40 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="#contact"
                  className="text-xs text-white/40 transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* CONTACT */}

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d7a84b]">
                Contact
              </p>

              <div className="mt-5 space-y-4 text-xs text-white/40">

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block leading-5 transition hover:text-[#d7a84b]"
                >
                  📍 {address}
                </a>

                <a
                  href={`tel:+${whatsappNumber}`}
                  className="block transition hover:text-[#d7a84b]"
                >
                  ☎ {displayPhone}
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-[#d7a84b] transition hover:text-[#f0ca72]"
                >
                  WhatsApp →
                </a>

              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/[0.06] pt-6 text-center">
            <p className="text-[9px] text-white/20">
              © {new Date().getFullYear()} Royal Foods. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ================= MOBILE STICKY CTA ================= */}

      <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-[#090806]/90 p-3 backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-lg gap-2">

          <a
            href={`tel:+${whatsappNumber}`}
            className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-3 text-[9px] font-black uppercase tracking-widest text-white/70"
          >
            ☎ Call
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-[1.5] items-center justify-center rounded-xl bg-[#d7a84b] py-3 text-[9px] font-black uppercase tracking-widest text-black"
          >
            Order / WhatsApp
          </a>

        </div>
      </div>
    </main>
  );
}