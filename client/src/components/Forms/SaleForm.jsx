import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { notify } from "../../utils/fn/notify";
import { useEffect, useState } from "react";

import { useSaleStore } from "../../utils/store/sales";
import { useStockStore } from "../../utils/store/stock";
import { DeleteIcon } from "../svg/DeleteIcon";

import { useQueryClient, useMutation } from "react-query";
import { addNewSale } from "../../utils/axios/sales";

export default function SaleForm() {
  const [loading, setLoading] = useState(false);
  const { setSale } = useSaleStore();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formDataValues, setFormDataValues] = useState();
  const [quantityValues, setQuantityValues] = useState({});
  const [total, setTotal] = useState(0);
  const { allProducts } = useStockStore();
  const [numFields, setNumFields] = useState(1);
  const queryClient = useQueryClient();

  const styleForOneInputInRow = "my-10 mx-auto ";
  const styleForTwoInputInRow =
    "my-5   gap-5 flex items-center xs:flex-col ss:flex-row";

  const addProductField = () => {
    setNumFields((prevNumFields) => prevNumFields + 1);
  };

  const deleteProductField = () => {
    setNumFields((prevNumFields) => prevNumFields - 1);
  };

  const addNewMutation = useMutation({
    mutationFn: addNewSale,
    onSuccess: () => {
      notify("Sale Added successfully.");
      queryClient.invalidateQueries("saleData");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    setSale(formDataValues);

    const data = {
      total: formDataValues.total,
      customerName: formValues.customerName,
      paymentMethod: formValues.paymentMethod,
      products: formDataValues.products,
      shippingAddress: {
        city: formValues.city,
        country: formValues.country,
        state: formValues.state,
        street: formValues.street,
        zipCode: formValues.zipCode,
      },
      status: "pending",
    };

    addNewMutation.mutate(data);
    setLoading(false);
  };

  useEffect(() => {
    const products = selectedProducts.map(({ item, index, price }) => ({
      id: item,
      price: Number(price),
      quantity: Number(
        isNaN(quantityValues[`quantity${index}`])
          ? 1
          : quantityValues[`quantity${index}`]
      ),
    }));

    const data = {
      products,
      total: total,
    };

    setFormDataValues(data);
  }, [selectedProducts, quantityValues]);

  useEffect(() => {
    if (formDataValues && formDataValues.products) {
      const newTotal = formDataValues.products.reduce((acc, product) => {
        return acc + Number(product.quantity) * Number(product.price);
      }, 0);

      const fixedTotal = Number(newTotal.toFixed(2));

      setTotal((prevTotal) =>
        prevTotal !== fixedTotal ? fixedTotal : prevTotal
      );
    }
  }, [formDataValues]);

  const paymentMethods = [
    {
      name: "credit_card",
      label: "Credit Card",
    },
    {
      name: "debit_card",
      label: "Debit card",
    },
    {
      name: "paypal",
      label: "Paypal",
    },
    {
      name: "cash",
      label: "Cash",
    },
    {
      name: "bank_transfer",
      label: "Bank transfer",
    },
    {
      name: "crypto",
      label: "crypto",
    },
  ];

  return (
    <form onSubmit={handleForm}>
      {[...Array(numFields)].map((_, index) => (
        <div key={index} className={styleForTwoInputInRow}>
          <Autocomplete
            allowsCustomValue
            label="Search product"
            name={`product${index}`}
            variant="bordered"
            defaultItems={allProducts}
            className="h-12"
          >
            {(item) => (
              <AutocompleteItem
                onClick={() =>
                  setSelectedProducts((prevValues) => {
                    const updatedValues = Array.isArray(prevValues)
                      ? [...prevValues]
                      : [];
                    updatedValues.push({
                      item: item.id,
                      index,
                      price: item.price,
                    });
                    return updatedValues;
                  })
                }
                key={item.sku}
              >
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Input
            size="sm"
            variant="bordered"
            type="number"
            min={1}
            onChange={(e) =>
              setQuantityValues((prevValues) => ({
                ...prevValues,
                [`quantity${index}`]: Number(e.target.value),
              }))
            }
            defaultValue={1}
            name={`quantity${index}`}
            className=" xxs:w-full sm:w-32"
          />

          <div className="flex gap-5">
            <Button
              color="primary"
              className="rounded-md flex items-center px-[0.90rem] text-xs h-12"
              onClick={addProductField}
            >
              Add Product
            </Button>

            {index > 0 && (
              <Button
                color="danger"
                className="rounded-md flex items-center  h-12"
                onClick={deleteProductField}
                size="sm"
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className={styleForOneInputInRow}>
        <Input
          label="Total"
          type="number"
          variant="bordered"
          name="total"
          value={total}
        />
      </div>

      <div className={styleForTwoInputInRow}>
        <Input
          name="customerName"
          type="text"
          variant="bordered"
          label="Customer"
          placeholder="type customer name here..."
        />

        <Select
          variant="bordered"
          label="Select payment method"
          name="paymentMethod"
        >
          {paymentMethods.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className={styleForTwoInputInRow}>
        <Input
          name="city"
          type="text"
          variant="bordered"
          label="City"
          placeholder="type city here..."
        />

        <Input
          name="country"
          type="text"
          variant="bordered"
          label="Country"
          placeholder="type country here..."
        />
      </div>

      <div className={styleForTwoInputInRow}>
        <Input
          name="state"
          type="text"
          variant="bordered"
          label="State"
          placeholder="type state here..."
        />

        <Input
          name="street"
          type="text"
          variant="bordered"
          label="Street"
          placeholder="type street here..."
        />

        <Input
          name="zipCode"
          type="number"
          variant="bordered"
          label="Zip Code"
          placeholder="type zip code here..."
        />
      </div>

      <div className={styleForOneInputInRow}>
        <Button
          type="submit"
          className="bg-blue-200 text-black  rounded-md mt-5 font-light"
          variant="faded"
          fullWidth={true}
          isLoading={loading ? true : false}
        >
          Create sale
        </Button>
      </div>
    </form>
  );
}
