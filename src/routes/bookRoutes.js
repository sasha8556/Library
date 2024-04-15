const express = require("express");
const router = express.Router();
const BooksController = require("../controllers/bookControllers");

router.get("/", BooksController.getBooks);
router.get("/search", BooksController.getBookByData);
router.get("/findOne/:title", BooksController.getBookByTitle);
router.get("/counts", BooksController.countAllBooks);
router.post("/create", BooksController.createBook);
router.patch("/update/:id", BooksController.updateBook);
router.delete("/destroy/:title", BooksController.deleteBookByTitle);

module.exports = router;
