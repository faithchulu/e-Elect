const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const {db} = require('./firebase')

// Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
}))

// Import routes
const votingRoutes = require('./routes/votingRoutes');
const tallyingRoutes = require('./routes/tallyingRoutes');
const voterRoutes = require('./routes/voterRoutes');

// Use routes
app.use('/api/voting', votingRoutes);
app.use('/api/tallying', tallyingRoutes);
app.use('/api/voter', voterRoutes);


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`E-Voting Backend Server running on http://localhost:${PORT}`);
});