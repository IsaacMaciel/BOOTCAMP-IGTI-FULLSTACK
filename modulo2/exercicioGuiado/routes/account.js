const express = require("express");
const router = express.Router();
const { promises } = require("fs");
const fs = promises;

const accountController = require("../controllers/accountController");

router
  .route("/")
  .post(accountController.store)
  .get(accountController.index)
  .put(accountController.update);

router
  .route("/:id")
  .get(accountController.show)
  .delete(accountController.destroy);

module.exports = router;
