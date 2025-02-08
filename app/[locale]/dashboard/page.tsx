"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const [user, setUser] = useState(null);
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
              <strong>👤 Nama:</strong> {user?.name || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📧 Email:</strong> {user?.email || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📞 Phone:</strong> {user?.phone_number || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
            <p className="text-gray-700">
              <strong>📍 Address:</strong> {user?.address || <span className="text-gray-400 animate-pulse">Loading...</span>}
            </p>
          </div>
        </div>
      </div>

  );
}
