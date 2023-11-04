
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
    import InputSwitch from 'primevue/inputswitch'
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
            console.log('Producto enviado al almacén:', producto);
        } else {
            console.log('Ningún producto seleccionado.');
        }
    };

</script>


<template>
    <div>

        <div class="contenedor_categorias my-10">
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

        <div class="contedor_up_tabla">
            <div class="flex flex-col mx-10">
                <span for="input-metakey" class="align-middle px-1">Multi / Sencillo</span>
                <InputSwitch v-model="metaKey" inputId="input-metakey" class="align-middle my-1" />
            </div>
            <div>
                {{ cant_cart }}
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mx-10"
                    @click="agregarAlCarrito">Add</button>

            </div>
        </div>
        <DataTable v-model:selection="selectedProducts" :value="filteredProducts" dataKey="id" selectionMode="multiple"
            :metaKeySelection="metaKey" class="mx-10" @click="enviarAlAlmacen">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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