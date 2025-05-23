import React from "react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.propertyListings.title"),
      desc: t("services.propertyListings.desc"),
    },
    {
      title: t("services.propertyManagement.title"),
      desc: t("services.propertyManagement.desc"),
    },
    {
      title: t("services.advancedSearch.title"),
      desc: t("services.advancedSearch.desc"),
    },
    {
      title: t("services.securePayment.title"),
      desc: t("services.securePayment.desc"),
    },
    {
      title: t("services.customerSupport.title"),
      desc: t("services.customerSupport.desc"),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen p-10 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white mb-6 text-center">
        {t("services.heading")}
      </h1>
      <p className="text-gray-300 max-w-3xl text-center mb-10 text-lg">
        {t("services.description")}
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-xl rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-3">{service.title}</h2>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
