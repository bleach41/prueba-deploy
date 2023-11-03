
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
    const selectedCategory = ref(null);
    const filteredProducts = ref()
    const searchTerm = ref('');



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
        <h1>Categorias</h1>
        <div class="contenedor_categorias">
            <div v-for="elem in category">
                <Button @click="filterProductsByCategory(elem)" severity="secondary" text raised>{{ elem }}</Button>
            </div>
        </div>

    </div>
    <div>
        <h1>Lista de productos</h1>
        <p>Selected Category: {{ selectedCategory }}</p>
        <InputText v-model="searchTerm" @input="filterProductsByName" placeholder="Buscar por nombre"></InputText>
        <DataTable :value="filteredProducts" dataKey="id">
            <Column field="title" header="Title"></Column>
            <Column field="price" header="Price"></Column>
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
    .contenedor_categorias {

        display: flex;
        justify-content: space-evenly;
    }
</style>