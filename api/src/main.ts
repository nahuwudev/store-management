import express, { Application } from "express";
import cors from "cors";
import { config } from "../config";
import { ProductRoute } from "./stocks/product.routes";
import { SalesRoutes } from "./sales/sales.routes";
import { ProviderRoutes } from "./providers/providers.routes";
import { ShipmentRoutes } from "./shipment/shipment.routes";

export class Main {
  private app: Application = express();
  private products: ProductRoute = new ProductRoute();
  private sales: SalesRoutes = new SalesRoutes();
  private provider: ProviderRoutes = new ProviderRoutes();
  private shipment: ShipmentRoutes = new ShipmentRoutes();

  constructor() {
    this.middlewares();

    this.routes();
    this.start();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "http://localhost:5173" }));
  }

  routes() {
    this.app.use("/api", this.products.getRouter());
    this.app.use("/api", this.sales.getRouter());
    this.app.use("/api", this.provider.getRouter());
    this.app.use("/api", this.shipment.getRouter());
  }

  start() {
    this.app.listen(config.PORT, () => {
      console.info(`Server running in port: ${config.PORT}`);
    });
  }
}

new Main();
