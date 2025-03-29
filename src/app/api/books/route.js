export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get("id");

  const apiKey = "AIzaSyAIw1Wd-kRy81ce6kx1PGLgGkT0dxQAfdY";

  if (bookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const book = {
        id: data.id,
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors?.join(", ") || "Unknown Author",
        cover: data.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
        rating: data.volumeInfo.averageRating || "No rating",
        publishedDate: data.volumeInfo.publishedDate || "Unknown",
        status: "In-Shelf",
      };

      return Response.json(book);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }

  const query = "fiction"; // Можно изменить на любую категорию
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const books = data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
      cover: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
    }));

    return Response.json(books);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
