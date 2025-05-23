import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 min-h-screen p-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{t("about.title")}</h1>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6 text-justify">
        {t("about.intro")}
      </p>
      <h2 className="text-2xl font-bold text-gray-700 mt-6">{t("about.missionTitle")}</h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-6 text-justify">
        {t("about.mission")}
      </p>
      <h2 className="text-2xl font-bold text-gray-700 mt-6">{t("about.whyTitle")}</h2>
      <ul className="text-gray-600 max-w-3xl mx-auto list-disc list-inside mb-6 text-left">
        <li>{t("about.why.advancedSearch")}</li>
        <li>{t("about.why.securePayment")}</li>
        <li>{t("about.why.notifications")}</li>
        <li>{t("about.why.customerSupport")}</li>
      </ul>
    </div>
  );
}
