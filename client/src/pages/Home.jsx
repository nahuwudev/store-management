import * as React from "react";
import Widget from "../components/Widget";
import ProviderSimpleTable from "../components/SalesTable";
import LineGraph from "../components/Charts/Line";
import {
  saleCard,
  productCard,
  providerCard,
  shipmentCard,
} from "../utils/constants/widget";

export default function Home() {
  return (
    <div className="w-[90%] mx-auto px-5 py-10">
      <section className=" grid 2xl:grid-cols-4 lg:grid-cols-2 xs:grid-cols-1 gap-10 ">
        <Widget {...saleCard()} />
        <Widget {...productCard()} />
        <Widget {...providerCard()} />
        <Widget {...shipmentCard()} />
      </section>

      <section className="flex xxs:flex-col xl:flex-row mt-10 gap-10">
        <LineGraph />
      </section>

      <section className="my-10">
        <ProviderSimpleTable />
      </section>
    </div>
  );
}
