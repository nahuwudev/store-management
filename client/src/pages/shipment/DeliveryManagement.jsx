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
import { DeleteIcon } from "../../components/svg/DeleteIcon";
import { SelectorIcon } from "../../components/svg/SelectorIcon";
import { useNavigate } from "react-router-dom";
import { useShipmentStore } from "../../utils/store/shipment";
import { ShipmentData as headerColumns } from "../../utils/constants/shipmentData";
import { formatDate } from "../../utils/fn/formatDate";
import NewDelivery from "../../components/Forms/NewDelivery";
import { useMutation, useQueryClient } from "react-query";
import { deleteShipment } from "../../utils/axios/shipment";

export default function DeliveryManagement() {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState("list");
  const queryClient = useQueryClient();
  const [selectValue, setSelectValue] = React.useState("5");
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const { allShipments } = useShipmentStore();

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...allShipments];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((shipment) => {
        const customerNameMatch = shipment.sale.customerName
          .toLowerCase()
          .includes(filterValue.toLowerCase());

        const otherCriteriaMatch = shipment.status
          .toLowerCase()
          .includes(filterValue.toLowerCase());

        return customerNameMatch || otherCriteriaMatch;
      });
    }

    return filteredProducts;
  }, [allShipments, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const deleteDeliveryMutation = useMutation({
    mutationFn: deleteShipment,
    onSuccess: () => {
      queryClient.invalidateQueries("shipmentData");
    },
  });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const statusColorMap = {
    pending: "default",
    delivered: "success",
    canceled: "warning",
  };

  const renderCell = React.useCallback((shipment, columnKey) => {
    switch (columnKey) {
      case "customerName":
        return <p>{shipment.sale.customerName}</p>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[shipment.status]}
            size="sm"
            variant="flat"
          >
            {shipment.status}
          </Chip>
        );
      case "deliveryDate":
        return (
          <Chip className="capitalize" color="default" size="sm" variant="flat">
            {formatDate(shipment.deliveryDate)}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span
              onClick={() => deleteDeliveryMutation.mutate(shipment.id)}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </div>
        );
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
            Total {allShipments.length} shipments
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    allShipments.length,
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
            topContent={topContent}
            topContentPlacement="outside"
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No products found"} items={items}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </Tab>
      <Tab key="add-new" title="Add new product">
        <Card className="max-w-xl  mx-auto mt-5  rounded-md">
          <CardHeader>
            <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
              ADD NEW DELIVERY TO LIST
            </h4>
          </CardHeader>
          <CardBody>
            <NewDelivery />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
