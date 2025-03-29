"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Recommendations() {
  const [books, setBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(12);
  const [isClient, setIsClient] = useState(false); // Флаг для проверки рендера на клиенте
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Когда useEffect срабатывает, мы уже на клиенте

    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Перемешиваем книги ТОЛЬКО после того, как убедились, что рендер происходит на клиенте
          setBooks([...data].sort(() => Math.random() - 0.5));
        } else {
          console.error("Unexpected API response:", data);
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    }

    fetchBooks();
  }, []);

  const handleLoadMore = () => {
    setVisibleBooks((prev) => prev + 12);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📚 Recommended for You</h2>

      <div className="grid grid-cols-4 gap-6">
        {isClient &&
          books.slice(0, visibleBooks).map((book) => (
            <Card
              key={book.id}
              className="relative bg-white items-center shadow-lg h-75 border border-gray-300 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
              onClick={() => router.push(`/bookpreview/${book.id}`)}
            >
              <CardContent className="absolute p-4 flex flex-col items-center top-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-40 rounded-lg shadow"
                />
                <p className="text-sm mt-3 text-center text-gray-900 font-semibold">{book.title}</p>
                <p className="text-xs text-gray-500">{book.author}</p>
                <p className="text-yellow-500 font-bold mt-1">⭐ {book.rating || "No rating"}</p>
              </CardContent>
            </Card>
          ))}
      </div>

      {isClient && visibleBooks < books.length && (
        <div className="flex justify-center mt-4">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={handleLoadMore}
          >
            Load More 📖
          </Button>
        </div>
      )}
    </div>
  );
}
