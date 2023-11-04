<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import 'primevue/resources/primevue.min.css' // importa los estilos de PrimeVue

</script>

<template>
  <nav class="flex align-botton justify-center space-x-10 py-2 px-2 shadow-lg mx-10 ">
    <a href="https://portfoliotony41.netlify.app/" target="_blank" rel="noopener noreferrer">
      <img src="../public/OcticonHome.svg" alt="portafolio"
        class="h-5  transition duration-700 ease-in-out hover:h-4 "></a>
    <RouterLink :to="{ name: 'productos' }" class="font-bold hover:shadow-md hover:font-md">
      PRODUCTOS
    </RouterLink>
    <router-link :to="{ name: 'cart' }" class="font-bold hover:shadow-md hover:font-md ">CART</router-link>

  </nav>

  <RouterView />
</template>

<style scoped>
  .sidebar {
    display: flex;
    justify-content: space-between;
  }
</style>
