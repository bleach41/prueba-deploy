<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import 'primevue/resources/primevue.min.css' // importa los estilos de PrimeVue

</script>

<template>
  <nav
    class="flex justify-center space-x-10 py-2 px-2 shadow-lg mx-10 bg-gradient-to-r from-indigo-500 rounded-l-lg z-10">
    <RouterLink :to="{ name: 'productos' }" class="hover:text-white  ">PRODUCTOS</RouterLink>
    <RouterLink :to="{ name: 'category' }" class="hover:text-white">CATEGORIA</RouterLink>
    <router-link :to="{ name: 'cart' }" class="hover:text-white">CART</router-link>

  </nav>

  <RouterView />
</template>

<style scoped>
  .sidebar {
    display: flex;
    justify-content: space-between;
  }
</style>
