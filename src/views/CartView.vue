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

<style scoped>
  .cart-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.page-header {
  padding: 24px 24px 16px;
  border-bottom: 2px solid #e0e0e0;
  background: white;
}

.page-header__title {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.cart-view__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  min-height: 400px;
}

.empty-cart__icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.5;
}

.empty-cart__title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.empty-cart__message {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  max-width: 400px;
}

.cart-lines {
  margin-bottom: 24px;
}

.cart-summary {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 24px;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtotal-label {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.subtotal-value {
  font-size: 28px;
  font-weight: 700;
  color: #4CAF50;
}

.cart-view__actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>
