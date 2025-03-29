"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function NewArrivals() {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);
  const bookWidth = 160 + 16; // Размер карточки + отступ
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        if (Array.isArray(data)) setBooks(data);
        else setBooks([]);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [books]);

  const handleBookClick = (bookId) => {
    router.push(`/bookpreview/${bookId}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-red-500 to-purple-500 rounded-xl shadow-lg px-4 py-3 flex flex-col justify-center h-full min-h-[210px] overflow-hidden">
      {/* Метка "New Arrivals" */}
      <div className="absolute left-[-25px] top-1/2 -translate-y-1/2 bg-white text-red-500 px-3 py-1 font-bold text-xs rounded-md rotate-[-90deg] origin-center">
        New Arrivals
      </div>

      {/* Контейнер с книгами */}
      <div className="ml-8 overflow-hidden w-[680px] flex items-center">
        <div
          className="flex transition-transform duration-[1200ms] ease-in-out gap-4"
          style={{ transform: `translateX(-${index * bookWidth}px)` }}
        >
          {books.map((book, idx) => (
            <Card
              key={idx}
              className="bg-white shadow-md border border-gray-300 rounded-lg overflow-hidden transition-transform hover:scale-105 w-40 flex-shrink-0 cursor-pointer mt-"
              onClick={() => handleBookClick(book.id)}
            >
              <CardContent className="p-2 flex flex-col items-center">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-27 h-32 object-cover rounded-md shadow"
                />
                <p className="text-xs mt-2 text-center text-gray-900 font-medium line-clamp-2">{book.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}