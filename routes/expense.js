const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense");

router.post("/new", expenseController.postNewExpense);

module.exports = router;
