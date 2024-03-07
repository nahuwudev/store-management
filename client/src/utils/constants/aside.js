import dashboard from "/svg/dashboard-line.svg";
import sales from "/svg/sales-icon.svg";
import order from "/svg/order-icon.svg";
import invoice from "/svg/invoice-icon.svg";
import stock from "/svg/stock-icon.svg";
import track from "/svg/track-icon.svg";
import delivery from "/svg/delivery-icon.svg";
import shipping from "/svg/shipping-icon.svg";
import provider from "/svg/provider-icon.svg";
import supplier from "/svg/supplier-icon.svg";
import orderfrom from "/svg/orderfrom-icon.svg";
import Update from "/svg/update-icon.svg";

import { routes } from "./routes";

const navLinksData = {
  menu: [
    { navItem: "Dashboard", icon: dashboard, active: true, to: routes.home },
  ],
  sales: [
    {
      navItem: "Sales Management",
      icon: sales,
      active: false,
      to: routes.salesManagement,
    },
    {
      navItem: "Invoice",
      icon: order,
      active: false,
      to: routes.invoice,
    },
  ],
  stocks: [
    {
      navItem: "Inventory Management",
      icon: stock,
      active: false,
      to: routes.inventoryManagement,
    },
    {
      navItem: "Product Information",
      icon: Update,
      active: false,
      to: routes.productInformation,
    },
  ],
  shipment: [
    {
      navItem: "Delivery Management",
      icon: delivery,
      active: false,
      to: routes.deliveryManagement,
    },
  ],
  providers: [
    {
      navItem: "Provider Management",
      icon: provider,
      active: false,
      to: routes.providerManagement,
    },
    {
      navItem: "Supplier Information",
      icon: supplier,
      active: false,
      to: routes.supplierInformation,
    },
    {
      navItem: "Order from Suppliers",
      icon: orderfrom,
      active: false,
      to: routes.orderFromSuppliers,
    },
  ],
};
export default navLinksData;
