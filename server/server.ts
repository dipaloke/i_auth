"use strict";
import cors from "cors";
const express = require("express");
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

const app = express();



app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on post: ${PORT} `);
});
