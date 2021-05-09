const express = require("express");
const bankRouter = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

//TODO get all banks --- /api/banks/all  --> Done
//TODO implement cacheing for bulk data reterival on frontend application
bankRouter.route("/all").get((req, res) => {
  client.query("select * from banks order by id asc;", (error, result) => {
    if (error) {
      res
        .status(400)
        .json({ message: "An error occured. Please try again later!" });
    }
    if (result.rowCount === 0 || result.rowCount === null) {
      res.status(404).json({ message: "Requested value is not present." });
    } else {
      res.status(200).json({ banks: result.rows });
    }
  });
});

module.exports = bankRouter;
