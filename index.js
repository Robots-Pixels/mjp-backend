import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: ['*'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT

app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

app.get('/test', cors(), (req, res) => {
    res.json({message: "CORS works!"});
  });

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("§ Connected to MongoDB...");
    app.listen(PORT, () => {
        console.log(`Server runnig on port ${PORT}...`);
    })
})
.catch((err) => {
    console.error(`§ Connexion to Mongo Error: ${err}`);
});
