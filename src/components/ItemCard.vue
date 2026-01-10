<script setup lang="ts">
import type { Product } from "@/data/products";
import { formatMoneyFromCents } from "@/utils/money";

defineProps<{
  product: Product;
}>();

defineEmits<{
  add: [];
}>();
</script>

<template>
  <div class="item-card" @click="$emit('add')">
    <div class="item-card__name">{{ product.name }}</div>
    <div class="item-card__sku">{{ product.sku }}</div>
    <div class="item-card__price">
      {{ formatMoneyFromCents(product.priceCents) }}
    </div>
  </div>
</template>

<style scoped>
/* Product card with larger tap target for kiosk use */
.item-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 28px 24px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  min-height: 140px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-card:hover {
  border-color: #4caf50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.item-card__name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.item-card__sku {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.item-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #4caf50;
}
</style>
