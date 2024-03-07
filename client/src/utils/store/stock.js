import { create } from "zustand";

export const useStockStore = create((set) => ({
  selectedProduct: null,
  allProducts: [],

  setAllProducts: (newValue) =>
    set({
      allProducts: newValue,
    }),

  setSelectedProduct: (newValue) =>
    set({
      selectedProduct: newValue,
    }),

  clearSelectedProduct: () =>
    set({
      selectedProduct: null,
    }),
}));
