"use client";

import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";
import QuoteBox from "@/components/home/QuoteBox";
import NewArrivals from "@/components/home/NewArrivals";
import Recommendations from "@/components/home/Recommendations";

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Фиксированный сайдбар */}
      <Sidebar />

      {/* Основное содержимое */}
      <div className="ml-64 flex-1 flex flex-col overflow-y-auto">
        {/* Верхняя панель */}
        <Topbar />

        {/* Контент страницы */}
        <div className="px-8 py-6 space-y-6">
          {/* Цитата дня + Новые поступления в одной линии */}
          <div className="flex gap-6 items-stretch max-h-[210px]">
            {/* Цитата дня */}
            <div className="w-[35%]">
              <QuoteBox />
            </div>

            {/* Новые поступления */}
            <div className="flex-1">
              <NewArrivals />
            </div>
          </div>

          {/* Рекомендации */}
          <div className="bg-white rounded-xl p-4">
            <Recommendations />
          </div>
        </div>
      </div>
    </div>
  );
}
