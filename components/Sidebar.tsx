"use client"; // Menandakan bahwa komponen ini menggunakan hooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Menentukan apakah sudah di sisi klien
  const t = useTranslations("ListMenu");
  const router = useRouter();
  const lang = Cookies.get("NEXT_LOCALE");

  const menuItems = [
    { name: t("dashboard"), path: `/${lang}/dashboard` },
    { name: t("employee"), path: `/${lang}/dashboard/employee` },
    { name: t("purchasing"), path: `/${lang}/dashboard/purchasing` },
    { name: t("finance"), path: `/${lang}/dashboard/finance` },
    { name: t("warehouse"), path: `/${lang}/dashboard/warehouse` },
  ];

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.log("Logout failed");
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Hindari rendering sebelum sisi klien siap

  return (
    <>
      {/* Button Toggle untuk mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-4 bg-gray-200 fixed top-4 left-4 z-50 rounded-full"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-full md:w-64 bg-gray-100 text-gray-800 p-6 flex flex-col justify-between h-screen fixed lg:relative top-0 left-0 z-40`}
      >
        {/* Logo di atas */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/logo-2.png"
            alt="Company Logo"
            width={150}
            height={50}
            priority
          />
        </div>

        {/* Menu */}
        <ul className="space-y-4 flex-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-md ${
                  pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-gray-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Button Logout */}
        <button
          className="bg-red-500 text-white w-full py-2 mt-4 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>
    </>
  );
}
