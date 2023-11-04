<script setup>

    import { useMyStore } from '../store/CartStore';
    import Card from 'primevue/card'
    import Button from 'primevue/button'


    const myStore = useMyStore();
    const carrito = myStore.getCarrito;
    const productoSeleccionado = myStore.getProductoSeleccionado;


    function Eliminar() {

        console.log(productoSeleccionado)
    }
</script>

<template>
    <div class="grid grid-cols-1 gap-4 place-items-center">
        <h2 class="my-10">Tus productos</h2>

        <div v-if="productoSeleccionado">

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
        </div>

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
                            <Button icon="pi pi-check" label="Elimnar" @click="Eliminar" />

                        </template>
                    </Card>
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped></style>