export type Product = {
  id: number;
  sku: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  provider?: string;
  offer: Offer;
  createdAt: Date | string;
  updatedAt: Date | string;
};

type Offer = {
  isOffer: boolean;
  discount: number;
  discountedPrice: number;
};

export type NewProduct = Omit<
  Product,
  "id" | "sku" | "createdAt" | "updatedAt"
>;

export type updateProduct = Partial<Product>;
