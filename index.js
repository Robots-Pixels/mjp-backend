import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://mjp-admin.vercel.app', 'https://mjp-signup.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT


app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);


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
