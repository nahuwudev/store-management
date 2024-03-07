import { useQuery } from "react-query";
import { getAllProviders } from "../axios/provider";
import { notify } from "../fn/notify";

export default function useQueryProvider() {
  const { error, data } = useQuery("providerData", async () =>
    getAllProviders().then((products) => products)
  );

  if (error) notify("Error getting data");
  return data;
}
