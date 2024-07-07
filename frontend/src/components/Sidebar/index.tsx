"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../../public/images/logo/logo2.png";
import {
  ArchiveBoxArrowDownIcon,
  Cog6ToothIcon,
  DocumentIcon,
  FireIcon,
  HomeIcon,
  PlusCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-green-800 duration-300 ease-linear dark:bg-green-950 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="flex items-center">
          <Image width={60} height={60} src={Logo} alt="Logo" priority />
          <h1 className="ml-4 text-4xl font-bold text-white shadow-md">
            e-Elect
          </h1>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/admin/home"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-green-900 dark:hover:bg-green-900 ${
                    pathname.includes("home") &&
                    "bg-green-900 dark:bg-green-900"
                  }`}
                >
                  <HomeIcon className="h-6 w-6" />
                  Dashboard
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Active Elections --> */}
              <li>
                <Link
                  href="/admin/active-elections"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-green-900 dark:hover:bg-green-900 ${
                    pathname.includes("active-elections") &&
                    "bg-green-900 dark:bg-green-900"
                  }`}
                >
                  <FireIcon className="h-6 w-6" />
                  Active Elections
                </Link>
              </li>
              {/* <!-- Menu Item Active Elections --> */}

              {/* <!-- Menu Item Historical Elections --> */}
              <li>
                <Link
                  href="/admin/historical-elections"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-green-900 dark:hover:bg-green-900 ${
                    pathname.includes("historical-elections") &&
                    "bg-green-900 dark:bg-green-900"
                  }`}
                >
                  <ArchiveBoxArrowDownIcon className="h-6 w-6" />
                  Historical Elections
                </Link>
              </li>
              {/* <!-- Menu Item Historical Elections --> */}

              {/* <!-- Menu Item Voters --> */}
              <li>
                <Link
                  href="/admin/voters"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-green-900 dark:hover:bg-green-900 ${
                    pathname.includes("voters") &&
                    "bg-green-900 dark:bg-green-900"
                  }`}
                >
                  <UsersIcon className="h-6 w-6" />
                  Voters
                </Link>
              </li>
              {/* <!-- Menu Item Voters --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Settings --> */}
              <li>
                <Link
                  href="/admin/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-green-900 dark:hover:bg-green-900 ${
                    pathname.includes("settings") &&
                    "bg-green-900 dark:bg-green-900"
                  }`}
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                  Settings
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
