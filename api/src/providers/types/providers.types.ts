export type Provider = {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type NewProvider = Omit<Provider, "id" | "createdAt" | "updatedAt">;

export type UpdateProvider = Partial<Provider>;
