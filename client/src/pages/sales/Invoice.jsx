import {
  Card,
  Accordion,
  AccordionItem,
  CardBody,
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Input,
  CardHeader,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useSaleStore } from "../../utils/store/sales";
import { SelectorIcon } from "../../components/svg/SelectorIcon";
import { useState, useEffect } from "react";
import { notify } from "../../utils/fn/notify";
import { useMutation, useQueryClient } from "react-query";
import { updateSale } from "../../utils/axios/sales";

export default function Invoice() {
  const { sale, allSales, setSale, clearSale } = useSaleStore();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(sale ? sale.products : []);
  const [total, setTotal] = useState(sale ? sale.total : 0);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      notify("updated sucessfully!");
      queryClient.invalidateQueries("saleData");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);

    setLoading(true);

    const data = {
      saleId: sale.id,
      updateSale: {
        ...formValues,
        status: "pending",
        products: productData,
        total,
      },
    };

    updateMutation.mutate(data);
    setLoading(false);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = productData.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          qty: Number(isNaN(quantity) ? 1 : quantity),
        };
      }
      return product;
    });

    setProductData(updatedProducts);
  };

  useEffect(() => {
    if (productData) {
      const newTotal = productData.reduce((acc, product) => {
        return acc + (product.qty ? product.qty : 1) * Number(product.price);
      }, 0);

      const fixedTotal = Number(newTotal.toFixed(2));

      setTotal((prevTotal) =>
        prevTotal !== fixedTotal ? fixedTotal : prevTotal
      );
    }
  }, [productData]);

  useEffect(() => {
    setProductData(sale ? sale.products : []);
  }, [sale]);

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <h4 className="flex justify-center w-full font-bold text-xl underline-offset-2 underline text-cyan-400">
          Invoice
        </h4>
      </CardHeader>
      <CardBody>
        {sale ? (
          <form onSubmit={handleForm}>
            <div className="my-5">
              <Input
                defaultValue={sale.customerName}
                name="customerName"
                label="Customer name"
              />
            </div>

            <div className="my-5 [&>div]:my-5 flex gap-10">
              <Input
                name="paymentMethod"
                defaultValue={sale.paymentMethod}
                label="Payment method"
              />
              <Input
                startContent="$"
                value={total}
                name="total"
                label="Total"
              />
            </div>

            <Accordion isCompact className="bg-slate-200  my-5 p-3 rounded-md ">
              <AccordionItem key="1" aria-label="Accordion 1" title="Products">
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>QUANTITY</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {productData.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            name={`product${index}`}
                            defaultValue={product.name}
                            className=""
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            className="w-24"
                            startContent="$"
                            type="number"
                            name={`price${index}`}
                            value={product.price}
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name={`quantity${index}`}
                            className="w-20"
                            min={1}
                            type="number"
                            defaultValue={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionItem>
            </Accordion>
            <Button
              type="submit"
              aria-label="button for submit"
              className="rounded-md w-full mb-3 mt-7"
              color="primary"
              isDisabled={loading ? true : false}
            >
              Update Customer
            </Button>

            <Button
              type="button"
              onClick={clearSale}
              className="rounded-md w-full mt-3 mb-7"
              color="default"
              aria-label="button for clear selected sale"
            >
              Select other invoice
            </Button>
          </form>
        ) : (
          <Autocomplete
            placeholder="Search sale id"
            defaultItems={allSales}
            labelPlacement="outside"
            disableSelectorIconRotation
            aria-label="select"
            selectorIcon={<SelectorIcon />}
          >
            {(item) => (
              <AutocompleteItem
                aria-label="options"
                onClick={() => setSale(item)}
                key={item.id}
              >
                {item.id}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      </CardBody>
    </Card>
  );
}
