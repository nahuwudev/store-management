import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";
import NewOrderForm from "../../components/Forms/NewOrderForm";
import React from "react";
import { EditIcon } from "../../components/svg/EditIcon";
import { DeleteIcon } from "../../components/svg/DeleteIcon";

export default function OrderFromSuppliers() {
  const [selected, setSelected] = React.useState("list");

  const users = [];

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <div className="">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        className="flex  justify-center"
      >
        <Tab key="list" title="List of orders">
          <Card className="lg:max-w-2xl xxs:max-w-xl mt-10  mx-auto rounded-md">
            <CardBody>
              <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
                classNames={{
                  wrapper: "min-h-[402px]",
                }}
              >
                <TableHeader>
                  <TableColumn key="provider">Provider</TableColumn>
                  <TableColumn key="deliveryDateHeader">
                    Delivery Date
                  </TableColumn>
                  <TableColumn key="product">Product</TableColumn>
                  <TableColumn key="quantity">Quantity</TableColumn>
                  <TableColumn key="deliveryDate">Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent="empty orders " items={items}>
                  {(item) => (
                    <TableRow key={item.name}>
                      {(columnKey) =>
                        columnKey === "actions" ? (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        ) : (
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

                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                              <DeleteIcon />
                            </span>
                          </div>
                        )
                      }
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="new-order" title="New order">
          <Card className="lg:max-w-2xl xxs:max-w-lg mt-10  mx-auto rounded-md">
            <CardHeader>
              <h4 className="underline underline-offset-4 mt-2 font-extrabold text-slate-400 text-xl w-full flex justify-center">
                NEW ORDER
              </h4>
            </CardHeader>
            <CardBody>
              <NewOrderForm />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
