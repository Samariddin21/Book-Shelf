"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Calendar, Globe, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";

// Объект переводов
const translations = {
  English: {
    searchPlaceholder: "Search",
    category: "All",
    language: "English",
    time: "Time",
    date: "Date",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    categories: ["All", "Books", "Articles", "Videos"],
  },
  Spanish: {
    searchPlaceholder: "Buscar",
    category: "Todo",
    language: "Español",
    time: "Hora",
    date: "Fecha",
    profile: "Perfil",
    settings: "Configuraciones",
    logout: "Cerrar sesión",
    categories: ["Todo", "Libros", "Artículos", "Videos"],
  },
  French: {
    searchPlaceholder: "Rechercher",
    category: "Tout",
    language: "Français",
    time: "Heure",
    date: "Date",
    profile: "Profil",
    settings: "Paramètres",
    logout: "Déconnexion",
    categories: ["Tout", "Livres", "Articles", "Vidéos"],
  },
};

export default function Topbar({ setSearchQuery }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");

  const t = translations[selectedLang]; // Текущие переводы

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value); // Отправляем в родительский компонент
  };

  return (
    <header className="flex items-center justify-between bg-white p-3">
      {/* Поиск и фильтр */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-2 rounded-xl text-sm bg-gray-100"
          />
          <Search className="absolute left-3 text-orange-500" size={18} />
        </div>
      </div>

      {/* Время, дата, язык, уведомления и профиль */}
      <div className="flex items-center space-x-4">
        <LanguageDropdown selected={selectedLang} onChange={setSelectedLang} />
        <TimeDisplay label={t.time} />
        <DateDisplay label={t.date} />
        <Bell size={20} className="text-orange-500 cursor-pointer" />
        <UserProfile translations={t} />
      </div>
    </header>
  );
}

// Компонент выбора языка
function LanguageDropdown({ selected, onChange }) {
  const languages = Object.keys(translations);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-xl px-4 flex items-center">
          <Globe size={18} className="text-orange-500 mr-2" /> {translations[selected].language} ▼
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 space-y-2 bg-white shadow-lg border rounded-md z-50 absolute top-full mt-1">
        {languages.map((lang) => (
          <p key={lang} className="text-sm cursor-pointer hover:text-orange-500 px-3 py-2" onClick={() => onChange(lang)}>
            {translations[lang].language}
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
}

// Компонент отображения времени
function TimeDisplay({ label }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center px-4 py-2 bg-white border rounded-xl text-sm">
      <Clock size={18} className="text-orange-500 mr-2" />
      {label}: {time}
    </div>
  );
}

// Компонент профиля пользователя
function UserProfile({ translations }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-xl px-4 flex items-center">
          <Image src="/avatar.png" width={28} height={28} alt="User" className="rounded-full mr-2" />
          Kenson ▼
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 space-y-2 bg-white shadow-lg border rounded-md z-50 absolute top-full mt-1">
        <p className="text-sm cursor-pointer hover:text-orange-500 px-3 py-2">{translations.profile}</p>
        <p className="text-sm cursor-pointer hover:text-orange-500 px-3 py-2">{translations.settings}</p>
        <p className="text-sm cursor-pointer hover:text-red-500 px-3 py-2">{translations.logout}</p>
      </PopoverContent>
    </Popover>
  );
}

// Компонент отображения даты
function DateDisplay({ label }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setDate(now.toLocaleDateString());
  }, []);

  return (
    <div className="flex items-center px-4 py-2 bg-white border rounded-xl text-sm">
      <Calendar size={18} className="text-orange-500 mr-2" />
      {label}: {date}
    </div>
  );
}
