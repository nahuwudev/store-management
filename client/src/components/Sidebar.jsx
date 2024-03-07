import { Link, useLocation } from "react-router-dom";
import settings from "/svg/settings-icon.svg";
import support from "/svg/support-icon.svg";
import menu from "/svg/menu.svg";
import navLinksData from "../utils/constants/aside";
import { useOutsideClick } from "../utils/hooks/useOutsideClick";
import { useRef, useState } from "react";

export function Sidebar({ children, refValue, open }) {
  return (
    <aside
      ref={refValue}
      className="h-screen z-20  xxs:w-44 md:w-52 fixed transition-all duration-300"
      style={{
        left: open ? "-11rem" : "0rem",
      }}
    >
      <nav className="h-full overflow overflow-y-scroll  no-scrollbar bg-zinc-950 text-slate-50   flex flex-col  border-r shadow-sm">
        <div className="font-bold ml-5 mt-2 flex justify-between items-center">
          IPSUM
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <ul className="border-t  mb-5 p-3 mt-5">
          <SidebarItem icon={settings}>Settings</SidebarItem>
          <SidebarItem icon={support}>Support & Feedback</SidebarItem>
        </ul>
      </nav>
    </aside>
  );
}

export function SidebarItem({ active, children, href, icon }) {
  return (
    <li
      className={`
        relative flex items-center  px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors  text-slate-50
        ${
          active
            ? " bg-orange-500 hover:bg-orange-600 "
            : " hover:bg-orange-500  "
        }
        `}
    >
      <Link className="flex w-full py-2 text-xs" to={href}>
        <img src={icon} className="mr-3" />
        {children}
      </Link>
    </li>
  );
}

export const Navigation = () => {
  const location = useLocation().pathname;
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  useOutsideClick(wrapperRef, setOpen);
  return (
    <>
      <div className="xxs:block md:hidden">
        <Sidebar open={open} refValue={wrapperRef}>
          <button onClick={() => setOpen(!open)}>
            <img
              src={menu}
              className={`absolute left-[200px] top-4 w-8 ${
                open ? "block" : "hidden"
              }`}
            />
          </button>

          {Object.entries(navLinksData).map(([section, links]) => (
            <ul key={section}>
              <span className="ml-2 font-extrabold text-xs">{section}</span>
              {links.map((link, index) => (
                <SidebarItem
                  active={location === link.to ? true : false}
                  icon={link.icon}
                  key={index}
                  href={link.to}
                >
                  {link.navItem}
                </SidebarItem>
              ))}
            </ul>
          ))}
        </Sidebar>
      </div>

      <div className="xxs:hidden md:block">
        <Sidebar>
          {Object.entries(navLinksData).map(([section, links]) => (
            <ul key={section} className="mt-5">
              <span className="ml-2 font-extrabold text-xs">{section}</span>
              {links.map((link, index) => (
                <SidebarItem
                  active={location === link.to ? true : false}
                  icon={link.icon}
                  key={index}
                  href={link.to}
                >
                  {link.navItem}
                </SidebarItem>
              ))}
            </ul>
          ))}
        </Sidebar>
      </div>
    </>
  );
};
