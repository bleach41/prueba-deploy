<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import 'primevue/resources/primevue.min.css' // importa los estilos de PrimeVue
  import { useMyStore } from './store/CartStore';
  import { computed } from 'vue'


  const myStore = useMyStore();
  const carrito = myStore.getCarrito;
  let cant_productos = computed(() => carrito.length);

</script>

<template>
  <div class="relative">
    <nav
      class="fixed top-0 left-0 right-0 z-10 backdrop-filter backdrop-blur flex align-middle justify-center space-x-10 py-2 px-2 shadow-lg mx-10 mb-20">
      <a href="https://portfoliotony41.netlify.app/" target="_blank" rel="noopener noreferrer">
        <img src="../public/OcticonHome.svg" alt="portafolio"
          class="h-5  transition duration-700 ease-in-out hover:h-4 "></a>
      <RouterLink :to="{ name: 'productos' }" class=" felx font-bold hover:shadow-md hover:font-md">
        PRODUCTOS
      </RouterLink>
      <RouterLink :to="{ name: 'cart' }" class="flex"><img src="../public/MdiCartVariant.svg" alt="portafolio"
          class="h-5">{{ cant_productos }}</RouterLink>

    </nav>
  </div>
  <RouterView />
</template>

<style scoped>
  .sidebar {
    display: flex;
    justify-content: space-between;
  }
</style>
