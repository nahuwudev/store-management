import Layout from "../../layout/Layout";
import Home from "../../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import SalesManagement from "../../pages/sales/SalesManagement";
import InventoryManagement from "../../pages/stock/InventoryManagement";
import ProductInformation from "../../pages/stock/ProductInformation";
import DeliveryManagement from "../../pages/shipment/DeliveryManagement";
import ProviderManagement from "../../pages/providers/ProviderManagement";
import SupplierInformation from "../../pages/providers/SupplierInformation";
import OrderFromSuppliers from "../../pages/providers/OrderFromSuppliers";
import Invoice from "../../pages/sales/Invoice";

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.salesManagement,
        element: <SalesManagement />,
      },
      {
        path: routes.invoice,
        element: <Invoice />,
      },
      {
        path: routes.inventoryManagement,
        element: <InventoryManagement />,
      },
      {
        path: routes.productInformation,
        element: <ProductInformation />,
      },
      {
        path: routes.deliveryManagement,
        element: <DeliveryManagement />,
      },
      {
        path: routes.providerManagement,
        element: <ProviderManagement />,
      },
      {
        path: routes.supplierInformation,
        element: <SupplierInformation />,
      },
      {
        path: routes.orderFromSuppliers,
        element: <OrderFromSuppliers />,
      },
      {
        path: routes.settings,
        element: <h1>settings</h1>,
      },
      {
        path: routes.supportFeedback,
        element: <h1>support & feedback</h1>,
      },
    ],
  },
]);
