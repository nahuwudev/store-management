import { Product } from "../../stocks/types/product.type";

export type Sale = {
  id: string;
  products: SaleProduct[];
  total: number | string;
  customerName: string;
  paymentMethod: PaymentMethod;
  status: Status;
  shippingAddress?: Address;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type SaleProduct = Product & { quantity: number };

export type Status = "pending" | "completed" | "canceled";

export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "paypal"
  | "cash"
  | "bank_transfer"
  | "crypto";

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type NewSale = Omit<Sale, "id" | "createdAt" | "updatedAt">;

export type updateSale = Partial<Sale>;
