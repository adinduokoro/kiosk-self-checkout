<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { formatMoneyFromCents } from "@/utils/money";
import KioskButton from "@/components/KioskButton.vue";

const router = useRouter();
const route = useRoute();
const sessionStore = useSessionStore();

const paymentMethodDisplay = computed(() => {
  const method = route.query.method as string;
  return method === "card" ? "Card" : method === "cash" ? "Cash" : "Unknown";
});

const formattedDate = computed(() => {
  if (!sessionStore.lastPaidAtIso) return "N/A";
  const date = new Date(sessionStore.lastPaidAtIso);
  return date.toLocaleString();
});

function handleDone() {
  sessionStore.resetReceipt();
  router.push("/");
}
</script>

<template>
  <div class="receipt-view">
    <header class="page-header">
      <h1 class="page-header__title">Receipt</h1>
    </header>

    <!-- Main content -->
    <main class="receipt-view__content">
      <div class="receipt-content">
        <div class="receipt-header">
          <h2>Thank you for your purchase!</h2>
        </div>

        <div class="receipt-details">
          <div class="receipt-line">
            <span class="receipt-label">Receipt ID:</span>
            <span class="receipt-value">{{ sessionStore.lastReceiptId }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Payment Method:</span>
            <span class="receipt-value">{{ paymentMethodDisplay }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Amount Paid:</span>
            <span class="receipt-value">{{
              formatMoneyFromCents(sessionStore.lastPaidTotalCents || 0)
            }}</span>
          </div>
          <div class="receipt-line">
            <span class="receipt-label">Date & Time:</span>
            <span class="receipt-value">{{ formattedDate }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer actions -->
    <footer class="receipt-view__footer">
      <KioskButton variant="primary" @click="handleDone"> Done </KioskButton>
    </footer>
  </div>
</template>

<style scoped>.receipt-view {
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
  
  .receipt-view__content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }
  
  .receipt-content {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 32px;
    margin-bottom: 32px;
  }
  
  .receipt-header {
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid #e0e0e0;
  }
  
  .receipt-header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #4CAF50;
    margin: 0;
  }
  
  .receipt-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .receipt-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }
  
  .receipt-label {
    font-size: 16px;
    font-weight: 600;
    color: #666;
  }
  
  .receipt-value {
    font-size: 18px;
    font-weight: 700;
    color: #333;
  }
  
  .receipt-view__footer {
    padding: 20px 24px;
    border-top: 2px solid #e0e0e0;
    background: white;
    display: flex;
    justify-content: center;
  }
  </style>
  
