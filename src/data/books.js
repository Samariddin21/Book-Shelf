const books = [
  {
    id: 1,
    title: "Don't Make Me Think",
    author: "Steve Krug",
    rating: 4.5,
    category: "Computer Science",
    availability: ["Hard Copy", "E-Book", "Audio Book"],
    cover: "/books/dont-make-me-think.jpeg",
    status: "In-Shelf", 
    location: "CS A-15",
    borrower: null
  },
  {
    id: 2,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    rating: 4.5,
    category: "Computer Science",
    availability: ["Hard Copy", "E-Book"],
    cover: "/books/design-things.jpeg",
    status: "Borrowed",
    location: null,
    borrower: "Sriram"
  },
  {
    id: 3,
    title: "Sprint",
    author: "Jake Knapp",
    rating: 4.5,
    category: "Productivity",
    availability: ["E-Book", "Audio Book"],
    cover: "/books/sprint.jpeg",
    status: "In-Shelf",
    location: "PRD-10",
    borrower: null
  },
  {
    id: 4,
    title: "Lean UX",
    author: "Jeff Gothelf",
    rating: 4.5,
    category: "Design",
    availability: ["Hard Copy", "E-Book"],
    cover: "/books/lean-ux.png",
    status: "Borrowed",
    location: null,
    borrower: "Alice"
  },
  {
    id: 5,
    title: "The Road to React",
    author: "Steve Krug",
    rating: 4.5,
    category: "Programming",
    availability: ["E-Book"],
    cover: "/books/react.jpeg",
    status: "In-Shelf",
    location: "PRG-07",
    borrower: null
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    rating: 5.0,
    category: "Finance",
    availability: ["Hard Copy", "Audio Book"],
    cover: "/books/rich-dad.jpeg",
    status: "Borrowed",
    location: null,
    borrower: "John Doe"
  },
  {
    id: 7,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    rating: 4.9,
    category: "Fantasy",
    availability: ["Hard Copy", "E-Book", "Audio Book"],
    cover: "/books/harry-potter.jpeg",
    status: "In-Shelf",
    location: "FNT-03",
    borrower: null
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    category: "Self-help",
    availability: ["Hard Copy", "E-Book"],
    cover: "/books/atomic-habits.jpg",
    status: "Borrowed",
    location: null,
    borrower: "Emily"
  },
  {
    id: 9,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    rating: 4.6,
    category: "Self-help",
    availability: ["E-Book", "Audio Book"],
    cover: "/books/subtle-art.jpg",
    status: "In-Shelf",
    location: "SH-05",
    borrower: null
  },
  {
    id: 10,
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4.7,
    category: "Productivity",
    availability: ["Hard Copy", "E-Book"],
    cover: "/books/deep-work.jpg",
    status: "Borrowed",
    location: null,
    borrower: "Michael"
  },
  {
    id: 11,
    title: "Hooked",
    author: "Nir Eyal",
    rating: 4.5,
    category: "Business",
    availability: ["Hard Copy"],
    cover: "/books/hooked.jpg",
    status: "In-Shelf",
    location: "BUS-12",
    borrower: null
  },
  {
    id: 12,
    title: "The Lean Startup",
    author: "Eric Ries",
    rating: 4.6,
    category: "Business",
    availability: ["Hard Copy", "E-Book"],
    cover: "/books/startup.jpg",
    status: "In-Shelf",
    location: "BUS-08",
    borrower: null
  }
];

export default books;
