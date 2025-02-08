"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface User {
  name: string,
  email: string,
  phone_number: string,
  address: string
}

export default function DashboardPage() {

  const t = useTranslations('Dashboard');
  const tbi = useTranslations('BasicInformation');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await fetch('/api/userData', { // Panggil API Next.js
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    });

    const data = await response.json();
   
    if (response.ok) {
      setUser(data.data.user);
      setLoading(false);
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    getData();
  },[])

  if (loading) return <p>Loading...</p>;
  return (
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-gray-600">{t("description")}</p>
        <hr />
        {/* Card User Info */}
        <div className="mt-6 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">📝 Basic Information</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p className="text-gray-700">
              <strong>👤 {tbi("name")}:</strong> {user?.name || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📧 {tbi("email")}:</strong> {user?.email || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📞 {tbi("phone")}:</strong> {user?.phone_number || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📍 {tbi("address")}:</strong> {user?.address || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
          </div>
        </div>
      </div>

  );
}
