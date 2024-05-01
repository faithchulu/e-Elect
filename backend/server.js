const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Catch-All for unmatched routes
app.use('*', (req, res) => {
    res.status(404).json({ message: "URL not found" });
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`E-Voting Backend Server running on http://localhost:${PORT}`);
});