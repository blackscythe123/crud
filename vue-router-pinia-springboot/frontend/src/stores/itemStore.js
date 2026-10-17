import { defineStore } from 'pinia';
import ItemService from '../services/ItemService';

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
    currentItem: null
  }),
  actions: {
    async fetchItems() {
      const res = await ItemService.getAll();
      this.items = res.data;
    },
    async fetchItemById(id) {
      const res = await ItemService.getById(id);
      this.currentItem = res.data;
      return res.data;
    },
    async addItem(data) {
      const res = await ItemService.create(data);
      await this.fetchItems();
      return res.data;
    },
    async editItem(id, data) {
      const res = await ItemService.update(id, data);
      await this.fetchItems();
      return res.data;
    },
    async removeItem(id) {
      await ItemService.delete(id);
      if (this.currentItem && this.currentItem.id === id) {
        this.currentItem = null;
      }
      await this.fetchItems();
    },
    async patchItem(id, data) {
      const res = await ItemService.patch(id, data);
      await this.fetchItems();
      return res.data;
    }
  }
});
