import { Input, Button } from "@nextui-org/react";
import { notify } from "../../utils/fn/notify";
import { useState } from "react";
import {
  formDataContactAndEmail,
  formCompanyAndAddress,
} from "../../utils/constants/form";
import { useProviderStore } from "../../utils/store/provider";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addNewProvider, updateProvider } from "../../utils/axios/provider";

export default function SupplierForm({ data }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { clearSelectedProvider } = useProviderStore();
  const queryClient = useQueryClient();
  const styleForOneInputInRow = "my-5 mx-auto lg:max-w-lg xxs:max-w-md";
  const styleForTwoInputInRow =
    "my-5 mx-auto lg:max-w-lg xxs:max-w-md gap-10 flex xs:flex-col ss:flex-row";

  const addNewMutation = useMutation({
    mutationFn: addNewProvider,
    onSuccess: () => {
      notify("Provider Added successfully");
      queryClient.invalidateQueries("providerData");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProvider,
    onSuccess: () => {
      notify("provider updated sucessfully. Redirecting...");
      queryClient.invalidateQueries("providerData");
      navigate("/provider-management");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const provider = Object.fromEntries(formData);

    if (location === "/supplier-information") {
      const updateData = {
        providerId: data.id,
        updateProvider: provider,
      };

      updateMutation.mutate(updateData);
    }

    if (location === "/provider-management") {
      addNewMutation.mutate(provider);
    }

    setLoading(false);
  };

  return (
    <form className="mb-10" onSubmit={handleForm}>
      {formDataContactAndEmail.map((input, index) => (
        <div key={index} className={styleForOneInputInRow}>
          <Input
            placeholder={input.placeholder}
            type={input.type}
            variant="bordered"
            label={input.label}
            name={input.name}
            defaultValue={
              data
                ? input.label === "Contact"
                  ? data.contactPerson
                  : data.email
                : ""
            }
          />
        </div>
      ))}

      <div className={styleForTwoInputInRow}>
        {formCompanyAndAddress.map((input, index) => (
          <Input
            key={index + 4}
            placeholder={input.placeholder}
            label={input.label}
            variant="bordered"
            name={input.name}
            type={input.type}
            defaultValue={
              data
                ? input.label === "Company"
                  ? data.company
                  : data.address
                : ""
            }
          />
        ))}
      </div>

      <div className={styleForOneInputInRow}>
        <Input
          placeholder="type phone here..."
          label="Phone"
          type="text"
          variant="bordered"
          name="phone"
          defaultValue={data ? data.phone : ""}
        />
      </div>

      {location === "/order-from-suppliers" && (
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
      )}

      {location === "/provider-management" && (
        <div className={styleForOneInputInRow}>
          <Button
            type="submit"
            className="bg-blue-200 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            isLoading={loading ? true : false}
          >
            Add new supplier
          </Button>
        </div>
      )}

      {location === "/supplier-information" && (
        <div className={styleForTwoInputInRow}>
          <Button
            type="submit"
            className="bg-blue-200 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            isLoading={loading ? true : false}
          >
            Update Information
          </Button>

          <Button
            type="button"
            className="bg-zinc-300 text-black rounded-md mt-5 font-light"
            variant="faded"
            fullWidth={true}
            onClick={clearSelectedProvider}
          >
            Select other provider
          </Button>
        </div>
      )}
    </form>
  );
}
