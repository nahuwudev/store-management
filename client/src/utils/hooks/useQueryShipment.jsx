import { useQuery } from "react-query";
import { getAllShipment } from "../axios/shipment";
import { notify } from "../fn/notify";

export default function useQuerySales() {
  const { error, data } = useQuery("shipmentData", async () =>
    getAllShipment().then((shipment) => shipment)
  );

  if (error) notify("Error getting data");
  return data;
}
