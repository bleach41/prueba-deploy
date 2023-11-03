
<script setup>

    import { ref, onMounted } from 'vue';
    import CategoryService from '../service/CategoryService';



    const categoryService = new CategoryService();
    const category = categoryService.getCategory()


    onMounted(async () => {
        await categoryService.fetchAll()
    })

</script>


<template>
    <div>
        <h1>Categorias</h1>
        <ul>
            <li v-for="elem in category">{{ elem }}</li>
        </ul>
    </div>
</template>

<style scoped></style>