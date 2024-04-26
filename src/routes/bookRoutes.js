const express = require("express");
const router = express.Router();
const BooksController = require("../controllers/bookControllers");

const { body,param,query } = require("express-validator");

const validateBook = [
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isString()
    .withMessage("Title must be a string"),
  body("author")
    .notEmpty()
    .withMessage("Author cannot be empty")
    .isString()
    .withMessage("Author must be a string"),
  body("year")
    .notEmpty()
    .withMessage("Year cannot be empty")
    .isInt({ min: 1000, max: 9999 })
    .withMessage("Year must be a valid 4-digit integer"),
  body("pageCount")
    .notEmpty()
    .withMessage("Page count cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Page count must be a positive integer"),
  body("userId")
    .notEmpty()
    .withMessage("User ID cannot be empty")
    .isInt()
    .withMessage("User ID must be an integer"),
];

const validateTitleParam = [
    param("title")
      .notEmpty().withMessage("Title parameter cannot be empty")
      .isString().withMessage("Title parameter must be a string")
  ];

  const validateIdParam = [
    param("id")
      .notEmpty().withMessage("ID parameter cannot be empty")
      .isInt().withMessage("ID parameter must be an integer")
  ];

  const validateQueryParams = [
    query("title")
      .isString().withMessage("Title parameter must be a string"),
    query("author")
      .isString().withMessage("Author parameter must be a string"),
  ];
  

router.get("/", BooksController.getBooks);
router.get("/search",validateQueryParams, BooksController.getBookByData);
router.get("/findOne/:title",validateTitleParam, BooksController.getBookByTitle);
router.get("/counts", BooksController.countAllBooks);
router.post("/create",validateBook, BooksController.createBook);
router.patch("/update/:id",validateIdParam,validateBook, BooksController.updateBook);
router.delete("/destroy/:title",validateTitleParam, BooksController.deleteBookByTitle);

module.exports = router;
