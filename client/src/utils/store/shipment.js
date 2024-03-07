import { create } from "zustand";

export const useShipmentStore = create((set) => ({
  shipment: null,
  allShipments: [],

  setAllShipment: (newValue) =>
    set({
      allShipments: newValue,
    }),

  setShipment: (newValue) =>
    set({
      shipment: newValue,
    }),

  clearShipment: () =>
    set({
      shipment: null,
    }),
}));
