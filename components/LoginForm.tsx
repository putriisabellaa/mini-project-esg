"use client";
import React, { useState, useCallback } from "react";
import Input from "./Input";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("Login");
  const cl = useTranslations("ButtonLanguage");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const lang = Cookies.get("NEXT_LOCALE") || "en-US";

    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 60);

    const data = await response.json();

    if (response.ok) {
      Cookies.set("token", data.data.token, { expires: expirationDate });
      router.push('/');
    } else {
      setError(data.error || "Login failed");
    }
  };

  const toggleLanguageDropdown = () => setIsOpen((prev) => !prev);

  const changeLanguage = useCallback(async (lang: string) => {
    await fetch(`/api/language?lang=${lang}`);
    Cookies.set("lang", lang, { path: "/" });

    router.push(`/${lang}`);
  }, [router]);

  return (
  <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
    {/* Dropdown Pilihan Bahasa (Di luar form) */}
    <div className="absolute top-4 right-4 md:right-6 bg-white z-50">
      <div className="relative">
        <button
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md focus:outline-none shadow-md"
          onClick={toggleLanguageDropdown}
        >
          {cl("language")}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            <ul className="space-y-1">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <button onClick={() => changeLanguage("id-ID")}>🇮🇩 Indonesia</button>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <button onClick={() => changeLanguage("en-US")}>🇺🇸 English</button>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <button onClick={() => changeLanguage("ch-CH")}>🇨🇳 中文 (Mandarin)</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

    {/* Layout Form */}
    <div className="grid lg:grid-cols-2 md:grid-cols-2 items-center bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Gambar hanya muncul di layar besar */}
      <div className="hidden lg:block md:block h-screen">
        <img
          src="images/golf-2.jpg"
          className="w-full h-full object-cover"
          alt="login-image"
        />
      </div>

      {/* Form di Tengah */}
      <div className="flex items-center justify-center w-full p-8">
        <form className="max-w-xl w-full mx-auto" onSubmit={handleLogin}>
          <a href="#">
            <img
              src="images/logo-2.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </a>

          <div className="mb-8 text-center">
            <h3 className="text-gray-800 text-4xl font-extrabold">{t("title")}</h3>
            <p className="text-gray-800 text-sm mt-4">{t("description")}</p>
          </div>

          <div>
            <label className="text-gray-800 text-sm block mb-2">{t("email")}</label>
            <Input
              type="email"
              value={email}
              className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("inputEmail")}
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-sm block mb-2">{t("password")}</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder={t("inputPassword")}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full py-4 text-sm tracking-wide rounded-md text-white focus:outline-none">
              {t("buttonLogin")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default LoginForm;
