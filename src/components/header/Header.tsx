"use client";

import Link from "next/link";
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { LogoWithTheme } from "../button/LogoWithTheme";

export const Header = () => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  // Lista de links
  const navLinks = [
    { href: "/edicoes", label: "Edições" },
    { href: "/noticias", label: "Notícias" },
    { href: "/vagas-emprego", label: "Vagas de Emprego" },
    // { href: "/premio-carro-do-ano", label: "Votação Carro do Ano" },
  ];

  return (
    <header className="header w-full bg-[rgb(var(--var-marca-100-08))] backdrop-blur-lg min-h-[3.25rem] flex items-center justify-center px-4 max-sm:px-2 max-2sm:flex-col-reverse max-2sm:py-1  top-[45px] z-50">
      <div className="px-5 lg:px-[6.25rem] overflow-visible my-0 mx-auto flex items-center justify-center sm:justify-between w-full">
        <button onClick={toggleSidebar} className="lg:hidden mr-4">
          <svg className={`w-6 h-6 text-text-cinza-escuro`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <LogoWithTheme />

        <nav className="relative items-center justify-center px-9 w-full gap-6 hidden lg:flex">
          <Menubar className="flex items-center gap-4">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <MenubarMenu>
                  <MenubarTrigger>
                    <Link target="_parent" href={link.href}>
                      <span className="nav-bar-medium">{link.label}</span>
                    </Link>
                  </MenubarTrigger>
                </MenubarMenu>
                {index < navLinks.length - 1 && <span className="rounded-full">•</span>}
              </React.Fragment>
            ))}
          </Menubar>
        </nav>

        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden bg-[rgb(var(--var-background-principal))] h-screen p-5 transition-transform duration-300 flex flex-col text-md font-semibold fixed top-0 left-0 z-50`}
          ref={sidebarRef}
        >
          <button onClick={toggleSidebar} className="lg:hidden mr-4">
            <svg className={`w-6 h-6 text-text-cinza-escuro`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <nav className="flex flex-col items-center justify-end px-9 w-full space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                onClick={toggleSidebar}
                href={link.href}
                target="_parent"
                className="nav-bar-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
