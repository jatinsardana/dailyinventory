import express from 'express';
const app = express();
app.use(express.json());
// \end{code}

import mongoose from 'mongoose';

import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();

import router from './Routes/router.js';
app.use(router);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
  

app.listen(process.env.PORT || 4000 || 3001, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
// index.js
