import { defineStore } from 'pinia'

export const useFoodStore = defineStore('food', {
  state: () => ({
    categories: ['All', 'Starters', 'Main Course', 'Beverages', 'Desserts'],
    menuItems: [
      { id: 1, name: 'Spring Rolls', category: 'Starters', price: 5.99, description: 'Crispy vegetable rolls served with sweet chili sauce' },
      { id: 2, name: 'Garlic Bread', category: 'Starters', price: 4.49, description: 'Toasted baguette slices with garlic butter and herbs' },
      { id: 3, name: 'Grilled Chicken Burger', category: 'Main Course', price: 11.99, description: 'Juicy chicken breast with lettuce, tomato, and special sauce' },
      { id: 4, name: 'Pasta Primavera', category: 'Main Course', price: 13.50, description: 'Fettuccine tossed with fresh garden vegetables and parmesan' },
      { id: 5, name: 'Margherita Pizza', category: 'Main Course', price: 12.99, description: 'Classic cheese and tomato pizza with basil leaves' },
      { id: 6, name: 'Iced Lemon Tea', category: 'Beverages', price: 3.25, description: 'Refreshing brewed tea with lemon and mint' },
      { id: 7, name: 'Berry Smoothie', category: 'Beverages', price: 4.95, description: 'Blended mixed berries with yogurt and honey' },
      { id: 8, name: 'Chocolate Lava Cake', category: 'Desserts', price: 6.50, description: 'Warm molten chocolate cake with vanilla ice cream' }
    ],
    cart: []
  }),
  getters: {
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartSubtotal: (state) => Number(state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)),
    taxAmount: (state) => Number((state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05).toFixed(2)),
    totalBill: (state) => {
      const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.05
      return Number((subtotal + tax).toFixed(2))
    }
  },
  actions: {
    addToCart(item) {
      const existing = this.cart.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        })
      }
    },
    incrementQuantity(id) {
      const item = this.cart.find((i) => i.id === id)
      if (item) {
        item.quantity += 1
      }
    },
    decrementQuantity(id) {
      const item = this.cart.find((i) => i.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          this.removeFromCart(id)
        }
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((i) => i.id !== id)
    },
    clearCart() {
      this.cart = []
    }
  }
})
