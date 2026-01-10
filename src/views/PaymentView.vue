<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useSessionStore } from "@/stores/session";
import { formatMoneyFromCents } from "@/utils/money";
import KioskButton from "@/components/KioskButton.vue";

const router = useRouter();
const cartStore = useCartStore();
const sessionStore = useSessionStore();

function handlePayment(method: "card" | "cash") {
  // Mock payment processing - in real app, this would call a payment API
  const totalCents = cartStore.subtotalCents;

  // Create receipt record
  sessionStore.createReceipt(totalCents);

  // Clear the cart
  cartStore.clear();

  // Navigate to receipt page
  router.push(`/receipt?method=${method}`);
}
</script>

<template>
  <div class="payment-view">
    <header class="page-header">
      <h1 class="page-header__title">Payment</h1>
    </header>

    <!-- Main content -->
    <main class="payment-view__content">
      <div class="payment-total">
        <div class="total-label">Total Due:</div>
        <div class="total-amount">
          {{ formatMoneyFromCents(cartStore.subtotalCents) }}
        </div>
      </div>

      <div class="payment-view__methods">
        <KioskButton
          variant="primary"
          class="payment-button"
          @click="handlePayment('card')"
        >
          Pay with Card
        </KioskButton>
        <KioskButton
          variant="primary"
          class="payment-button"
          @click="handlePayment('cash')"
        >
          Pay with Cash
        </KioskButton>
      </div>
    </main>

    <footer class="payment-view__footer">
      <KioskButton variant="secondary" @click="router.push('/checkout')">
        Back
      </KioskButton>
    </footer>
  </div>
</template>

<style scoped>
.payment-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
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

.payment-view__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.payment-total {
  background: #e8f5e9;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  margin-bottom: 32px;
}

.total-label {
  font-size: 20px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
}

.total-amount {
  font-size: 48px;
  font-weight: 700;
  color: #4caf50;
}

.payment-view__methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.payment-button {
  width: 100%;
  padding: 28px;
  font-size: 24px;
  min-height: 80px;
}

.payment-view__footer {
  padding: 20px 24px;
  border-top: 2px solid #e0e0e0;
  background: white;
  display: flex;
  justify-content: center;
}
</style>
