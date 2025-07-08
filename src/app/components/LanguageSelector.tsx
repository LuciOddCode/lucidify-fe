"use client";

import React from "react";
import { Languages } from "lucide-react";
import { Language } from "../lib/types";
import { useAuth } from "../lib/auth-context";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAuth();

  const languages = [
    { code: "en" as Language, name: "English", native: "English" },
    { code: "si" as Language, name: "Sinhala", native: "සිංහල" },
    { code: "ta" as Language, name: "Tamil", native: "தமிழ்" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-soft-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 border border-primary-sage/20">
        <Languages size={16} className="text-primary-sage" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-transparent border-none text-sm text-deep-forest focus:outline-none focus:ring-0 cursor-pointer"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option
              key={lang.code}
              value={lang.code}
              className="bg-soft-white text-deep-forest"
            >
              {lang.native}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
