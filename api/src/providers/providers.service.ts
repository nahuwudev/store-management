import { faker } from "@faker-js/faker";
import data from "../../database/provider.json";
import { logger } from "../../winston/logger";
import { Provider, NewProvider, UpdateProvider } from "./types/providers.types";
import fs from "fs";
import { IProviderRepository } from "./types/providers.repository";

export class ProviderService implements IProviderRepository {
  private data: Provider[] = [];

  constructor() {
    this.data = data as [];
  }

  private writeData() {
    return fs.writeFileSync(
      "./database/provider.json",
      JSON.stringify(this.data, null, 2)
    );
  }

  createProvider(provider: NewProvider): Provider | null {
    try {
      const newProvider: Provider = {
        id: crypto.randomUUID(),
        ...provider,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      this.data.push(newProvider);

      this.writeData();
      return newProvider;
    } catch (error) {
      logger.error("Error trying to create a new provider:", error);
      throw new Error("Error trying to create a new provider.");
    }
  }

  deleteProvider(providerId: string): null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === providerId);

      if (findIndex === -1) throw new Error("Product not found");

      this.data.splice(findIndex, 1);

      this.writeData();
      return null;
    } catch (error) {
      logger.error("Error trying to delete the provider:", error);
      throw new Error("Error trying delete the provider.");
    }
  }

  updateProvider(
    providerId: string,
    updatedProvider: Partial<Provider>
  ): Provider | null {
    try {
      const findIndex = this.data.findIndex((item) => item.id === providerId);

      if (findIndex === -1) throw new Error("Product not found");

      this.data[findIndex] = {
        ...this.data[findIndex],
        ...updatedProvider,
        id: providerId,
      };

      this.writeData();
      return this.data[findIndex];
    } catch (error) {
      logger.error("Error trying to update the provider:", error);
      throw new Error("Error trying to update the provider.");
    }
  }

  findById(id: string): Provider | null {
    try {
      if (!id) return null;

      const sale = this.data.find((item) => item.id === id);

      if (!sale) return null;

      return sale;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding provider");
    }
  }

  findAll(): Provider[] | null {
    try {
      const sales = this.data;
      return sales;
    } catch (error) {
      logger.error(error);
      throw new Error("Error finding all provider");
    }
  }
}
