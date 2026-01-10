<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { formatMoneyFromCents } from "@/utils/money";
import KioskButton from "@/components/KioskButton.vue";
import CartLineItem from "@/components/CartLineItem.vue";

const router = useRouter();
const cartStore = useCartStore();
</script>

<template>
  <div class="cart-view">
    <!-- Consistent page header -->
    <header class="page-header">
      <h1 class="page-header__title">Shopping Cart</h1>
    </header>

    <!-- Main content -->
    <main class="cart-view__content">
      <!-- Empty cart state with friendly message -->
      <div v-if="cartStore.lines.length === 0" class="empty-cart">
        <div class="empty-cart__icon">🛒</div>
        <h2 class="empty-cart__title">Your cart is empty</h2>
        <p class="empty-cart__message">
          Start adding items to your cart to continue.
        </p>
        <KioskButton variant="primary" @click="router.push('/scan')">
          Start Shopping
        </KioskButton>
      </div>

      <!-- Cart with items -->
      <div v-else>
        <div class="cart-lines">
          <CartLineItem
            v-for="line in cartStore.lines"
            :key="line.sku"
            :line="line"
            @remove="() => cartStore.removeLine(line.sku)"
          />
        </div>

        <div class="cart-summary">
          <div class="subtotal">
            <span class="subtotal-label">Subtotal:</span>
            <span class="subtotal-value">{{
              formatMoneyFromCents(cartStore.subtotalCents)
            }}</span>
          </div>
        </div>

        <div class="cart-view__actions">
          <KioskButton variant="secondary" @click="router.push('/scan')">
            Back to Scan
          </KioskButton>
          <KioskButton
            variant="primary"
            :disabled="cartStore.totalItems === 0"
            @click="router.push('/checkout')"
          >
            Proceed to Checkout
          </KioskButton>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
