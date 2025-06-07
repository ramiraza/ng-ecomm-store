// loading environment variables
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';
// routes
import CategoryRoutes from '@routes/category';
import brandRoutes from '@routes/brand'

const app = express();
const port: number = parseInt(process.env.PORT || '3000');

// add cross-origin
app.use(cors());
// json parsing
app.use(express.json({ limit: '10mb' }));
// url encoding
app.use(express.urlencoded({ extended: true }));

interface ConnectDBOptions {
  dbName: string;
  maxPoolSize: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
}

const connectDB = async (uri: string, database: string): Promise<void> => {
  try {
    const options: ConnectDBOptions = {
      dbName: database,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };
    await mongoose.connect(uri, options)
    console.log('✅ Connected to MongoDB Atlas');

  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

const uri = process.env.MONGODB_URI;
const databaseName = process.env.DB_NAME;

// initialize mongoDB connection

// mongoose.disconnect()
if (!uri || !databaseName) {
  console.error('❌ MONGODB_URI or DB_NAME environment variable is missing.');
  process.exit(1);
}
connectDB(uri, databaseName).then()

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('root path successfully approached');
});

app.use('/api/category', CategoryRoutes);
app.use('/api/brand', brandRoutes);

// gracefully shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

const server = app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;
