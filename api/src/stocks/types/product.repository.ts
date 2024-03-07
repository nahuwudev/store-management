import { Product, NewProduct, updateProduct } from "./product.type";

export interface IProductRepository {
  /* Gets */
  findById(id: string): Product | null;
  findAll(): Product[] | null;

  /* POST */
  createProduct(product: NewProduct): Product | null;
  /* Delete */
  deleteProduct(productId: string): null;
  /* Update Product */
  updateProduct(
    productId: string,
    updateProduct: updateProduct
  ): Product | null;
}
