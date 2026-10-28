"use client";

/* eslint-disable react-hooks/set-state-in-effect --
 * Persisted cart/wishlist/compare live in localStorage, a client-only API.
 * Loading them must happen after mount (server has no localStorage), so a
 * post-mount setState is the correct, hydration-safe pattern here.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cartItemKey, type CartItem } from "@/lib/products";

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  toast: string | null;
  addToCart: (item: CartItem) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  showToast: (msg: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load persisted state only on the client, after first render, so the
  // server render and the first client render match (no hydration error).
  // Writes are gated on `loaded` so the initial empty state never erases
  // stored data before it has been read (see file-level note above).
  useEffect(() => {
    setCart(readJson<CartItem[]>("vanta-cart", []));
    setWishlist(readJson<string[]>("vanta-wishlist", []));
    setCompare(readJson<string[]>("vanta-compare", []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem("vanta-cart", JSON.stringify(cart));
    } catch {
      /* storage unavailable — cart still works for this session */
    }
  }, [cart, loaded]);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem("vanta-wishlist", JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist, loaded]);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem("vanta-compare", JSON.stringify(compare));
    } catch {
      /* ignore */
    }
  }, [compare, loaded]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prev) => {
        const key = cartItemKey(item);
        const existing = prev.find((i) => cartItemKey(i) === key);
        if (existing) {
          return prev.map((i) => (cartItemKey(i) === key ? { ...i, qty: i.qty + item.qty } : i));
        }
        return [...prev, item];
      });
      showToast("Added to cart.");
    },
    [showToast]
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => cartItemKey(i) !== key)
        : prev.map((i) => (cartItemKey(i) === key ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => cartItemKey(i) !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev; // comparison is capped at 3, honestly
      return [...prev, slug];
    });
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      compare,
      toast,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      toggleCompare,
      clearCompare,
      showToast,
    }),
    [cart, wishlist, compare, toast, addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, toggleCompare, clearCompare, showToast]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
