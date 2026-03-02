"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Kaak Sandwiches",
  "Cream Cheeses",
  "Fatayer",
  "Sweets",
  "Coffee",
];

const MENU: MenuItem[] = [
  {
    id: 1,
    name: "Classic Zaatar Kaak",
    category: "Kaak Sandwiches",
    description:
      "Freshly baked sesame bread coated in wild thyme, sumac, and cold-pressed olive oil.",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: 2,
    name: "Akkawi Cheese Kaak",
    category: "Kaak Sandwiches",
    description:
      "Warm sesame bread stuffed with creamy, lightly salted Akkawi cheese and fresh mint leaves.",
    price: 6.0,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
  },
  {
    id: 3,
    name: "Labneh & Mint",
    category: "Cream Cheeses",
    description:
      "Silky strained yogurt blended with fresh mint, drizzled with premium extra virgin olive oil.",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  },
  {
    id: 4,
    name: "Akkawi Spread",
    category: "Cream Cheeses",
    description:
      "Whipped Akkawi cheese with za'atar and a generous pour of golden olive oil.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
  },
  {
    id: 5,
    name: "Spinach & Sumac Fatayer",
    category: "Fatayer",
    description:
      "Warm, savory pastry pockets filled with wilted spinach, caramelized onion, and tangy sumac.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
  },
  {
    id: 6,
    name: "Cheese & Nigella Fatayer",
    category: "Fatayer",
    description:
      "Golden pastry triangles bursting with white cheese and aromatic nigella seeds.",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&q=80",
  },
  {
    id: 7,
    name: "Mamoul Date Cookies",
    category: "Sweets",
    description:
      "Buttery semolina shells cradling soft Medjool dates perfumed with rose water and orange blossom.",
    price: 5.0,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  },
  {
    id: 8,
    name: "Baklava Bites",
    category: "Sweets",
    description:
      "Crisp layers of filo drenched in honey syrup and packed with pistachios and walnuts.",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b2e?w=600&q=80",
  },
  {
    id: 9,
    name: "Cardamom Turkish Coffee",
    category: "Coffee",
    description:
      "Thick, intensely aromatic coffee simmered with freshly ground cardamom, served in a traditional finjan.",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80",
  },
  {
    id: 10,
    name: "Saffron Milk Brew",
    category: "Coffee",
    description:
      "A velvety, golden brew of warm spiced milk infused with precious saffron threads.",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=80",
  },
];

// ─── WhatsApp icon (inline SVG — no extra dep) ────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Quantity Selector ────────────────────────────────────────────────────────

function QuantitySelector({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        disabled={value === 0}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-all duration-150 disabled:opacity-25 hover:enabled:border-terra-300 hover:enabled:bg-terra-50 hover:enabled:text-terra-600 active:enabled:scale-90"
      >
        <span className="text-lg font-bold leading-none select-none">−</span>
      </button>

      <span className="w-5 text-center text-sm font-semibold text-stone-800 tabular-nums">
        {value}
      </span>

      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-terra-500 text-white shadow-sm transition-all duration-150 hover:bg-terra-600 active:scale-90"
      >
        <span className="text-lg font-bold leading-none select-none">+</span>
      </button>
    </div>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────

function MenuCard({
  item,
  quantity,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-stone-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 448px) 100vw, 448px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Category pill overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="font-serif text-lg font-semibold leading-snug text-stone-800">
          {item.name}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          {item.description}
        </p>

        {/* Price + Quantity */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-terra-600">
            ${item.price.toFixed(2)}
          </span>
          <QuantitySelector
            value={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>
      </div>
    </article>
  );
}

// ─── Cart Footer ──────────────────────────────────────────────────────────────

function CartFooter({
  totalItems,
  totalPrice,
  whatsappHref,
}: {
  totalItems: number;
  totalPrice: number;
  whatsappHref: string;
}) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-4 pb-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-xl shadow-stone-900/10 ring-1 ring-stone-200/60 backdrop-blur-xl">
        {/* Cart summary */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra-100">
            <svg
              className="h-5 w-5 text-terra-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-stone-500">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
            <p className="font-serif text-lg font-bold leading-tight text-stone-800">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-terra-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-terra-600 active:scale-95"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("All");

  const increment = (id: number) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const decrement = (id: number) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) - 1),
    }));

  const filtered =
    activeCategory === "All"
      ? MENU
      : MENU.filter((item) => item.category === activeCategory);

  const totalItems = Object.values(quantities).reduce((s, q) => s + q, 0);
  const totalPrice = MENU.reduce(
    (s, item) => s + item.price * (quantities[item.id] ?? 0),
    0
  );

  const buildWhatsAppHref = () => {
    const ordered = MENU.filter((item) => (quantities[item.id] ?? 0) > 0);
    const lines = ordered.map(
      (item) =>
        `• ${quantities[item.id]}× ${item.name} — $${(
          item.price * quantities[item.id]
        ).toFixed(2)}`
    );
    const message = [
      "Hello arshé! 🌿",
      "I'd like to place an order:",
      "",
      ...lines,
      "",
      `Total: $${totalPrice.toFixed(2)}`,
    ].join("\n");
    return `https://wa.me/96170000000?text=${encodeURIComponent(message)}`;
  };

  return (
    /* Outer shell — gives the stone-300 gutters on desktop */
    <div className="min-h-screen bg-stone-300">
      {/* Mobile-app frame */}
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-stone-50 shadow-2xl">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 px-6 pt-14 pb-10">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-terra-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-amber-300/25 blur-2xl" />

          <div className="relative text-center">
            {/* Heritage tag */}
            <span className="inline-block rounded-full border border-terra-200 bg-terra-50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-terra-600">
              Est. Damascus · 1952
            </span>

            {/* Brand name */}
            <h1 className="mt-3 font-serif text-6xl font-bold tracking-tight text-stone-800">
              arshé
            </h1>

            {/* Tagline */}
            <p className="mt-2 font-serif text-sm italic text-stone-500">
              A taste of yesterday, baked for today.
            </p>

            {/* Ornamental divider */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-terra-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-terra-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-terra-300" />
              <div className="h-1.5 w-1.5 rounded-full bg-terra-400" />
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-terra-300" />
            </div>
          </div>
        </header>

        {/* ── Category Nav ────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-20 border-b border-stone-100 bg-stone-50/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-terra-500 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Menu List ───────────────────────────────────────────────── */}
        <main className="flex-1 space-y-4 px-4 py-4 pb-36">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                quantity={quantities[item.id] ?? 0}
                onIncrement={() => increment(item.id)}
                onDecrement={() => decrement(item.id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-serif text-2xl text-stone-300">✦</p>
              <p className="mt-2 font-serif text-lg text-stone-400">
                Coming soon…
              </p>
              <p className="mt-1 text-xs text-stone-400">
                This category will be available soon.
              </p>
            </div>
          )}
        </main>

        {/* ── Sticky Cart Footer ──────────────────────────────────────── */}
        <CartFooter
          totalItems={totalItems}
          totalPrice={totalPrice}
          whatsappHref={buildWhatsAppHref()}
        />
      </div>
    </div>
  );
}
