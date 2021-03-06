const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
require("dotenv").config();
const initializeDB = require("./config/db");

// PORT
const PORT = process.env.PORT || 4001;
// Routes
const { AuthRoutes, MobileRoutes } = require("./routes");

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "public")));

initializeDB();

app.use("/auth", AuthRoutes);

app.use("/phone", MobileRoutes);

app.use((req, res, next) => {
   let status = req.statusCode || 500;
   let errMessage = req.statusMessage || "Url Not Found";
   res.status(status).send({ message: errMessage });
});

app.listen(PORT, () => {
   console.log(`Server Up and Running on PORT:${PORT}`);
});
