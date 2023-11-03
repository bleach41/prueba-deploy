<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import 'primevue/resources/primevue.min.css' // importa los estilos de PrimeVue

</script>

<template>
  <nav class="sidebar">
    <RouterLink :to="{ name: 'productos' }">PRODUCTOS</RouterLink>
    <RouterLink :to="{ name: 'category' }">CATEGORIA</RouterLink>
    <router-link :to="{ name: 'cart' }">CART</router-link>

  </nav>

  <RouterView />
</template>

<style scoped>
  .sidebar {
    display: flex;
    justify-content: space-between;
  }
</style>
