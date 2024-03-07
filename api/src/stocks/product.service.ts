import { faker } from "@faker-js/faker";
import data from "../../database/products.json";
import { logger } from "../../winston/logger";
import { IProductRepository } from "./types/product.repository";
import { Product } from "./types/product.type";
import fs from "fs";

export class ProductService implements IProductRepository {
  data: Product[] = [];

  constructor() {
    this.data = data as [];
  }

  createProduct(product: Product): Product | null {
    try {
      const lastProduct = this.data.at(-1);

      if (!lastProduct) return null;

      this.data.push({
        ...product,
        id: lastProduct.id + 1,
        sku: faker.number.int(),
        offer: {
          isOffer: product.offer.isOffer,
          discount: product.offer.isOffer ? product.offer.discount : 0,
          discountedPrice: product.offer.isOffer
            ? product.price - (product.price * product.offer.discount) / 100
            : 0,
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });

      fs.writeFileSync(
        "./database/products.json",
        JSON.stringify(this.data, null, 2)
      );

      return product;
    } catch (error) {
      logger.error("Error trying to create a new product:", error);
      throw new Error("Error trying to create a new product.");
    }
  }

  deleteProduct(productId: string): null {
    try {
      const findIndex = this.data.findIndex(
        (item) => Number(item.id) === Number(productId)
      );

      if (findIndex === -1) throw new Error("Product not found");

      this.data.splice(findIndex, 1);

      fs.writeFileSync(
        "./database/products.json",
        JSON.stringify(this.data, null, 2)
      );

      return null;
    } catch (error) {
      logger.error("Error trying to delete the product:", error);
      throw new Error("Error trying delete the product.");
    }
  }

  updateProduct(productId: string, updateProduct: Product): Product | null {
    try {
      const findIndex = this.data.findIndex(
        (item) => item.id === Number(productId)
      );

      if (findIndex === -1) throw new Error("Product not found");

      this.data[findIndex] = {
        ...this.data[findIndex],
        ...updateProduct,
        id: Number(productId),
      };

      fs.writeFileSync(
        "./database/products.json",
        JSON.stringify(this.data, null, 2)
      );

      return this.data[findIndex];
    } catch (error) {
      logger.error("Error trying to update the product:", error);
      throw new Error("Error trying to update the product.");
    }
  }

  findById(id: string): Product | null {
    try {
      if (!id) return null;

      const product = this.data.find((item) => item.id === Number(id));

      if (!product) return null;

      return product;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding product");
    }
  }

  findAll(): Product[] | null {
    try {
      const products = this.data;
      return products;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding all products");
    }
  }
}
