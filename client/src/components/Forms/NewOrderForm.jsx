import { Input, Button } from "@nextui-org/react";
import { notify } from "../../utils/fn/notify";
import { useState } from "react";
import { formDataProductAndQuantity } from "../../utils/constants/form";

export default function NewOrderForm({ data }) {
  const [loading, setLoading] = useState(false);

  const styleForOneInputInRow = "my-5 mx-auto lg:max-w-lg xxs:max-w-md";
  const styleForTwoInputInRow =
    "my-5 mx-auto lg:max-w-lg xxs:max-w-md gap-10 flex xs:flex-col ss:flex-row";

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    setLoading(false);
    notify("Provider Added successfully. Redirecting");
  };

  return (
    <form className="mb-10" onSubmit={handleForm}>
      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type provider here..."
          label="provider"
          variant="bordered"
          name="provider"
          type="text"
          defaultValue={data ? data.provider : ""}
        />
      </div>

      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type delivery date here..."
          label="delivery date"
          variant="bordered"
          name="deliveryDate"
          type="text"
          defaultValue={data ? data.deliveryDate : ""}
        />
      </div>

      <div className={styleForTwoInputInRow}>
        {formDataProductAndQuantity.map((input) => (
          <Input
            key={input.name}
            placeholder={input.placeholder}
            type={input.type}
            variant="bordered"
            label={input.label}
            name={input.name}
            defaultValue={
              data
                ? input.label === "Product"
                  ? data.product
                  : data.quantity
                : ""
            }
          />
        ))}
      </div>

      <div className={styleForOneInputInRow}>
        <Button
          type="submit"
          className="bg-blue-200 text-black rounded-md mt-5 font-light"
          variant="faded"
          fullWidth={true}
          isLoading={loading ? true : false}
        >
          new order
        </Button>
      </div>
    </form>
  );
}
