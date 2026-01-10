import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/data/products";

export interface CartLine {
  sku: string;
  name: string;
  priceCents: number;
  qty: number;
}

const STORAGE_KEY = "kiosk-cart";

// Load cart from localStorage
function loadCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

export const useCartStore = defineStore("cart", () => {
  const lines = ref<CartLine[]>(loadCart());

  // Getters
  const totalItems = computed(() => {
    return lines.value.reduce((sum, line) => sum + line.qty, 0);
  });

  const subtotalCents = computed(() => {
    return lines.value.reduce(
      (sum, line) => sum + line.priceCents * line.qty,
      0
    );
  });

  // Add a product to the cart or increase its quantity
  function addProduct(product: Product, qty: number = 1) {
    // Clamp qty to valid range (1-99)
    const validQty = Math.max(1, Math.min(99, qty));

    const existingLine = lines.value.find((line) => line.sku === product.sku);

    if (existingLine) {
      // Prevent exceeding max qty (99)
      existingLine.qty = Math.min(99, existingLine.qty + validQty);
    } else {
      lines.value.push({
        sku: product.sku,
        name: product.name,
        priceCents: product.priceCents,
        qty: validQty,
      });
    }

    saveCart(lines.value);
  }

  // Set quantity for a cart line item
  function setQty(sku: string, qty: number) {
    // Remove item if qty is 0 or less
    if (qty <= 0) {
      removeLine(sku);
      return;
    }

    // Clamp qty to valid range (1-99)
    const validQty = Math.max(1, Math.min(99, qty));

    const line = lines.value.find((l) => l.sku === sku);
    if (line) {
      line.qty = validQty;
      saveCart(lines.value);
    }
  }

  function removeLine(sku: string) {
    lines.value = lines.value.filter((l) => l.sku !== sku);
    saveCart(lines.value);
  }

  function clear() {
    lines.value = [];
    saveCart(lines.value);
  }

  return {
    lines,
    totalItems,
    subtotalCents,
    addProduct,
    setQty,
    removeLine,
    clear,
  };
});
