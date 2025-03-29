import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  { text: "There is more treasure in books than in all the pirate’s loot on Treasure Island.", author: "Walt Disney" },
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
];

export default function QuoteBox() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-xl shadow-lg p-4 relative w-full h-full min-h-[210px] flex items-center justify-center">
      <CardContent className="text-center w-full">
        <p className="text-lg font-semibold leading-snug min-h-[50px] flex items-center justify-center">
          “{quotes[index].text}”
        </p>
        <p className="text-right text-sm font-medium mt-2">- {quotes[index].author}</p>
      </CardContent>

      {/* Индикаторы */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {quotes.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-gray-300 opacity-50"}`}
          ></span>
        ))}
      </div>
    </Card>
  );
}


