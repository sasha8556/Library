const express = require("express");
const router = express.Router();

const booksRoutes = require("./bookRoutes");
const usersRoutes = require("./userRoutes");

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);

module.exports = router;