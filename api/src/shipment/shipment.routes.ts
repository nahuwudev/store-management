import {
  DatabaseContainer,
  IDatabaseContainer,
} from "../../database/container";
import { ShipmentService } from "./shipment.service";
import { ShipmentController } from "./shipment.controller";

import express, { Router } from "express";

export class ShipmentRoutes {
  private router: Router = express.Router();
  private productController: ShipmentController;

  constructor() {
    const container: IDatabaseContainer = new DatabaseContainer();
    const databaseClient: ShipmentService =
      container.resolve<ShipmentService>(ShipmentService);
    this.productController = new ShipmentController(databaseClient);

    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/shipment", this.productController.findAll);
    this.router.get("/shipment/:shipmentId", this.productController.findById);

    this.router.post("/shipment/create", this.productController.createSale);

    this.router.patch("/shipment/update", this.productController.updateSale);

    this.router.delete("/shipment/delete", this.productController.deleteSale);
  }

  public getRouter(): Router {
    return this.router;
  }
}
