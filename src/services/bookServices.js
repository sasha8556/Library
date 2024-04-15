const { Books } = require("../models/models");
class BooksService {
  async getBooks({ offset, limit }) {
    return await Books.findAll({
      offset,
      limit,
    });
  }

  async createBook(newBook) {
    const book = await Books.create(newBook);
    return book;
  }
  async getBookByTitle(title) {
    const book = await Books.findOne({ where: { title: title } });
    return book;
  }

  async getBookByData(title, author) {
    const book = await Books.findOne({
      where: {
        title: title,
        author: author,
      },
    });
    return book;
  }
  async countAllBooks() {
    const bookResult = await Books.findAndCountAll();
    const counts = {
      bookCount: bookResult.count,
    };
    return counts;
  }

  async updateBook(id, data) {
    const [updatedRowCount, [updatedBook]] = await Books.update(data, {
      where: { id },
      returning: true,
    });
    if (updatedRowCount === 0) {
      throw new Error("Book not found");
    }
    return updatedBook;
  }

  async deleteBookByTitle(title) {
    const book = await Books.findOne({ where: { title } });
    if (!book) {
      throw new Error("Book not found");
    }
    return await book.destroy();
  }
}

module.exports = new BooksService();
