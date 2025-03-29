"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Topbar from "@/components/home/Topbar"; // Подключаем Topbar

export default function SearchPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]); // Все книги из API
  const [visibleBooks, setVisibleBooks] = useState(10); // Количество отображаемых книг
  const [favoriteBooks, setFavoriteBooks] = useState([]); // Избранные книги
  const [searchQuery, setSearchQuery] = useState(""); // Поиск

  // Загружаем избранные книги
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
    setFavoriteBooks(storedFavorites);
  }, []);

  // Загружаем книги из API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();
        console.log("Загруженные книги:", data); // Отладка API
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Ошибка при загрузке книг:", error);
        setBooks([]);
      }
    }

    fetchBooks();
  }, []);

  // Фильтрация книг по названию или автору
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Подключаем Topbar с поиском */}
      <Topbar setSearchQuery={setSearchQuery} />

      {/* Если строка поиска пустая, не показываем книги */}
      {searchQuery.trim() === "" ? (
        <p className="text-center text-gray-500 mt-4">🔍 Enter your search query</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">📚 Book not found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Ratings</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Favourite</TableHead>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.slice(0, visibleBooks).map((book) => (
              <TableRow key={book.id} className="bg-white shadow-md rounded-lg">
                <TableCell className="flex items-center gap-4">
                  <img
                    src={book.cover || null}
                    alt={book.title || "No cover"}
                    width={50}
                    height={70}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                </TableCell>
                <TableCell>{book.rating || "No rating"}/5</TableCell>
                <TableCell>{book.category || "Uncategorized"}</TableCell>
                <TableCell>
                  <span className="block text-green-600 text-sm">Online</span>
                </TableCell>
                <TableCell>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold 
                    ${book.status === "In-Shelf" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {book.status}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => toggleFavorite(book)}>
                    <Heart
                      className={`w-5 h-5 ${
                        favoriteBooks.some((b) => b.id === book.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handlePreview(book)}>
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {visibleBooks < filteredBooks.length && searchQuery.trim() !== "" && (
        <div className="flex justify-center mt-4">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setVisibleBooks((prev) => prev + 10)}
          >
            Load More 📖
          </Button>
        </div>
      )}
    </div>
  );
}
