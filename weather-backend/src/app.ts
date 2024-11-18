import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db'; // Import MongoDB connection
import weatherRoutes from './routes/weather'; // Import weather routes

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); /* NEW */

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['https://localhost:3001',
  'https://nimbuzz.xyz','https://www.nimbuzz.xyz'
];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', weatherRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
