"use client";

import { useState } from "react";
import Sidebar from "@/components/home/Sidebar";
import SearchPage from "@/app/search/SearchPage";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState(""); // Храним поисковый запрос

  return (
    <div className="flex w-full">
      {/* Фиксированный сайдбар */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-10">
        <Sidebar />
      </div>

      {/* Основное содержимое */}
      <div className="flex flex-col flex-1 pl-64 w-full h-screen">


        {/* Контент с прокруткой */}
        <div className="flex-1 px-6 py-4 w-full overflow-y-auto">
          <SearchPage searchQuery={searchQuery} /> {/* Передаем searchQuery в SearchPage */}
        </div>
      </div>
    </div>
  );
}
