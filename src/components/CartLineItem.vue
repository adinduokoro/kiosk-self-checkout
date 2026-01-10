<script setup lang="ts">
import type { CartLine } from "@/stores/cart";
import { formatMoneyFromCents } from "@/utils/money";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
  line: CartLine;
}>();

const emit = defineEmits<{
  remove: [];
}>();

const cartStore = useCartStore();

// Increase quantity by 1, capped at 99
function increaseQty() {
  const newQty = Math.min(99, props.line.qty + 1);
  cartStore.setQty(props.line.sku, newQty);
}

// Decrease quantity by 1, minimum is 1
function decreaseQty() {
  if (props.line.qty > 1) {
    cartStore.setQty(props.line.sku, props.line.qty - 1);
  }
}
</script>

<template>
  <div class="cart-line-item">
    <div class="cart-line-item__info">
      <div class="cart-line-item__name">{{ line.name }}</div>
      <div class="cart-line-item__sku">{{ line.sku }}</div>
      <div class="cart-line-item__unit-price">
        {{ formatMoneyFromCents(line.priceCents) }} each
      </div>
    </div>

    <div class="cart-line-item__controls">
      <div class="cart-line-item__qty-controls">
        <button
          class="qty-button qty-button--minus"
          @click="decreaseQty"
          :disabled="line.qty <= 1"
          title="Decrease quantity (min 1)"
        >
          −
        </button>
        <span class="qty-display">{{ line.qty }}</span>
        <button
          class="qty-button qty-button--plus"
          @click="increaseQty"
          :disabled="line.qty >= 99"
          title="Increase quantity (max 99)"
        >
          +
        </button>
      </div>

      <div class="cart-line-item__total">
        {{ formatMoneyFromCents(line.priceCents * line.qty) }}
      </div>

      <button
        class="remove-button"
        @click="$emit('remove')"
        title="Remove item"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-line-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 12px;
}

.cart-line-item__info {
  flex: 1;
}

.cart-line-item__name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.cart-line-item__sku {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.cart-line-item__unit-price {
  font-size: 14px;
  color: #666;
}

.cart-line-item__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-line-item__qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-button {
  width: 48px;
  height: 48px;
  border: 2px solid #4caf50;
  background: white;
  color: #4caf50;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-button:hover:not(:disabled) {
  background: #4caf50;
  color: white;
}

.qty-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-display {
  min-width: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.cart-line-item__total {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  min-width: 80px;
  text-align: right;
}

.remove-button {
  width: 48px;
  height: 48px;
  border: 2px solid #f44336;
  background: white;
  color: #f44336;
  border-radius: 8px;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-button:hover {
  background: #f44336;
  color: white;
}
</style>
