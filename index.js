const express = require("express");
const cors = require("cors");
const db = require("./db");
const bodyParser = require('body-parser')
const app = express();
const helmet = require("helmet");
require("dotenv").config();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});