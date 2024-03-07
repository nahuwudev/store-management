import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useProviderStore } from "../../utils/store/provider";
import SupplierForm from "../../components/Forms/SupplierForm";

export default function SupplierInformation() {
  const { allProviders, setSelectedProvider, selectedProvider } =
    useProviderStore();

  return (
    <Card className="lg:max-w-2xl xxs:max-w-lg mx-auto rounded-md">
      <CardHeader>
        <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
          SUPPLIER INFORMATION
        </h4>
      </CardHeader>
      <CardBody>
        {selectedProvider ? (
          <SupplierForm data={selectedProvider} />
        ) : (
          <Autocomplete
            label="providers"
            placeholder="Search and select provider"
            className="max-w-xs mx-auto"
          >
            {allProviders.length > 0 &&
              allProviders.map((provider) => (
                <AutocompleteItem
                  onClick={() => setSelectedProvider(provider)}
                  value={provider.contactPerson}
                  key={provider.id}
                  textValue="search and select provider"
                >
                  {provider.contactPerson}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        )}
      </CardBody>
    </Card>
  );
}
