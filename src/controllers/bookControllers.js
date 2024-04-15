const BooksService = require("../services/bookServices");
require("dotenv").config();

class BooksController {
  async getBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      console.log(page,limit,offset);

      const books = await BooksService.getBooks({ offset, limit });
      res.send(books);
    } catch (error) {
      console.log("Error findAll:", error);
    }
  }

  async createBook(req, res) {
    try {
      const { title, author, year, pageCount } = req.body;
      const allBooks = await BooksService.getBooks();
      const existingBook = allBooks.some((books) => books.title === title);

      if (existingBook) {
        return res
          .status(201)
          .json({ error: "Книга с таким title уже существует" });
      }

      const newBook = { title, author, year, pageCount };

      let result = await BooksService.createBook(newBook);
      res.status(201).json(result);
    } catch (error) {
      console.log("Error createBook:", error);
    }
  }

  async getBookByTitle(req, res) {
    try {
      const { title } = req.params;
      const book = await BooksService.getBookByTitle(title);
      res.send(book);
    } catch (error) {
      console.log("Error getUserByEmail: ", error);
    }
  }

  async getBookByData(req, res) {
    try {
      const { title, author } = req.query;
      const book = await BooksService.getBookByData(title, author);
      res.json(book);
    } catch (error) {
      console.log("Error getBook: ", error);
    }
  }
  async countAllBooks(req, res) {
    try {
      const book = await BooksService.countAllBooks();
      res.json(book);
    } catch (error) {
      console.log("Error countsBook: ", error);
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, year, pageCount } = req.body;
      const updatedBook = await BooksService.updateBook(id, {
        title,
        author,
        year,
        pageCount,
      });
      res.json(updatedBook);
    } catch (error) {
      console.log("Error updating book: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteBookByTitle(req, res) {
    try {
      const { title } = req.params;
      await BooksService.deleteBookByTitle(title);
      res.status(200).json("DONE");
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}

module.exports = new BooksController();
