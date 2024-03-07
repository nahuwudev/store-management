import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigation } from "../components/Sidebar";
import { NextUIProvider } from "@nextui-org/react";
import Header from "../components/Header";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import useQueryProvider from "../utils/hooks/useQueryProvider";
import useQuerySales from "../utils/hooks/useQuerySales";
import useQueryStock from "../utils/hooks/useQueryStock";
import useQueryShipment from "../utils/hooks/useQueryShipment";

import { useStockStore } from "../utils/store/stock";
import { useProviderStore } from "../utils/store/provider";
import { useSaleStore } from "../utils/store/sales";
import { useShipmentStore } from "../utils/store/shipment";

export default function Layout() {
  const navigate = useNavigate();

  const { setAllProducts } = useStockStore();
  const { setAllProvider } = useProviderStore();
  const { setAllSales } = useSaleStore();
  const { setAllShipment } = useShipmentStore();

  const stock = useQueryStock();
  const provider = useQueryProvider();
  const sales = useQuerySales();
  const shipment = useQueryShipment();

  useEffect(() => {
    if (stock) {
      setAllProducts(stock);
    }
    if (provider) {
      setAllProvider(provider);
    }
    if (sales) {
      setAllSales(sales);
    }
    if (shipment) {
      setAllShipment(shipment);
    }
  }, [
    shipment,
    setAllShipment,
    stock,
    setAllProducts,
    provider,
    setAllProvider,
    sales,
    setAllSales,
  ]);

  return (
    <NextUIProvider navigate={navigate}>
      <div className="font-poppins font-medium bg-slate-50 flex relative">
        <Navigation />

        <section className="w-full ss:ml-0 md:ml-52 ">
          <Header />
          <div className="my-10">
            <Outlet />
          </div>
        </section>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </NextUIProvider>
  );
}
