// app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import candidateRoutes from './routes/candidateRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);

export default app;

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`E-Voting Backend Server running on http://localhost:${PORT}`);
});