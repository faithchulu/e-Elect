const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./firebaseAdmin");
const cookieParser = require("cookie-parser");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors()
);

const scanRoutes = require("./routes/scanRoutes");

app.get("/", (req, res) => {
  res.send("<h2>E-elect backend server 2 up and running!</h2>");
});

// Use routes

app.use("/api/scan", scanRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`E-Voting Backend Server running on http://localhost:${PORT}`);
});
