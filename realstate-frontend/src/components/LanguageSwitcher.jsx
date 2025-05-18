import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="fixed top-1 right-1 z-50">
      <select
        onChange={handleChange}
        value={i18n.language}
        className="w-24 px-2 py-0.5 border border-gray-100 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 text-sm"
      >
        <option value="en">🌐 English</option>
        <option value="am">🌍 Amharic</option>
        <option value="om">🌍 Afaan Oromoo</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
