<script setup>

    import { useMyStore } from '../store/CartStore';
    import { computed } from 'vue'
    import Card from 'primevue/card'
    import Button from 'primevue/button'
    import 'primeicons/primeicons.css'


    const myStore = useMyStore();
    const carrito = myStore.getCarrito;
    const productoSeleccionado = myStore.getProductoSeleccionado;

    let cant_productos = computed(() => carrito.length);
    let total = computed(() => {
        let total = 0;
        carrito.forEach((producto) => {
            total += producto.price;
        });
        return Number(total.toFixed(2));
    });


    function Eliminar(producto) {

        myStore.eliminarProductoDelCarrito(producto)
    }

    function vaciarCarrito(carrito) {
        myStore.vaciarCarro(carrito)
    }
</script>

<template>
    <div class="grid grid-cols-1 gap-4 place-items-center">
        <h2 class="my-10">Tus productos: {{ cant_productos }}</h2>
        <h2 class="my-10">total: ${{ total }}</h2>

        <div class="flex gap-10">
            <button class="border-solid border-2 border-sky-500 p-2 hover:bg-slate-300" @click="vaciarCarrito">Vaciar
                Carrito</button>
            <button class="border-solid border-2 border-sky-500 p-2  hover:bg-slate-300">Pagar</button>
        </div>

        <!-- <div v-if="productoSeleccionado">

            <Card :value="productoSeleccionado" dataKey="id" style="width: 25em">
                <template #header>
                    <img alt="producto" :src="productoSeleccionado.image" width="100" class="" />
                </template>
                <template #title> {{ productoSeleccionado.title }} </template>
                <template #subtitle> ${{ productoSeleccionado.price }}</template>
                <template #content>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                        repudiandae
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis
                        esse,
                        cupiditate neque
                        quas!
                    </p>
                </template>
                <template #footer>
                    <Button icon="pi pi-check" label="Elimnar" @click="Eliminar" />

                </template>
            </Card>
        </div> -->

        <div v-if="carrito">
            <ul>
                <li v-for="producto in carrito" :key="producto.id">
                    <Card :value="producto" dataKey="id" style="width: 25em">
                        <template #header>
                            <img alt="producto" :src="producto.image" width="100" class="" />
                        </template>
                        <template #title> {{ producto.title }} </template>
                        <template #subtitle> ${{ producto.price }}</template>
                        <template #content>
                            <p class="m-0">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                                repudiandae
                                numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam
                                perferendis
                                esse,
                                cupiditate neque
                                quas!
                            </p>
                        </template>
                        <template #footer>
                            <Button icon="pi pi-check" label="Elimnar" @click="Eliminar(producto)" />

                        </template>
                    </Card>
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped></style>