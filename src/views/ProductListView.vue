
<script setup>
    import 'primevue/resources/themes/lara-light-teal/theme.css'
    import { ref, onMounted, toRaw } from 'vue';
    import DataTable from 'primevue/datatable';
    import DataView from 'primevue/dataview';
    import Column from 'primevue/column';
    import ProductsService from '../service/ProductsService';
    import CategoryService from '../service/CategoryService';
    import Rating from 'primevue/rating';
    import InputText from 'primevue/inputtext';
    import Button from "primevue/button"
    import 'primeicons/primeicons.css'

    import { useMyStore } from '../store/CartStore';


    //INIT
    const selectedCategory = ref(null);
    const filteredProducts = ref()
    const searchTerm = ref('');
    const selectedProducts = ref([]);
    const metaKey = ref(true);
    const cant_cart = ref(0)
    const myStore = useMyStore();


    // call Api Category
    const categoryService = new CategoryService();
    const category = categoryService.getCategory()


    // call Api Products
    const productService = new ProductsService();
    const products = productService.getProducts()
    filteredProducts.value = products.value

    onMounted(async () => {

        await categoryService.fetchAll();
        await productService.fetchAll();
        filteredProducts.value = [...products.value];

    })
    const filterProductsByCategory = (category) => {
        selectedCategory.value = category;
        if (!category) {
            filteredProducts.value = products.value;
        } else {
            filteredProducts.value = products.value.filter((product) => product.category === category);
        }
    }

    const filterProductsByName = () => {
        if (!searchTerm.value) {
            filteredProducts.value = products.value;
        } else {
            filteredProducts.value = products.value.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        }
    };

    // const Seleccion = () => {
    //     cant_cart.value++
    //     const rawProduct = toRaw(selectedProducts.value[0]);
    //     console.log(rawProduct.id);
    //     console.log(products.value[rawProduct.id])
    // };
    const enviarAlAlmacen = () => {

        const rawProduct = toRaw(selectedProducts.value[0]);
        cant_cart.value++
        if (rawProduct) {
            const producto = {
                id: rawProduct.id,
                title: rawProduct.title,
                price: rawProduct.price,
                category: rawProduct.category,
                image: rawProduct.image,
                rating: rawProduct.rating,
            };

            myStore.setProductoSeleccionado(producto);
            myStore.agregarAlCarrito(producto)
            console.log('Producto enviado al almacén:', producto);
        } else {
            console.log('Ningún producto seleccionado.');
        }
    };

</script>


<template>
    <div>

        <div class="contenedor_categorias my-10 mx-10">
            <div v-for="elem in category">
                <Button @click="filterProductsByCategory(elem)" severity="secondary" text raised class="p-1">{{ elem
                }}</Button>
            </div>
        </div>

    </div>
    <div>
        <!-- <h1>Lista de productos</h1>
        <p>Selected Category: {{ selectedCategory }} </p> -->

        <div class=" grid justify-items-center  ">
            <InputText v-model="searchTerm" @input="filterProductsByName" placeholder="Buscar por nombre"
                class="select-green-400 p-1">
            </InputText>
        </div>


        <div class="grid justify-items-end mx-40 my-5 underline decoration-sky-500/[.33]">
            current selected: {{ cant_cart }}

        </div>

        <DataTable v-model:selection="selectedProducts" :value="filteredProducts" dataKey="id" selectionMode="multiple"
            class="mx-10" @click="enviarAlAlmacen">
            <Column field="title" header="Title" class="truncate overflow-hidden">...</Column>
            <Column field="price" header="Price" price></Column>
            <Column field="category" header="Category"></Column>
            <Column field="image" header="Preview">
                <template #body="{ data }">
                    <img :src="data.image" alt="Product" width="50" height="50">
                </template>
            </Column>
            <Column field="rating.count" header="Reviews">
                <template #body="slotProps">
                    <Rating :value="slotProps.data.rating.rate" :cancel="false"></Rating>
                </template>
            </Column>
        </DataTable>
        <!-- <DataView :value="products">
            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round">
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.name }}</div>
                                <Rating :modelValue="slotProps.data.rating" readonly :cancel="false"></Rating>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                                <Button icon="pi pi-shopping-cart" rounded
                                    :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView> -->
    </div>
</template>

<style scoped>
    .contedor_up_tabla {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .contenedor_categorias {

        display: flex;
        justify-content: space-evenly;
    }

    .tabla:hover {
        background-color: bisque;
    }
</style>