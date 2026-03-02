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

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

const MENU: MenuItem[] = [
  {
    id: 1,
    name: "Classic Zaatar Kaak",
    category: "Kaak Sandwiches",
    description:
      "Freshly baked sesame bread coated in wild thyme, sumac, and cold-pressed olive oil.",
    price: 5.0,
    image: img("photo-1509440159596-0249088772ff"),
  },
  {
    id: 2,
    name: "Akkawi Cheese Kaak",
    category: "Kaak Sandwiches",
    description:
      "Warm sesame bread stuffed with creamy, lightly salted Akkawi cheese and fresh mint leaves.",
    price: 6.0,
    image: img("photo-1574071318508-1cdbab80d002"),
  },
  {
    id: 3,
    name: "Labneh & Mint",
    category: "Cream Cheeses",
    description:
      "Silky strained yogurt blended with fresh mint, drizzled with premium extra virgin olive oil.",
    price: 4.0,
    image: img("photo-1567620905732-2d1ec7ab7445"),
  },
  {
    id: 4,
    name: "Akkawi Spread",
    category: "Cream Cheeses",
    description:
      "Whipped Akkawi cheese with za'atar and a generous pour of golden olive oil.",
    price: 4.5,
    image: img("photo-1484723091739-30a097e8f929"),
  },
  {
    id: 5,
    name: "Spinach & Sumac Fatayer",
    category: "Fatayer",
    description:
      "Warm, savory pastry pockets filled with wilted spinach, caramelized onion, and tangy sumac.",
    price: 4.5,
    image: img("photo-1601050690597-df0568f70950"),
  },
  {
    id: 6,
    name: "Cheese & Nigella Fatayer",
    category: "Fatayer",
    description:
      "Golden pastry triangles bursting with white cheese and aromatic nigella seeds.",
    price: 4.5,
    image: img("photo-1506459225024-1428097a7e18"),
  },
  {
    id: 7,
    name: "Mamoul Date Cookies",
    category: "Sweets",
    description:
      "Buttery semolina shells cradling soft Medjool dates perfumed with rose water and orange blossom.",
    price: 5.0,
    image: img("photo-1551024601-bec78aea704b"),
  },
  {
    id: 8,
    name: "Baklava Bites",
    category: "Sweets",
    description:
      "Crisp layers of filo drenched in honey syrup and packed with pistachios and walnuts.",
    price: 5.5,
    image: img("photo-1519915028121-7d3463d20b2e"),
  },
  {
    id: 9,
    name: "Cardamom Turkish Coffee",
    category: "Coffee",
    description:
      "Thick, intensely aromatic coffee simmered with freshly ground cardamom, served in a traditional finjan.",
    price: 3.5,
    image: img("photo-1514190051997-0f6f39ca5cde"),
  },
  {
    id: 10,
    name: "Saffron Milk Brew",
    category: "Coffee",
    description:
      "A velvety, golden brew of warm spiced milk infused with precious saffron threads.",
    price: 4.0,
    image: img("photo-1534040385115-33dcb3acba5b"),
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// ─── Image with shimmer skeleton ─────────────────────────────────────────────

function ImageWithShimmer({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
      <div
        className={`absolute inset-0 image-shimmer transition-opacity duration-500 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 448px) 100vw, (max-width: 1024px) 448px, 420px"
        quality={85}
        className={`object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
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
    <div className="flex items-center gap-2.5">
      <button
        onClick={onDecrement}
        disabled={value === 0}
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-all duration-150 disabled:opacity-25 hover:enabled:border-terra-300 hover:enabled:bg-terra-50 hover:enabled:text-terra-600 active:enabled:scale-90"
      >
        <span className="text-base font-bold leading-none select-none">−</span>
      </button>
      <span
        key={value}
        className="w-5 text-center text-sm font-bold text-stone-800 tabular-nums animate-counter-pop"
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-terra-500 text-white shadow-sm transition-all duration-150 hover:bg-terra-600 active:scale-90"
      >
        <span className="text-base font-bold leading-none select-none">+</span>
      </button>
    </div>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────

function MenuCard({
  item,
  quantity,
  priority,
  onIncrement,
  onDecrement,
}: {
  item: MenuItem;
  quantity: number;
  priority?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const isOrdered = quantity > 0;
  return (
    <article
      className={`group overflow-hidden rounded-2xl bg-white transition-all duration-300 ${
        isOrdered
          ? "ring-2 ring-terra-400 shadow-lg shadow-terra-100"
          : "ring-1 ring-stone-100 shadow-sm hover:shadow-md"
      }`}
    >
      <div
        className={`h-1 w-full bg-gradient-to-r from-terra-500 to-terra-300 transition-all duration-300 ${
          isOrdered ? "opacity-100" : "opacity-0"
        }`}
      />
      <ImageWithShimmer src={item.image} alt={item.name} priority={priority} />
      <div className="relative -mt-7 px-3">
        <span className="inline-block rounded-full bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
          {item.category}
        </span>
      </div>
      <div className="px-4 pt-2 pb-4">
        <h2 className="font-serif text-lg font-semibold leading-snug text-stone-800">
          {item.name}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          {item.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-bold text-terra-600">
              ${item.price.toFixed(2)}
            </span>
            {isOrdered && (
              <span className="ml-2 text-xs text-stone-400 animate-fade-in">
                = ${(item.price * quantity).toFixed(2)}
              </span>
            )}
          </div>
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

// ─── Order Drawer ─────────────────────────────────────────────────────────────

function OrderDrawer({
  quantities,
  onIncrement,
  onDecrement,
  onClear,
  onClose,
  totalItems,
  totalPrice,
  whatsappHref,
}: {
  quantities: Record<number, number>;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onClear: () => void;
  onClose: () => void;
  totalItems: number;
  totalPrice: number;
  whatsappHref: string;
}) {
  const orderedItems = MENU.filter((item) => (quantities[item.id] ?? 0) > 0);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 animate-fade-in" onClick={onClose} />
      {/* wider on desktop */}
      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 animate-slide-up lg:max-w-xl">
        <div className="rounded-t-3xl bg-stone-50 shadow-2xl">
          <div className="flex justify-center pt-3 pb-1">
            <div className="h-1 w-10 rounded-full bg-stone-300" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-800">Your Order</h2>
              <p className="text-xs text-stone-400">
                {totalItems} {totalItems === 1 ? "item" : "items"} · ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="max-h-[42vh] overflow-y-auto scrollbar-hide px-5 py-3 space-y-3">
            {orderedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-stone-100">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  <Image src={item.image} alt={item.name} fill sizes="56px" quality={70} className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-sm font-semibold text-stone-800">{item.name}</p>
                  <p className="text-xs text-stone-400">
                    ${item.price.toFixed(2)} × {quantities[item.id]} ={" "}
                    <span className="font-semibold text-terra-600">
                      ${(item.price * quantities[item.id]).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button onClick={() => onDecrement(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:border-terra-300 hover:bg-terra-50 hover:text-terra-600 active:scale-90 transition-all">
                    <span className="text-sm font-bold leading-none">−</span>
                  </button>
                  <span key={quantities[item.id]} className="w-4 text-center text-sm font-bold text-stone-800 tabular-nums animate-counter-pop">
                    {quantities[item.id]}
                  </span>
                  <button onClick={() => onIncrement(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-terra-500 text-white hover:bg-terra-600 active:scale-90 transition-all">
                    <span className="text-sm font-bold leading-none">+</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-5 border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-500">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-stone-800">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="px-5 pt-3 pb-8 space-y-2">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-terra-500 py-3.5 text-base font-semibold text-white shadow-md shadow-terra-200/50 transition-all hover:bg-terra-600 active:scale-[0.98]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Order via WhatsApp
            </a>
            <button onClick={onClear} className="w-full py-2.5 text-sm text-stone-400 hover:text-terra-500 transition-colors">
              Clear Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Cart Footer ──────────────────────────────────────────────────────────────

function CartFooter({
  totalItems,
  totalPrice,
  onOpen,
}: {
  totalItems: number;
  totalPrice: number;
  onOpen: () => void;
}) {
  if (totalItems === 0) return null;
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-4 pb-6 animate-cart-in lg:max-w-2xl">
      <button
        onClick={onOpen}
        className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-xl shadow-stone-900/10 ring-1 ring-stone-200/60 backdrop-blur-xl transition-all hover:bg-white/95 active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra-100">
            <BasketIcon className="h-5 w-5 text-terra-600" />
            <span key={totalItems} className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-terra-500 text-[10px] font-bold text-white animate-counter-pop">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs font-medium text-stone-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} · Tap to review
            </p>
            <p className="font-serif text-lg font-bold leading-tight text-stone-800">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-terra-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all group-hover:bg-terra-600">
          View Order
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </div>
      </button>
    </div>
  );
}

// ─── Desktop Top Navbar ───────────────────────────────────────────────────────
// Visible only on lg+. Sticky, frosted-glass, contains brand + category pills + cart.

function DesktopTopBar({
  activeCategory,
  onCategoryChange,
  totalItems,
  totalPrice,
  onCartOpen,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  totalItems: number;
  totalPrice: number;
  onCartOpen: () => void;
}) {
  return (
    <div className="hidden lg:block sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/70 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="flex h-16 items-center gap-6">

          {/* Brand wordmark */}
          <div className="shrink-0 flex items-baseline gap-3">
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-800">arshé</span>
            <span className="hidden xl:inline font-serif text-xs italic text-stone-400">
              A taste of yesterday, baked for today.
            </span>
          </div>

          <div className="h-6 w-px shrink-0 bg-stone-200" />

          {/* Scrollable category pills */}
          <div className="flex flex-1 gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
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

          {/* Cart pill — appears once items are added */}
          {totalItems > 0 && (
            <button
              onClick={onCartOpen}
              className="shrink-0 flex items-center gap-2 rounded-xl bg-terra-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-terra-600 active:scale-95 animate-fade-in"
            >
              <BasketIcon className="h-4 w-4" />
              <span key={totalItems} className="tabular-nums animate-counter-pop">
                {totalItems} {totalItems === 1 ? "item" : "items"} · ${totalPrice.toFixed(2)}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
// Visible only on lg+. Sticky, scrollable. Brand hero + story + hours + contact + social.

function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-72 xl:w-80 lg:shrink-0 lg:flex-col lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto scrollbar-hide">
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-100 shadow-sm">

        {/* Brand hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 px-6 pt-8 pb-6">
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-terra-400/20 blur-2xl" />
          <div className="relative">
            <span className="inline-block rounded-full border border-terra-200 bg-terra-50 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-terra-600">
              Est. Damascus · 1952
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-stone-800">arshé</h2>
            <p className="mt-1 font-serif text-xs italic text-stone-500">
              A taste of yesterday, baked for today.
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-terra-300" />
              <div className="h-1 w-1 rounded-full bg-terra-400" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-terra-300" />
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="border-b border-stone-100 px-5 py-4">
          <h3 className="mb-2 font-serif text-xs font-semibold uppercase tracking-wider text-terra-500">
            Our Story
          </h3>
          <p className="text-xs leading-relaxed text-stone-500">
            Three generations of baking in Old Damascus since 1952. Every za'atar leaf
            hand-picked, every ring pulled fresh from our stone oven — a ritual
            unchanged since your grandmother's time.
          </p>
        </div>

        {/* Opening hours */}
        <div className="border-b border-stone-100 px-5 py-4">
          <h3 className="mb-3 flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terra-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hours
          </h3>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Mon – Sat</span>
              <span className="font-medium text-stone-700">7 am – 8 pm</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Sunday</span>
              <span className="font-medium text-stone-700">8 am – 6 pm</span>
            </div>
          </div>
          <div className="mt-3 rounded-md border border-terra-100 bg-terra-50 px-2.5 py-1.5 text-center text-[10px] text-terra-600">
            Fresh batches every morning
          </div>
        </div>

        {/* Location */}
        <div className="border-b border-stone-100 px-5 py-4">
          <h3 className="mb-2 flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terra-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Find Us
          </h3>
          <address className="not-italic text-xs leading-loose text-stone-500">
            14 Straight Street, Old City<br />
            <span className="font-medium text-stone-700">Damascus, Syria</span>
          </address>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-[10px] text-terra-500 hover:text-terra-600 transition-colors"
          >
            Open in Maps →
          </a>
        </div>

        {/* WhatsApp CTA */}
        <div className="border-b border-stone-100 px-5 py-4">
          <a href="https://wa.me/96170000000" target="_blank" rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-terra-500 py-2.5 text-sm font-semibold text-white transition-all hover:bg-terra-600 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order via WhatsApp
          </a>
          <p className="mt-2 text-center text-[10px] text-stone-400">+961 70 000 000</p>
        </div>

        {/* Social links */}
        <div className="px-5 py-4">
          <p className="mb-3 text-center text-[10px] uppercase tracking-widest text-stone-400">Follow us</p>
          <div className="flex justify-center gap-2">
            {[
              { label: "Instagram", icon: <InstagramIcon />, href: "#" },
              { label: "Facebook",  icon: <FacebookIcon />,  href: "#" },
              { label: "TikTok",    icon: <TikTokIcon />,    href: "#" },
            ].map(({ label, icon, href }) => (
              <a key={label} href={href} aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-400 transition-all hover:border-terra-300 hover:bg-terra-50 hover:text-terra-600 active:scale-90"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Site Footer ──────────────────────────────────────────────────────────────

function SiteFooter() {
  const socials = [
    { label: "Instagram", icon: <InstagramIcon />,                       href: "#" },
    { label: "Facebook",  icon: <FacebookIcon />,                        href: "#" },
    { label: "TikTok",    icon: <TikTokIcon />,                          href: "#" },
    { label: "WhatsApp",  icon: <WhatsAppIcon className="h-5 w-5" />,   href: "https://wa.me/96170000000" },
  ];

  return (
    <footer>
      {/* Wave transition — bg-stone-50 matches both the mobile frame and desktop canvas */}
      <div className="relative h-10 bg-stone-50" aria-hidden="true">
        <svg viewBox="0 0 390 40" preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full fill-stone-900"
        >
          <path d="M0,40 L0,18 C50,40 100,4 150,22 C200,40 250,4 300,22 C340,36 370,10 390,18 L390,40 Z" />
        </svg>
      </div>

      <div className="bg-stone-900">
        <div className="mx-auto max-w-screen-xl px-6 pt-10 pb-8 lg:px-8">

          {/* ── Four-column grid on desktop, stacked on mobile ── */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12 pb-10 border-b border-stone-800">

            {/* Col 1 — Brand */}
            <div className="text-center lg:text-left">
              <span className="inline-block rounded-full border border-terra-800 bg-terra-900/40 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-terra-400">
                Est. Damascus · 1952
              </span>
              <h2 className="mt-3 font-serif text-5xl font-bold tracking-tight text-stone-100 lg:text-4xl">arshé</h2>
              <p className="mt-2 font-serif text-sm italic text-stone-400">
                A taste of yesterday, baked for today.
              </p>
              <div className="mt-5 flex items-center gap-2 justify-center lg:justify-start">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-terra-800" />
                <div className="h-1.5 w-1.5 rounded-full bg-terra-500" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-terra-800" />
              </div>
              {/* Social row */}
              <div className="mt-5 flex gap-2 justify-center lg:justify-start">
                {socials.map(({ label, icon, href }) => (
                  <a key={label} href={href} aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-800 text-stone-500 transition-all hover:border-terra-600 hover:bg-terra-700 hover:text-white active:scale-90"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Our Story */}
            <div>
              <h3 className="mb-3 font-serif text-xs font-semibold uppercase tracking-wider text-terra-400">
                Our Story
              </h3>
              <p className="text-sm leading-relaxed text-stone-400">
                Born in the narrow lanes of Old Damascus in 1952, arshé has been kneading
                dough and grinding spices for three generations. Every za'atar leaf is
                hand-picked, every sesame ring pulled fresh from our stone oven — a ritual
                unchanged since your grandmother's time.
              </p>
            </div>

            {/* Col 3 — Hours */}
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terra-400">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours
              </h3>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span className="font-medium text-stone-300">7 am – 8 pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-stone-300">8 am – 6 pm</span>
                </li>
              </ul>
              <div className="mt-3 rounded-md border border-terra-900/60 bg-terra-900/30 px-2.5 py-1.5 text-center text-[10px] text-terra-500">
                Fresh batches every morning
              </div>
            </div>

            {/* Col 4 — Location + Contact */}
            <div>
              <h3 className="mb-3 flex items-center gap-1.5 font-serif text-xs font-semibold uppercase tracking-wider text-terra-400">
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Find Us
              </h3>
              <address className="not-italic text-xs leading-loose text-stone-500">
                14 Straight Street<br />
                Old City<br />
                <span className="font-medium text-stone-300">Damascus, Syria</span>
              </address>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-[10px] text-terra-600 hover:text-terra-400 transition-colors"
              >
                Open in Maps →
              </a>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-stone-700/40 bg-stone-800 px-3 py-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-stone-600">Orders &amp; Enquiries</p>
                  <p className="mt-0.5 text-sm font-semibold text-stone-200">+961 70 000 000</p>
                </div>
                <a href="https://wa.me/96170000000" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-terra-600 px-3 py-2 text-xs font-semibold text-white hover:bg-terra-500 active:scale-95 transition-all"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Chat
                </a>
              </div>
            </div>
          </div>

          {/* ── Copyright bar ── */}
          <div className="pt-6 flex flex-col items-center gap-1 lg:flex-row lg:justify-between">
            <p className="text-xs text-stone-600">
              © {new Date().getFullYear()} arshé. All rights reserved.
            </p>
            <p className="text-xs text-stone-600">Baked with love in Damascus 🌿</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const increment = (id: number) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const decrement = (id: number) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) - 1),
    }));

  const clearOrder = () => {
    setQuantities({});
    setIsCartOpen(false);
  };

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
        `• ${quantities[item.id]}× ${item.name} — $${(item.price * quantities[item.id]).toFixed(2)}`
    );
    return `https://wa.me/96170000000?text=${encodeURIComponent(
      ["Hello arshé! 🌿", "I'd like to place an order:", "", ...lines, "", `Total: $${totalPrice.toFixed(2)}`].join("\n")
    )}`;
  };

  return (
    /*
     * Outer shell
     *  Mobile  : stone-300 gutter creates the "phone on table" look
     *  Desktop : stone-50 canvas — the frame dissolves into a real webpage
     */
    <div className="bg-stone-300 lg:bg-stone-50">

      {/* ═══ Desktop sticky top navbar (hidden on mobile) ═══════════════ */}
      <DesktopTopBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* ═══ Content area ════════════════════════════════════════════════ */}
      <div className="lg:mx-auto lg:max-w-screen-xl lg:px-8 lg:py-8">
        {/*
         * Inner frame / layout row
         *  Mobile  : max-w-md · flex-col · shadow-2xl  →  classic phone frame
         *  Desktop : max-w-none · flex-row · no shadow →  sidebar + card grid
         */}
        <div className="
          relative mx-auto flex min-h-screen max-w-md flex-col bg-stone-50 shadow-2xl
          lg:mx-0 lg:max-w-none lg:flex-row lg:items-start lg:gap-8
          lg:shadow-none lg:bg-transparent lg:min-h-0
        ">

          {/* ── Mobile-only hero header ─────────────────────── lg:hidden ── */}
          <header className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 px-6 pt-14 pb-10 lg:hidden">
            <div className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-terra-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-amber-300/25 blur-2xl" />
            <div className="relative text-center">
              <span className="inline-block rounded-full border border-terra-200 bg-terra-50 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-terra-600">
                Est. Damascus · 1952
              </span>
              <h1 className="mt-3 font-serif text-6xl font-bold tracking-tight text-stone-800">arshé</h1>
              <p className="mt-2 font-serif text-sm italic text-stone-500">
                A taste of yesterday, baked for today.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                <div className="h-px w-14 bg-gradient-to-r from-transparent to-terra-300" />
                <div className="h-1.5 w-1.5 rounded-full bg-terra-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-terra-300" />
                <div className="h-1.5 w-1.5 rounded-full bg-terra-400" />
                <div className="h-px w-14 bg-gradient-to-l from-transparent to-terra-300" />
              </div>
            </div>
          </header>

          {/* ── Mobile-only category nav ────────────────────── lg:hidden ── */}
          <nav className="sticky top-0 z-20 border-b border-stone-100 bg-stone-50/95 px-4 py-3 backdrop-blur-sm lg:hidden">
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

          {/* ── Desktop sidebar (hidden on mobile) ─────────────────────── */}
          <DesktopSidebar />

          {/* ── Menu ───────────────────────────────────────────────────── */}
          {/*
           * Mobile  : single column, space-y-4, padded, min-h fills the frame
           * Desktop : CSS grid (2 cols on lg, 3 cols on 2xl), no extra padding
           */}
          <main className="
            flex-1 space-y-4 px-4 py-4 pb-36
            lg:space-y-0 lg:grid lg:grid-cols-2 2xl:grid-cols-3
            lg:content-start lg:items-start lg:gap-5
            lg:px-0 lg:py-0 lg:pb-16
          ">
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  quantity={quantities[item.id] ?? 0}
                  priority={index < 2}
                  onIncrement={() => increment(item.id)}
                  onDecrement={() => decrement(item.id)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center lg:col-span-full">
                <p className="font-serif text-2xl text-stone-300">✦</p>
                <p className="mt-2 font-serif text-lg text-stone-400">Coming soon…</p>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* ═══ Site footer — outside the frame, spans full viewport width ══ */}
      <SiteFooter />

      {/* ═══ Sticky cart bar ══════════════════════════════════════════════ */}
      <CartFooter
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpen={() => setIsCartOpen(true)}
      />

      {/* ═══ Order review drawer ══════════════════════════════════════════ */}
      {isCartOpen && (
        <OrderDrawer
          quantities={quantities}
          onIncrement={increment}
          onDecrement={decrement}
          onClear={clearOrder}
          onClose={() => setIsCartOpen(false)}
          totalItems={totalItems}
          totalPrice={totalPrice}
          whatsappHref={buildWhatsAppHref()}
        />
      )}
    </div>
  );
}
