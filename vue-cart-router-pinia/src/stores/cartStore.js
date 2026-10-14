import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [
      { id: 1, name: 'Wireless Laptop', price: 999, category: 'Electronics' },
      { id: 2, name: 'Noise-Canceling Headphones', price: 149, category: 'Audio' },
      { id: 3, name: 'Mechanical Keyboard', price: 79, category: 'Accessories' },
      { id: 4, name: 'Optical Gaming Mouse', price: 39, category: 'Accessories' },
      { id: 5, name: 'USB-C Docking Hub', price: 49, category: 'Electronics' }
    ],
    items: []
  }),
  getters: {
    cartCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      }
    },
    incrementQuantity(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        item.quantity--
        if (item.quantity <= 0) {
          this.removeFromCart(id)
        }
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    clearCart() {
      this.items = []
    }
  }
})
