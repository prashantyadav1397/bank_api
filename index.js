const express = require("express");
const app = express();
const banks = require("./router/banks");
const branches = require("./router/branches");

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

//TODO add routes to the application --> Done
app.use("/api/banks", banks);
app.use("/api/branches", branches);

//TODO default route --- / --> Done
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to bank api" });
});

app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});
