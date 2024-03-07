import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Link,
} from "@nextui-org/react";

import { useProviderStore } from "../utils/store/provider";

export default function ProviderSimpleTable() {
  const { allProviders } = useProviderStore();

  const providers = allProviders.slice(0, 5);

  return (
    <Card className="flex flex-col gap-3 p-5">
      <Link className="mb-3" href="/sales-management" showAnchorIcon>
        View Sales Management
      </Link>
      <Table color="primary" aria-label="providers table simple">
        <TableHeader>
          <TableColumn>CONTACT PERSON</TableColumn>
          <TableColumn>COMPANY</TableColumn>
          <TableColumn>PHONE</TableColumn>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>{provider.contactPerson}</TableCell>
              <TableCell>{provider.company}</TableCell>
              <TableCell>{provider.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
