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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Card,
  Select,
  SelectItem,
  Link,
  Tab,
  Tabs,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import { SearchIcon } from "../../components/svg/SearchIcon";
import { SelectorIcon } from "../../components/svg/SelectorIcon";
import { useNavigate } from "react-router-dom";
import { ProviderColumns as headerColumns } from "../../utils/constants/providerData";
import { useProviderStore } from "../../utils/store/provider";
import { EditIcon } from "../../components/svg/EditIcon";
import { DeleteIcon } from "../../components/svg/DeleteIcon";
import SupplierForm from "../../components/Forms/SupplierForm";
import { useMutation, useQueryClient } from "react-query";
import { deleteProvider } from "../../utils/axios/provider";
import { notify } from "../../utils/fn/notify";

export default function ProviderManagement() {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectValue, setSelectValue] = React.useState("5");
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const { allProviders, setSelectedProvider } = useProviderStore();
  const [selected, setSelected] = React.useState("list");
  const queryClient = useQueryClient();

  const filteredItems = React.useMemo(() => {
    let filteredProvider = [...allProviders];

    if (hasSearchFilter) {
      filteredProvider = filteredProvider.filter((provider) =>
        provider.contactPerson.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProvider;
  }, [filterValue, allProviders]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const deleteMutationProvider = useMutation({
    mutationFn: deleteProvider,
    onSuccess: () => {
      notify("Provider deleted successfully");
      queryClient.invalidateQueries("providerData");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = React.useCallback((row, columnKey, navigate) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "contactPerson":
        return (
          <div className="flex flex-col">
            <p>{row.contactPerson}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
            <p className="text-xs text-slate-500">{row.address}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <span
              onClick={() => {
                setSelectedProvider(row);
                navigate("/supplier-information");
              }}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <EditIcon />
            </span>

            <span
              onClick={() => {
                deleteMutationProvider.mutate(row.id);
              }}
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
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {allProviders.length} providers
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    allProviders.length,
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
      <Tab key="list" title="List of providers">
        <Card className="max-w-[90%] mt-10 mx-auto p-5 max-h-[50rem]">
          <Table
            aria-label=" with custom cells, pagination and sorting"
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

      <Tab key="add-new" title="Add new supplier">
        <Card className="max-w-[90%] mx-auto mt-10 p-5 rounded-md">
          <CardHeader>
            <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
              ADD NEW SUPPLIER
            </h4>
          </CardHeader>
          <CardBody>
            <SupplierForm />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
