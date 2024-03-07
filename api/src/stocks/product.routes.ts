import {
  DatabaseContainer,
  IDatabaseContainer,
} from "../../database/container";
import { ProductService } from "./product.service";
import { ProductsController } from "./product.controller";

import express, { Router } from "express";

export class ProductRoute {
  private router: Router = express.Router();
  private productController: ProductsController;

  constructor() {
    const container: IDatabaseContainer = new DatabaseContainer();
    const databaseClient: ProductService =
      container.resolve<ProductService>(ProductService);
    this.productController = new ProductsController(databaseClient);

    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/products", this.productController.findAll);
    this.router.get("/products/:productId", this.productController.findById);

    this.router.post("/products/create", this.productController.createProduct);

    this.router.patch("/products/update", this.productController.updateProduct);

    this.router.delete(
      "/products/delete",
      this.productController.deleteProduct
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
