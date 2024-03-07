import { Sale, NewSale, updateSale } from "./sales.type";

export interface ISalesRepository {
  /* Gets */
  findById(id: string): Sale | null;
  findAll(): Sale[] | null;

  /* POST */
  createSale(sale: NewSale): Sale | null;
  /* Delete */
  deleteSale(saleId: string): null;
  /* Update */
  updateSale(saleId: string, updateSale: updateSale): Sale | null;
}
