import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
    state: () => ({
        carrito: [],
        productoSeleccionado: null,
    }),

    getters: {
        getProductoSeleccionado: (state) => state.productoSeleccionado,
        getCarrito: (state) => state.carrito,
    },

    actions: {
        agregarAlCarrito(producto) {
            this.carrito.push(producto);
        },

        setProductoSeleccionado(producto) {
            this.productoSeleccionado = producto;
        },
    },
});