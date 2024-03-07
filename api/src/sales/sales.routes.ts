import {
  DatabaseContainer,
  IDatabaseContainer,
} from "../../database/container";
import { SalesService } from "./sales.service";
import { SaleController } from "./sales.controller";

import express, { Router } from "express";

export class SalesRoutes {
  private router: Router = express.Router();
  private productController: SaleController;

  constructor() {
    const container: IDatabaseContainer = new DatabaseContainer();
    const databaseClient: SalesService =
      container.resolve<SalesService>(SalesService);
    this.productController = new SaleController(databaseClient);

    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/sales", this.productController.findAll);
    this.router.get("/sales/:saleId", this.productController.findById);

    this.router.post("/sales/create", this.productController.createSale);

    this.router.patch("/sales/update", this.productController.updateSale);

    this.router.delete("/sales/delete", this.productController.deleteSale);
  }

  public getRouter(): Router {
    return this.router;
  }
}
