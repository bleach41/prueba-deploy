<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import 'primevue/resources/primevue.min.css' // importa los estilos de PrimeVue

</script>

<template>
  <nav class="flex place-content-end space-x-10 py-2 shadow-lg mx-10">
    <RouterLink :to="{ name: 'productos' }" class="hover:text-green-800">PRODUCTOS</RouterLink>
    <RouterLink :to="{ name: 'category' }" class="hover:text-green-800">CATEGORIA</RouterLink>
    <router-link :to="{ name: 'cart' }" class="hover:text-green-800">CART</router-link>

  </nav>

  <RouterView />
</template>

<style scoped>
  .sidebar {
    display: flex;
    justify-content: space-between;
  }
</style>
