<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { getAllProducts, productBySku } from "@/data/products";
import KioskButton from "@/components/KioskButton.vue";
import ItemCard from "@/components/ItemCard.vue";

const router = useRouter();
const cartStore = useCartStore();

const skuInput = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const products = getAllProducts();

//Clear error messages when user starts typing
function clearError() {
  errorMessage.value = "";
  successMessage.value = "";
}

function handleAddBySku() {
  // Trim whitespace and convert to uppercase for consistency
  const sku = skuInput.value.trim().toUpperCase()
  
  // Validation: ignore empty input
  if (!sku) {
    errorMessage.value = 'Please enter a SKU'
    setTimeout(() => {
      errorMessage.value = ''
    }, 2000)
    return
  }

  // Look up product
  const product = productBySku(sku)
  if (product) {
    cartStore.addProduct(product, 1)
    skuInput.value = ''
    errorMessage.value = ''
    // Show success feedback
    successMessage.value = `Added ${product.name}`
    setTimeout(() => {
      successMessage.value = ''
    }, 2000)
  } else {
    // Friendly error message
    errorMessage.value = `SKU "${sku}" not found. Please check and try again.`
    setTimeout(() => {
      errorMessage.value = ''
    }, 4000)
  }
}

function handleAddProduct(product: typeof products[0]) {
  cartStore.addProduct(product, 1)
  errorMessage.value = ''
  successMessage.value = `Added ${product.name}`
  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}
</script>

<template>
  <div class="scan-view">
    <!-- Page header with consistent styling throughout the app -->
    <header class="page-header">
      <h1 class="page-header__title">Scan Items</h1>
    </header>

    <!-- Scrollable Main content area -->
    <main class="scan-view__content">
      <div class="scan-view__scan-section">
        <div class="scan-input-group">
          <input
            v-model="skuInput"
            type="text"
            class="scan-input"
            placeholder="Enter SKU or scan barcode"
            @keyup.enter="handleAddBySku"
            @input="clearError"
            autofocus
          />
          <KioskButton variant="primary" @click="handleAddBySku">
            Add
          </KioskButton>
        </div>

        <!-- Error and success messages -->
        <div v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="success-message" role="status">
          {{ successMessage }}
        </div>
      </div>

      <div class="scan-view__products">
        <h2 class="products-title">Or tap a product to add:</h2>
        <div class="products-grid">
          <ItemCard
            v-for="product in products"
            :key="product.sku"
            :product="product"
            @add="() => handleAddProduct(product)"
          />
        </div>
      </div>
    </main>

    <!-- Fixed footerbottom bar with cart status and checkout button -->
    <footer class="scan-view__footer">
      <div class="footer-cart-info">
        <span class="footer-cart-label">Items in cart:</span>
        <span class="footer-cart-count">{{ cartStore.totalItems }}</span>
      </div>
      <div class="footer-actions">
        <KioskButton variant="secondary" @click="router.push('/cart')">
          View Cart
        </KioskButton>
        <KioskButton variant="primary" :disabled="cartStore.totalItems === 0" @click="router.push('/checkout')">
          Checkout
        </KioskButton>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Consistent page layout pattern */
.scan-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

/* Page header - consistent across views */
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

/* Scrollable main content area */
.scan-view__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.scan-view__scan-section {
  margin-bottom: 32px;
}

.scan-input-group {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.scan-input {
  flex: 1;
  padding: 20px;
  font-size: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
}

.scan-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.error-message {
  padding: 16px;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  font-size: 16px;
  border-left: 4px solid #c62828;
}

.success-message {
  padding: 16px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  font-size: 16px;
  border-left: 4px solid #4CAF50;
}

.scan-view__products {
  margin-bottom: 32px;
}

.products-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

/* Fixed bottom bar with cart status and button actions */
.scan-view__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: white;
  border-top: 2px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-cart-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-cart-label {
  font-size: 18px;
  font-weight: 600;
  color: #666;
}

.footer-cart-count {
  font-size: 24px;
  font-weight: 700;
  color: #4caf50;
  padding: 8px 16px;
  background: #e8f5e9;
  border-radius: 8px;
  min-width: 60px;
  text-align: center;
}

.footer-actions {
  display: flex;
  gap: 16px;
}
</style>
