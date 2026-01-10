<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { formatMoneyFromCents } from "@/utils/money";
import KioskButton from "@/components/KioskButton.vue";

const router = useRouter();
const cartStore = useCartStore();
</script>

<template>
  <div class="checkout-view">
    <header class="page-header">
      <h1 class="page-header__title">Checkout Summary</h1>
    </header>

    <!-- Main content -->
    <main class="checkout-view__content">
      <div class="checkout-summary">
        <div class="summary-item">
          <span class="summary-label">Items:</span>
          <span class="summary-value">{{ cartStore.totalItems }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Subtotal:</span>
          <span class="summary-value">{{
            formatMoneyFromCents(cartStore.subtotalCents)
          }}</span>
        </div>
      </div>

      <div class="checkout-view__actions">
        <KioskButton variant="secondary" @click="router.push('/cart')">
          Back
        </KioskButton>
        <KioskButton variant="primary" @click="router.push('/payment')">
          Continue
        </KioskButton>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Consistent page layout pattern */
.checkout-view {
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

.checkout-view__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.checkout-summary {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-top: 16px;
  border-top: 2px solid #e0e0e0;
}

.summary-label {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #4caf50;
}

.checkout-view__actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>
