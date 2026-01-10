<script setup lang="ts">
import { useRouter } from "vue-router";
import KioskButton from "@/components/KioskButton.vue";

const router = useRouter();

function handleStart() {
  router.push("/scan");
}
</script>

<template>
  <div class="start-view">
    <h1 class="start-view__title">Self Checkout</h1>
    <KioskButton variant="primary" @click="handleStart">Start</KioskButton>
  </div>
</template>

<style scoped>
.start-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 40px;
}

.start-view__title {
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin: 0;
}
</style>
