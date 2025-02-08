import { useTranslations } from "next-intl";
export default function DashboardPage() {
  const t = useTranslations('Finance');
  return (
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-gray-600">{t("description")}</p>
      </div>

  );
}
