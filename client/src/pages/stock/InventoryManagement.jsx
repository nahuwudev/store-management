import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Card,
  Select,
  SelectItem,
  Tab,
  Tabs,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import { SearchIcon } from "../../components/svg/SearchIcon";
import { StockColumns as headerColumns } from "../../utils/constants/stockData";
import { DeleteIcon } from "../../components/svg/DeleteIcon";
import { EditIcon } from "../../components/svg/EditIcon";
import { SelectorIcon } from "../../components/svg/SelectorIcon";
import { useNavigate } from "react-router-dom";
import { useStockStore } from "../../utils/store/stock";
import { useProviderStore } from "../../utils/store/provider";
import ProductForm from "../../components/Forms/ProductForm";
import { deleteProduct } from "../../utils/axios/stock";
import { notify } from "../../utils/fn/notify";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";

export default function InventoryManagement() {
  const queryClient = useQueryClient();
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState("list");
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "id",
    direction: "ascending",
  });
  const [selectValue, setSelectValue] = React.useState("5");
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const { setSelectedProduct, allProducts } = useStockStore();
  const { setProviderByName } = useProviderStore();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("stockData");
      notify("product deleted successfully!");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...allProducts];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(filterValue.toLowerCase());
        const offerMath = product.offer.isOffer
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());

        return nameMatch || offerMath;
      });
    }

    return filteredProducts;
  }, [allProducts, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const statusColorMap = {
    false: "danger",
    true: "success",
  };

  const renderCell = React.useCallback((product, columnKey, navigate) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">${cellValue}</p>
          </div>
        );
      case "provider":
        return (
          <div
            onClick={() => {
              setProviderByName(product.provider);
              navigate("/supplier-information");
            }}
            className="flex flex-col cursor-pointer"
          >
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "discount":
        return (
          <div className="flex flex-col">
            <p
              className={`text-bold text-small capitalize ${
                product.offer.isOffer ? "text-success-300" : "text-warning-0"
              }`}
            >
              {product.offer.discount}%
            </p>
          </div>
        );
      case "discountedPrice":
        return (
          <div className="flex flex-col">
            <p
              className={`text-bold text-small capitalize ${
                product.offer.isOffer ? "text-success-300" : "text-warning-0"
              }`}
            >
              ${product.offer.discountedPrice}
            </p>
          </div>
        );
      case "offer":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[product.offer.isOffer]}
            size="sm"
            variant="flat"
          >
            {product.offer.isOffer.toString()}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span
              onClick={() => {
                setSelectedProduct(product);
                navigate("/product-information");
              }}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <EditIcon />
            </span>

            <span
              onClick={() => {
                const productId = product.id;
                console.log("productId to delete:", { productId });
                deleteProductMutation.mutate({ productId });
              }}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setSelectValue(e.target.value);
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-fullh  sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Select
              label="Rows per page"
              defaultSelectedKeys={[selectValue]}
              className="w-36"
              variant="underlined"
              onChange={onRowsPerPageChange}
              selectorIcon={<SelectorIcon />}
            >
              <SelectItem key="5" value="5">
                5
              </SelectItem>
              <SelectItem key="10" value="10">
                10
              </SelectItem>
              <SelectItem key="15" value="15">
                15
              </SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <span className="text-default-400 text-small">
            Total {allProducts.length} products
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    allProducts.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  const navigate = useNavigate();

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      className="flex  justify-center"
    >
      <Tab key="list" title="List of inventory">
        <Card className="max-w-[90%]  mx-auto mt-10 p-5 max-h-[50rem]">
          <Table
            aria-label=" table with custom cells and pagination "
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[480px] ",
            }}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No products found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey, navigate)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </Tab>
      <Tab key="add-new" title="Add new product">
        <Card className="max-w-2xl  mx-auto mt-5  rounded-md">
          <CardHeader>
            <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
              ADD NEW PRODUCT TO STOCK LIST
            </h4>
          </CardHeader>
          <CardBody>
            <ProductForm />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
