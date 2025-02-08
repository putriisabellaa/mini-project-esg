"use client"; 

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("ButtonLanguage");
  const router = useRouter();

  const toggleLanguageDropdown = () => setIsOpen((prev) => !prev);

  const changeLanguage = useCallback(async (lang: string) => {
    await fetch(`/api/language?lang=${lang}`);
    
    Cookies.set("lang", lang, { path: "/" });

    router.push(`/${lang}`);
  }, [router]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-6 bg-white text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <div className="relative ml-auto">
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
              onClick={toggleLanguageDropdown}
            >
              {t("language")}
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                <ul className="space-y-1">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <button onClick={() => changeLanguage("id-ID")}>🇮🇩 {t("indonesia")}</button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <button onClick={() => changeLanguage("en-US")}>🇺🇸 {t("english")}</button>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <button onClick={() => changeLanguage("ch-CH")}>🇨🇳 {t("mandarin")}</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 border">{children}</div>
        </div>
      </div>
    </div>
  );
}
