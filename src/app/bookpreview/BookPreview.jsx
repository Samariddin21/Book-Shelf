"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function BookPreview() {
  const { id } = useParams(); // Получаем id книги из URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBook();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && book) {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];
      setIsAdded(storedFavorites.some((favBook) => favBook.id === book.id));
    }
  }, [book]);

  const handleAddToList = () => {
    if (!book) return;

    let storedFavorites = JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    if (isAdded) {
      storedFavorites = storedFavorites.filter((favBook) => favBook.id !== book.id);
      setMessage({ text: "❌ Removed from My Shelf.", type: "error" });
    } else {
      storedFavorites.push(book);
      setMessage({ text: "✅ Successfully added to My Shelf!", type: "success" });
    }

    localStorage.setItem("favoriteBooks", JSON.stringify(storedFavorites));
    setIsAdded(!isAdded);

    setTimeout(() => setMessage(null), 2200);
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading book...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!book) return <div className="text-center mt-10 text-gray-500">Book not found</div>;

  return (
    <div className="container mx-auto p-6">
      {message && (
        <div className={`p-3 mb-4 rounded-lg border ${message.type === "error" ? "bg-red-100 text-red-600 border-red-400" : "bg-green-100 text-green-600 border-green-400"}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 flex flex-col gap-4">
          <Card className="p-4 flex flex-col items-center">
            <img src={book.cover} alt={book.title} className="w-48 h-auto rounded-lg shadow-md" />
            <div className="flex justify-between w-full mt-4">
              <Button variant="outline">Review</Button>
              <Button variant="outline">Notes</Button>
              <Button variant="outline">Share</Button>
            </div>
          </Card>
        </div>

        <div className="col-span-6">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-600">By <span className="text-blue-500">{book.author}</span></p>

          <div className="flex items-center gap-4 my-4">
            <Badge className="text-white bg-green-500">{book.publishedDate || "Unknown"}</Badge>
          </div>

          <div className="flex gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2">
              Read Now 🎧
            </Button>
            <Button className={`px-6 py-2 ${isAdded ? "bg-orange-500 text-white" : "border-gray-700 text-gray-700"}`} onClick={handleAddToList}>
              {isAdded ? "Added ✅" : "Add to List ⬇️"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
