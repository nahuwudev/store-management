import { Shipment, NewShipment, UpdateShipment } from "./shipment.types";

export interface IShipmentRepository {
  /* Gets */
  findById(id: string): Shipment | null;
  findAll(): Shipment[] | null;

  /* POST */
  createShipment(sale: NewShipment): Shipment | null;
  /* Delete */
  deleteShipment(shipmentId: string): null;
  /* Update */
  updateShipment(
    shipmentId: string,
    updateShipment: UpdateShipment
  ): Shipment | null;
}
