import { ref } from "vue";

class ProductsService {
    products;
    constructor() {
        this.products = ref([]);
    }
    getProducts() {
        return this.products;
    }

    async fetchAll() {
        try {
            const url = "https://fakestoreapi.com/products";
            const response = await fetch(url);
            const json = await response.json();
            this.products.value = await json;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ProductsService;
