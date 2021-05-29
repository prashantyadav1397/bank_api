const express = require("express");
const branchRouter = express.Router();

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

//TODO get all bank branches data --- /api/branches/all  --> Done
//TODO implement cacheing for bulk data reterival on frontend application
branchRouter.route("/all").get((req, res) => {
  client.query("select * from branches order by ifsc asc;", (error, result) => {
    if (error) {
      res
        .status(400)
        .json({ message: "An error occured. Please try again later!" });
    }
    if (result.rowCount === 0 || result.rowCount === null) {
      res.status(404).json({ message: "Requested value is not present." });
    } else {
      res.status(200).json({ branches: result.rows });
    }
  });
});

//TODO get branches information using autocomplete branch name ---  /api/branches/autocomplete/branch/:branch/limit/:limit  --> Done
branchRouter
  .route("/autocomplete/branch/:branch/limit/:limit")
  .get((req, res) => {
    let branch = req.params.branch;
    const limit = parseInt(req.params.limit);
    let str = branch.toUpperCase();
    client.query(
      "select * from branches where branch like " +
        `'${str}%'` +
        " order by ifsc ASC LIMIT $1;",
      [limit],
      (error, result) => {
        if (error) {
          res
            .status(400)
            .json({ message: "An error occured. Please try again later" });
        }
        if (result.rowCount === 0 || result.rowCount === null) {
          res.status(404).json({ message: "Requested value is not present." });
        } else {
          res.status(200).json({ branches: result.rows });
        }
      }
    );
  });

//TODO get a bank detail based on the IFSC code --- /api/branches/autocomplete/branch/ifsc/:ifsc/all --> Done
branchRouter.route("/autocomplete/branch/ifsc/:ifsc/all").get((req, res) => {
  let ifsc = req.params.ifsc;
  let str = ifsc.toUpperCase();
  client.query(
    "select * from branches where ifsc like " + `'${str}%'` + " ;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ branches: result.rows });
      }
    }
  );
});

//TODO get a single bank detail based on the IFSC code --- /api/branches/autocomplete/branch/ifsc/:ifsc --> Done
branchRouter.route("/autocomplete/branch/ifsc/:ifsc").get((req, res) => {
  let ifsc = req.params.ifsc;
  let str = ifsc.toUpperCase();
  client.query(
    "select * from branches where ifsc = " + `'${str}'` + " ;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ branches: result.rows });
      }
    }
  );
});

//TODO get all branches for a given city --- /api/branches/cities/city/:city --> Done
//TODO implement cacheing for bulk data reterival on frontend application
branchRouter.route("/cities/city/:city").get((req, res) => {
  let city = req.params.city;
  let str = city.toUpperCase();
  client.query(
    "select * from branches where city =" + `'${str}'` + " order by ifsc ASC;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ branches: result.rows });
      }
    }
  );
});

//TODO get branches information using city name and limit --- /api/branches/city/:city/limit/:limit  --> Done
branchRouter.route("/city/:city/limit/:limit").get((req, res) => {
  let city = req.params.city;
  let str = city.toUpperCase();
  const limit = parseInt(req.params.limit);
  client.query(
    "select * from branches where city = " +
      `'${str}'` +
      " order by city asc LIMIT $1;",
    [limit],
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ branches: result.rows });
      }
    }
  );
});

//TODO update not required

//TODO get distinct branch names --- /api/branches/branch  -->Done
//TODO implement cacheing for bulk data reterival on frontend application
branchRouter.route("/branch").get((req, res) => {
  client.query(
    "select distinct branch from branches order by branch asc;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ branches: result.rows });
      }
    }
  );
});

//TODO get distinct city --- /api/branches/cities  --> Done
//TODO implement cacheing for bulk data reterival on frontend application
branchRouter.route("/cities").get((req, res) => {
  client.query(
    "select distinct city from branches order by city asc;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ cities: result.rows });
      }
    }
  );
});

//TODO get distinct city --- /api/branches/ifsc  --> Done
//TODO implement cacheing for bulk data reterival on frontend application
branchRouter.route("/ifsc").get((req, res) => {
  client.query(
    "select distinct ifsc from branches order by ifsc asc;",
    (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ message: "An error occured. Please try again later" });
      }
      if (result.rowCount === 0 || result.rowCount === null) {
        res.status(404).json({ message: "Requested value is not present." });
      } else {
        res.status(200).json({ cities: result.rows });
      }
    }
  );
});

module.exports = branchRouter;
