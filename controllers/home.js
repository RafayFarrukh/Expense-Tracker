const db = require("../models");
const Record = db.Record;

module.exports = {
  getHome: async (req, res) => {
    try {
      const records = await Record.findAll({
        where: { UserId: req.user.userID },
        order: [["date", "DESC"]],
      });

      let _income = 0;
      records
        .filter((r) => r.category === "Income")
        .map((r) => (_income += r.amount));

      let _expense = 0;
      records
        .filter((r) => r.category === "Expenses")
        .map((r) => (_expense += r.amount));

      res
        .status(200)
        .json({
          records,
          totalAmount: _income - _expense,
          chartData: [_income, _expense],
        });
    } catch (err) {
      return console.log(err);
    }
  },
};
