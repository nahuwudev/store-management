import { Provider, NewProvider, UpdateProvider } from "./providers.types";

export interface IProviderRepository {
  /* Gets */
  findById(id: string): Provider | null;
  findAll(): Provider[] | null;

  /* POST */
  createProvider(provider: NewProvider): Provider | null;
  /* Delete */
  deleteProvider(providerId: string): null;
  /* Update Product */
  updateProvider(
    providerId: string,
    updatedProvider: UpdateProvider
  ): Provider | null;
}
