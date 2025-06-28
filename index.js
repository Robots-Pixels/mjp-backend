import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin:"*",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
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
