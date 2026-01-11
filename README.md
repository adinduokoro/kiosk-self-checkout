# Kiosk Self-Checkout (Vue 3 + TS)

This is a simple self-checkout kiosk MVP built in **Vue 3** using the **Composition API** and **TypeScript**.  
It’s meant to simulate the main kiosk flow you’d see in a grocery store: scan items, review cart, checkout, pay, and get a receipt.

The goal here was a clean, readable codebase with a working user flow, not a full production POS system.

---

## What this app does (working)
✅ Start a new session  
✅ Add items by:
- typing a barcode, or  
- tapping a product tile

✅ View/edit cart:
- increase quantity
- decrease quantity
- remove item
- clear cart

✅ Checkout totals:
- subtotal
- tax
- total

✅ Payment (simulated):
- choose Card or Cash
- generates a receipt
- routes to Receipt screen

✅ Route guards:
- you can’t go to Cart/Checkout/Payment with an empty cart
- you can’t go to Receipt without completing a payment

✅ Local persistence:
- cart + last receipt save in `localStorage` so refresh doesn’t wipe the session

---

## What’s mocked / not included
- No real barcode scanner integration (barcode input simulates it)
- No real payment processor (payment is simulated)
- No backend or database (products + receipts are local)
- No admin dashboard / inventory management
- No user authentication

---

## Tech Stack
- **Vue 3**
- **Composition API** (`<script setup>`)
- **TypeScript**
- **Vite**
- **Pinia** (state management)
- **Vue Router**
- **Vitest** (unit testing)

---

## Project Structure (high level)
- `src/views/` → screens (Start, Scan, Cart, Checkout, Payment, Receipt)
- `src/components/` → reusable UI components (buttons, item cards, cart line items)
- `src/stores/` → Pinia stores (cart/session)
- `src/data/` → mock product data
- `src/utils/` → helpers (money formatting)
- `src/router/` → routes + guards

---

## Getting Started

### Install
```bash
npm install
