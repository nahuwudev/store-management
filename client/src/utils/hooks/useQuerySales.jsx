import { useQuery } from "react-query";
import { getAllSales } from "../axios/sales";
import { notify } from "../fn/notify";

export default function useQuerySales() {
  const { error, data } = useQuery("saleData", async () =>
    getAllSales().then((sales) => sales)
  );

  if (error) notify("Error getting data");
  return data;
}
