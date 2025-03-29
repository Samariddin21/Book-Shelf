"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/home/Sidebar";
import Topbar from "@/components/home/Topbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function MyShelf() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
      setFavoriteBooks(Array.isArray(storedFavorites) ? storedFavorites : []);
    }
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favoriteBooks.filter((book) => book.id !== id);
    setFavoriteBooks(updatedFavorites);
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="flex w-full overflow-hidden">
      {/* Фиксированный сайдбар */}
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Основное содержимое */}
      <div className="flex flex-col flex-1 pl-64 w-full overflow-hidden">
        {/* Верхняя панель */}
        <Topbar />

        {/* Контент страницы */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <h1 className="text-2xl font-semibold">My Shelf</h1>
          {favoriteBooks.length === 0 ? (
            <p className="text-gray-500">No books added to favorites yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Ratings</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoriteBooks.map((book, i) => (
                  <TableRow key={`${book.id}-${i}`} className="bg-white shadow-md rounded-lg">
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
                      {Array.isArray(book.availability) ? (
                        book.availability.map((type, j) => (
                          <span key={`${book.id}-availability-${j}`} className="block text-green-600 text-sm">
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => removeFavorite(book.id)}>
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
