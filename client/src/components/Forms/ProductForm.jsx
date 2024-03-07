import { Input, Button, Switch } from "@nextui-org/react";
import { notify } from "../../utils/fn/notify";
import { useState } from "react";
import {
  formDataSkuAndName,
  formDataPriceAndStock,
  formDataCategoryAndProvider,
} from "../../utils/constants/form";
import { useStockStore } from "../../utils/store/stock";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addNewProduct, updateProduct } from "../../utils/axios/stock";

export default function ProductForm({ data }) {
  const location = useLocation().pathname;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [offervalue, setOfferValue] = useState(
    data ? data.offer.isOffer : false
  );
  const [loading, setLoading] = useState(false);
  const { clearSelectedProduct } = useStockStore();
  const styleForOneInputInRow = "my-5 mx-auto lg:max-w-lg xxs:max-w-md";
  const styleForTwoInputInRow =
    "my-5 mx-auto lg:max-w-lg xxs:max-w-md gap-10 flex xs:flex-col ss:flex-row";

  const addProductMutation = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("stockData");
      notify("product added successfully!");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("stockData");
      notify("update added successfully!");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const values = Object.fromEntries(formData);

    const dataValues = {
      product: {
        ...values,
        price: Number(values.price),
        stock: Number(values.stock),
        sku: Number(values.sku),
        offer: {
          isOffer: offervalue,
          discount: offervalue ? values.discount : 0,
        },
      },
    };

    if (location === "/inventory-management")
      addProductMutation.mutate(dataValues);
    if (location === "/product-information") {
      updateProductMutation.mutate({
        productId: data.id,
        updateProduct: dataValues.product,
      });
      navigate("/inventory-management");
    }

    setLoading(false);
  };

  return (
    <form className="mb-10" onSubmit={handleForm}>
      {formDataSkuAndName.map((input, index) => (
        <div key={index} className={styleForOneInputInRow}>
          <Input
            placeholder={input.placeholder}
            type={input.type}
            variant="bordered"
            label={input.label}
            name={input.name}
            defaultValue={
              data ? (input.label === "Sku" ? data.sku : data.name) : ""
            }
          />
        </div>
      ))}

      <div className={styleForTwoInputInRow}>
        {formDataPriceAndStock.map((input, index) => (
          <Input
            key={index + 4}
            placeholder={input.placeholder}
            label={input.label}
            variant="bordered"
            name={input.name}
            startContent={input.label === "Price" ? <span>$</span> : ""}
            type={input.type}
            defaultValue={
              data ? (input.label === "Price" ? data.price : data.stock) : ""
            }
          />
        ))}
      </div>

      <div className={styleForOneInputInRow}>
        <Switch
          onChange={() => setOfferValue(!offervalue)}
          defaultSelected={offervalue}
        >
          Offer
        </Switch>
      </div>

      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type discount here..."
          label="Discount"
          startContent="%"
          type="number"
          variant="bordered"
          name="discount"
          defaultValue={data ? data.offer.discount : ""}
          isDisabled={!offervalue ? true : false}
        />
      </div>

      {formDataCategoryAndProvider.map((input, index) => (
        <div key={index + 7} className={styleForOneInputInRow}>
          <Input
            label={input.label}
            name={input.name}
            defaultValue={
              input.label === "Category"
                ? data
                  ? data.category
                  : input.placeholder
                : data
                ? data.provider
                : input.placeholder
            }
            variant="bordered"
            placeholder={input.placeholder}
          />
        </div>
      ))}
      {location === "/add-new" ? (
        <div className={styleForOneInputInRow}>
          <Button
            type="submit"
            className="bg-blue-200 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            isLoading={loading ? true : false}
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className={styleForTwoInputInRow}>
          <Button
            type="submit"
            className="bg-blue-200 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            isLoading={loading ? true : false}
          >
            Update information
          </Button>

          <Button
            type="button"
            className="bg-zinc-300 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            onClick={clearSelectedProduct}
          >
            Select other product
          </Button>
        </div>
      )}
    </form>
  );
}
