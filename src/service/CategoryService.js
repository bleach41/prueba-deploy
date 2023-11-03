import { ref } from "vue";

class categoryService {
    category;
    constructor() {
        this.category = ref([]);
    }
    getCategory() {
        return this.category;
    }

    async fetchAll() {
        try {
            const url = "https://fakestoreapi.com/products/categories";
            const response = await fetch(url);
            const json = await response.json();
            this.category.value = await json;
        } catch (error) {
            console.error(error);
        }
    }
}

export default categoryService;
