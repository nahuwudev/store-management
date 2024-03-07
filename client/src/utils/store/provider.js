import { create } from "zustand";
import { notify } from "../fn/notify";

export const useProviderStore = create((set) => ({
  selectedProvider: null,
  allProviders: [],

  setAllProvider: (newValue) =>
    set({
      allProviders: newValue,
    }),

  setSelectedProvider: (newValue) =>
    set({
      selectedProvider: newValue,
    }),

  setProviderByName: (newValue) =>
    set((state) => {
      const filterByName = state.allProviders.filter(
        (item) => item.company === newValue
      );

      if (!filterByName || filterByName.length === 0) {
        notify("Error finding provider...");
        console.log("error finding provider");
        return state; // Devuelve el estado actual sin realizar cambios si no se encuentra el proveedor
      }

      return {
        selectedProvider: filterByName[0], // Devuelve el primer proveedor encontrado
      };
    }),

  clearSelectedProvider: () =>
    set({
      selectedProvider: null,
    }),
}));
