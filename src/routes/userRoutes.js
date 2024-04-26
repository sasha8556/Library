const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/userControllers");

const { body,param } = require("express-validator");

const validateDataBodyUser = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
];

const validateEmailParam = [
  param("email")
    .notEmpty().withMessage("Email parameter cannot be empty")
    .isEmail().withMessage("Invalid email format")
];

router.get("/", UsersController.getUser);
router.post("/create",validateDataBodyUser, UsersController.createUser);
router.get("/findOne/:email",validateEmailParam, UsersController.getUserByEmail);
router.patch("/update/:email",validateEmailParam, UsersController.updateUserByEmail);
router.delete("/destroy/:email",validateEmailParam, UsersController.deleteUserByEmail);

module.exports = router;
