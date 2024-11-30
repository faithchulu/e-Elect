const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./firebaseAdmin");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");

// Read SSL certificates
const privateKey = fs.readFileSync("C:/Users/User/key.pem", "utf8");
const certificate = fs.readFileSync("C:/Users/User/cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: ["http://localhost:3000", "https://e-elect.vercel.app"],
    origin: "*",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
  })
);

const scanRoutes = require("./routes/scanRoutes");

app.get("/", (req, res) => {
  res.send("<h2>E-elect backend server 2 up and running!</h2>");
});

// Use routes

app.use("/api/scan", scanRoutes);

const PORT = 5000;

https.createServer(credentials, app).listen(PORT, () => {
  console.log(`E-Voting Backend Server running on https://localhost:${PORT}`);
});
