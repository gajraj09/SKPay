import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

const app = express();

app.use(cors({
    origin: `${import.meta.env.FRONTEND_URL}`, // Replace with your frontend URL
    methods: ["GET", "POST"]
}));

app.use(express.json());
app.use('/auth', authRouter);

app.options('*', cors()); // Enable pre-flight for all routes

app.get('/', (req, res) => {
    res.send("Welcome to the API!"); // Send a response to the client
});

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});