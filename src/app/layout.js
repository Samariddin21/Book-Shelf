"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    setLoading(true);
    setShowContent(false);

    const timeout = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname, hydrated]);

  return (
    <html lang="ru">
      <body>
        {!isHomePage && loading && hydrated && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute w-20 h-20 border-4 border-transparent border-t-orange-500 border-r-orange-500 rounded-full animate-spin-slow"></div>
              <div className="absolute w-24 h-24 border-4 border-transparent border-b-orange-500 border-l-orange-500 rounded-full animate-reverse-spin"></div>
              <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>
        )}

        <main
          className={`transition-opacity transition-transform duration-700 ease-out ${
            showContent || isHomePage ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95"
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
