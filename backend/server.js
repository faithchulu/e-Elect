const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./firebaseAdmin");

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

// Import routes
const votingRoutes = require("./routes/votingRoutes");
const tallyingRoutes = require("./routes/tallyingRoutes");
const voterRoutes = require("./routes/voterRoutes");
const partyRoutes = require("./routes/partyRoutes");
const electionRoutes = require("./routes/electionRoutes");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.get("/", (req, res) => {
  res.send("<h2>E-elect backend server up and running!</h2>");
});

// Use routes
app.use("/api/vote", votingRoutes);
app.use("/api/tallying", tallyingRoutes);
app.use("/api/voter", voterRoutes);
app.use("/api/party", partyRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/candidate", candidateRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`E-Voting Backend Server running on http://localhost:${PORT}`);
});
