
<script setup>
    import 'primevue/resources/themes/lara-light-teal/theme.css'
    import { ref, onMounted } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ProductsService from '../service/ProductsService';
    import CategoryService from '../service/CategoryService';
    import Rating from 'primevue/rating';
    import InputText from 'primevue/inputtext';
    import Button from "primevue/button"
    import InputSwitch from 'primevue/inputswitch'

    //INIT
    const selectedCategory = ref(null);
    const filteredProducts = ref()
    const searchTerm = ref('');
    const selectedProduct = ref();
    const metaKey = ref(true);



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
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mx-10">comprar</button>

            </div>
        </div>
        <DataTable v-model:selection="selectedProduct" :value="filteredProducts" dataKey="id" selectionMode="multiple"
            :metaKeySelection="metaKey" class="mx-10">
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