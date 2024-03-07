import { useMutation, useQuery, useQueryClient } from "react-query";
import { addNewProduct, getAllProducts } from "../axios/stock";
import { notify } from "../fn/notify";

export default function useQueryStock() {
  const { error, data } = useQuery("stockData", async () =>
    getAllProducts().then((products) => products)
  );

  if (error) notify("Error getting data");
  return data;
}
