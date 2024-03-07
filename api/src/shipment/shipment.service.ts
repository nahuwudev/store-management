import { faker } from "@faker-js/faker";
import data from "../../database/shipment.json";
import { logger } from "../../winston/logger";
import { Shipment, NewShipment, UpdateShipment } from "./types/shipment.types";
import fs from "fs";
import { IShipmentRepository } from "./types/shipment.repository";

export class ShipmentService implements IShipmentRepository {
  data: Shipment[] = [];

  constructor() {
    this.data = data as [];
  }

  writeData() {
    return fs.writeFileSync(
      "./database/shipment.json",
      JSON.stringify(this.data, null, 2)
    );
  }

  createShipment(shipment: NewShipment): Shipment | null {
    try {
      const newShipment = {
        id: crypto.randomUUID(),
        ...shipment,
        deliveryDate: shipment.deliveryDate
          ? shipment.deliveryDate
          : faker.date.future(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      this.data.push(newShipment);

      this.writeData();
      return newShipment;
    } catch (error) {
      logger.error("Error trying to create a new shipment:", error);
      throw new Error("Error trying to create a new shipment.");
    }
  }

  deleteShipment(shipmentId: string): null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === shipmentId);

      if (findIndex === -1) throw new Error("shipment not found");

      this.data.splice(findIndex, 1);

      this.writeData();
      return null;
    } catch (error) {
      logger.error("Error trying to delete the shipment:", error);
      throw new Error("Error trying delete the shipment.");
    }
  }

  updateShipment(
    shipmentId: string,
    updateShipment: UpdateShipment
  ): Shipment | null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === shipmentId);

      if (findIndex === -1) throw new Error("shipment not found");

      this.data[findIndex] = {
        ...this.data[findIndex],
        ...updateShipment,
        id: shipmentId,
      };

      this.writeData();
      return this.data[findIndex];
    } catch (error) {
      logger.error("Error trying to update the shipment:", error);
      throw new Error("Error trying to update the shipment.");
    }
  }

  findById(id: string): Shipment | null {
    try {
      if (!id) return null;

      const sale = this.data.find((item) => item.id === id);

      if (!sale) return null;

      return sale;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding shipment");
    }
  }

  findAll(): Shipment[] | null {
    try {
      const sales = this.data;
      return sales;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding all shipments");
    }
  }
}
