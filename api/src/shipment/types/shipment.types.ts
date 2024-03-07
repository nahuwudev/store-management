import { Sale } from "../../sales/types/sales.type";

export type Shipment = {
  id: string;
  sale: Sale;
  status: ShipmentStatus;
  trackingNumber: number;
  deliveryDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type ShipmentStatus = "pending" | "delivered" | "canceled";

export type NewShipment = Omit<Shipment, "id">;

export type UpdateShipment = Partial<Shipment>;
