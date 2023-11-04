<script setup>

    import { useMyStore } from '../store/CartStore';
    import Card from 'primevue/card'
    import Button from 'primevue/button'
    const myStore = useMyStore();
    const carrito = myStore.getCarrito;
    const productoSeleccionado = myStore.getProductoSeleccionado;
</script>

<template>
    <div>
        <h2>Carrito de compras</h2>

        <!-- <ul>
            <li v-for="producto in carrito" :key="producto.id">
                {{ producto.title }} - {{ producto.price }}
            </li>
        </ul> -->

        <div v-if="productoSeleccionado">
            <h3>Producto seleccionado:</h3>
            <p>{{ productoSeleccionado.title }} - {{ productoSeleccionado.price }}</p>
        </div>
    </div>


    <!-- 
    <Card style="width: 25em">
        <template #header>

        </template>
        <template #title> {{ producto.title }} </template>
        <template #subtitle> {{ producto.price }}</template>
        <template #content>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse,
                cupiditate neque
                quas!
            </p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
        </template>
    </Card> -->
</template>

<style scoped></style>