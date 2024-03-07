import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { notify } from "../../utils/fn/notify";
import { useState } from "react";
import { useSaleStore } from "../../utils/store/sales";
import { useMutation, useQueryClient } from "react-query";
import { addNewProvider } from "../../utils/axios/shipment";

export default function NewDelivery({ data }) {
  const [loading, setLoading] = useState(false);
  const { allSales } = useSaleStore();
  const styleForOneInputInRow = "my-5 mx-auto lg:max-w-lg xxs:max-w-md";
  const clientQuery = useQueryClient();

  const addMutationDelivery = useMutation({
    mutationFn: addNewProvider,
    onSuccess: () => {
      clientQuery.invalidateQueries("shipmentData");
      notify("shipment added successfully! ");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const sale = allSales.find((s) => s.id === data.sale);

    data.sale = sale;

    console.log(data);
    addMutationDelivery.mutate(data);
    setLoading(false);
  };

  return (
    <form className="mb-10" onSubmit={handleForm}>
      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type customer here..."
          label="Customer"
          variant="bordered"
          name="customer"
          type="text"
          defaultValue={data ? data.sale.customerName : ""}
        />
      </div>

      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type delivery date in format y/m/d"
          label="delivery date"
          variant="bordered"
          name="deliveryDate"
          type="text"
          defaultValue={data ? data.deliveryDate : ""}
        />
      </div>

      <div className={styleForOneInputInRow}>
        <Autocomplete
          label="Search sale id"
          placeholder="search an select sale id"
          variant="bordered"
          name="sale"
          defaultItems={allSales}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.id}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <div className={styleForOneInputInRow}>
        <Button
          type="submit"
          className="bg-blue-200 text-black rounded-md mt-5 font-light"
          variant="faded"
          fullWidth={true}
          isLoading={loading ? true : false}
        >
          Add delivery
        </Button>
      </div>
    </form>
  );
}
