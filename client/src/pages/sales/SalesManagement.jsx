import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Card,
  Chip,
  Tab,
  Tabs,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { SalesColumns as headerColumns } from "../../utils/constants/saleData";
import { useSaleStore } from "../../utils/store/sales";
import { DeleteIcon } from "../../components/svg/DeleteIcon";
import { EditIcon } from "../../components/svg/EditIcon";
import SaleForm from "../../components/Forms/SaleForm";
import { useMutation, useQueryClient } from "react-query";
import { deleteSale } from "../../utils/axios/sales";
import { notify } from "../../utils/fn/notify";

export default function SalesManagement() {
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState("list");
  const { allSales, setSale } = useSaleStore();
  const rowsPerPage = 10;
  const queryClient = useQueryClient();

  const pages = Math.ceil(allSales.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allSales.slice(start, end);
  }, [page, allSales]);

  const statusColorMap = {
    pending: "primary",
    canceled: "danger",
    completed: "success",
  };

  const deleteMutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      notify("deleted sucessfully!");
      queryClient.invalidateQueries("saleData");
    },
  });

  const renderCell = React.useCallback((row, columnKey, navigate) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "total":
        return <p className="text-xs">${cellValue}</p>;
      case "status":
        return (
          <Chip
            size="sm"
            variant="flat"
            className="text-xs capitalize"
            color={statusColorMap[row.status]}
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span
              onClick={() => {
                setSale(row);
                navigate("/invoice");
              }}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <EditIcon />
            </span>

            <span
              onClick={() => deleteMutation.mutate(row.id)}
              className="text-lg text-danger cursor-pointer active:opacity-50"
            >
              <DeleteIcon />
            </span>
          </div>
        );
      default:
        return (
          <div>
            <p className="text-[12px]">{cellValue}</p>
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
  }, [items.length, page, pages]);

  const navigate = useNavigate();

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      className="flex  justify-center"
    >
      <Tab key="list" title="List of sales">
        <Card className="max-w-[90%] mt-10 mx-auto p-5 max-h-[50rem]">
          <Table
            aria-label=" with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[480px] ",
            }}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn key={column.uid} allowsSorting={column.sortable}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No providers found"} items={items}>
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

      <Tab key="add-new" title="Add new sale">
        <Card className="max-w-[90%] mx-auto mt-10 p-5 rounded-md">
          <CardHeader>
            <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
              ADD NEW SALE
            </h4>
          </CardHeader>
          <CardBody>
            <SaleForm />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
