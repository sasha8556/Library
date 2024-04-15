const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/userControllers");

router.get("/", UsersController.getUser);
router.post("/create", UsersController.createUser);
router.get("/findOne/:email", UsersController.getUserByEmail);
router.patch("/update/:email", UsersController.updateUserByEmail);
router.delete("/destroy/:email", UsersController.deleteUserByEmail);

module.exports = router;
