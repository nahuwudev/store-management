import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useStockStore } from "../../utils/store/stock";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ProductForm from "../../components/Forms/ProductForm";

export default function ProductInformation() {
  const { selectedProduct, setSelectedProduct, allProducts } = useStockStore();

  return (
    <Card className="lg:max-w-2xl xxs:max-w-lg mx-auto rounded-md">
      <CardHeader>
        <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
          PRODUCT INFORMATION
        </h4>
      </CardHeader>
      <CardBody>
        {selectedProduct ? (
          <ProductForm data={selectedProduct} />
        ) : (
          <Autocomplete
            label="stock products"
            placeholder="Search and select product"
            className="max-w-xs mx-auto"
          >
            {allProducts.length > 0 &&
              allProducts.map((product) => (
                <AutocompleteItem
                  onClick={() => setSelectedProduct(product)}
                  value={product.name}
                  key={product.name}
                >
                  {product.name}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        )}
      </CardBody>
    </Card>
  );
}
