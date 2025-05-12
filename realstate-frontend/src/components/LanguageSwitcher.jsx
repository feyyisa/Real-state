import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative w-40">
      <select
        onChange={handleChange}
        value={i18n.language}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        <option value="en">🌐 English</option>
        <option value="am">🌍Amharic</option>
        <option value="om">🌍 Afaan Oromoo</option>
      </select>
    </div>
  );
};
export default LanguageSwitcher;
