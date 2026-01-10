<script setup lang="ts">
  //Main app component where the router view outlet is handled
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  background: #f5f5f5;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>
