import {
  DatabaseContainer,
  IDatabaseContainer,
} from "../../database/container";
import { ProviderService } from "./providers.service";
import { ProviderController } from "./providers.controller";

import express, { Router } from "express";

export class ProviderRoutes {
  private router: Router = express.Router();
  private productController: ProviderController;

  constructor() {
    const container: IDatabaseContainer = new DatabaseContainer();
    const databaseClient: ProviderService =
      container.resolve<ProviderService>(ProviderService);
    this.productController = new ProviderController(databaseClient);

    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/provider", this.productController.findAll);
    this.router.get("/provider/:providerId", this.productController.findById);

    this.router.post("/provider/create", this.productController.createProvider);

    this.router.patch(
      "/provider/update",
      this.productController.updateProvider
    );

    this.router.delete(
      "/provider/delete",
      this.productController.deleteProvider
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
