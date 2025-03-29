"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";
import BookPreview from "@/app/bookpreview/BookPreview";

export default function Page() {
  const params = useParams();
  const bookId = params.id; // Получаем ID из URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books?isbn=${bookId}`);


        // Проверяем, что сервер вернул JSON, иначе будет ошибка
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid response from server");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to load book. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading book...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!book) {
    return <div className="text-center text-gray-500 mt-10">Book not found</div>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Topbar />
        <div className="px-8 py-6 overflow-y-auto">
          <BookPreview book={book} />
        </div>
      </div>
    </div>
  );
}
