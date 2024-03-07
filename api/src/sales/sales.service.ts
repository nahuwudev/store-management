import { faker } from "@faker-js/faker";
import data from "../../database/sales.json";
import { logger } from "../../winston/logger";
import { NewSale, Sale, SaleProduct } from "./types/sales.type";
import fs from "fs";
import { ISalesRepository } from "./types/sales.repository";

export class SalesService implements ISalesRepository {
  data: Sale[] = [];

  constructor() {
    this.data = data as [];
  }

  calculateTotalOfSale(products: SaleProduct[]) {
    const totalPrice = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    return totalPrice;
  }

  writeData() {
    return fs.writeFileSync(
      "./database/sales.json",
      JSON.stringify(this.data, null, 2)
    );
  }

  createSale(sale: NewSale): Sale | null {
    try {
      console.log(sale.products);
      const newSale = {
        ...sale,
        id: crypto.randomUUID(),
        total:
          this.calculateTotalOfSale(sale.products) === sale.total
            ? sale.total
            : "Not equals",
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      this.data.push(newSale);

      this.writeData();
      return newSale;
    } catch (error) {
      logger.error("Error trying to create a new sale:", error);
      throw new Error("Error trying to create a new sale.");
    }
  }

  deleteSale(saleId: string): null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === saleId);

      if (findIndex === -1) throw new Error("Product not found");

      this.data.splice(findIndex, 1);

      this.writeData();
      return null;
    } catch (error) {
      logger.error("Error trying to delete the sale:", error);
      throw new Error("Error trying delete the sale.");
    }
  }

  updateSale(saleId: string, updateSale: Sale): Sale | null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === saleId);

      if (findIndex === -1) throw new Error("Product not found");

      this.data[findIndex] = {
        ...this.data[findIndex],
        ...updateSale,
        id: saleId,
      };

      this.writeData();
      return this.data[findIndex];
    } catch (error) {
      logger.error("Error trying to update the sale:", error);
      throw new Error("Error trying to update the sale.");
    }
  }

  findById(id: string): Sale | null {
    try {
      if (!id) return null;

      const sale = this.data.find((item) => item.id === id);

      if (!sale) return null;

      return sale;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding sale");
    }
  }

  findAll(): Sale[] | null {
    try {
      const sales = this.data;
      return sales;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding all sales");
    }
  }
}
