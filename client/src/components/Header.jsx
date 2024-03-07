import { useLocation } from "react-router-dom";
import navLinksData from "../utils/constants/aside";
import { Divider, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Header() {
  const location = useLocation();

  const getIconAndLabel = () => {
    for (const [_, links] of Object.entries(navLinksData)) {
      for (const link of links) {
        if (link.to === location.pathname) {
          return { label: link.navItem };
        }
      }
    }
    return { label: "" };
  };

  const { label } = getIconAndLabel();

  return (
    <header>
      <Breadcrumbs className="my-5 xxs:ml-20 md:ml-2">
        <BreadcrumbItem>
          {">"} {label}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Divider />
    </header>
  );
}
