import { create } from "zustand";

export const useSaleStore = create((set) => ({
  sale: null,
  allSales: [],

  setAllSales: (newValue) =>
    set({
      allSales: newValue,
    }),

  setSale: (newValue) =>
    set({
      sale: newValue,
    }),

  clearSale: () =>
    set({
      sale: null,
    }),
}));
