// 📁 queries.js
// MongoDB Queries for PLP Bookstore Assignment
// Author: Nicholas
// D

// -----------------------------
// 🧩 Task 2.2: Basic CRUD Queries
// -----------------------------

// Find all books in a specific genre
db.books.find({ genre: "Science Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "Ngugi wa Thiong'o" })

// Update the price of a specific book
db.books.updateOne(
  { title: "The AI Revolution" },
  { $set: { price: 24.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "Voices from the Rift" })

// -----------------------------
// 🔍 Task 3: Advanced Queries
// -----------------------------

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort books by price ascending
db.books.find().sort({ price: 1 })

// Sort books by price descending
db.books.find().sort({ price: -1 })

// Pagination: page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Pagination: page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// -----------------------------
// 🧪 Task 4: Aggregation Pipeline
// -----------------------------

// Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  }
])

// Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 }
    }
  },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// -----------------------------
// ⚡ Task 5: Indexing
// -----------------------------

// Create index on title
db.books.createIndex({ title: 1 })

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Explain query performance with index
db.books.find({ title: "The AI Revolution" }).explain("executionStats")

