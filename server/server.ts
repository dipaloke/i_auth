const express = require("express");
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import { prisma } from "./utils/db";
import bodyParser from "body-parser";
import { NextFunction } from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.SITE_URL,
  })
);
app.use(bodyParser.json());

//logging incoming req
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming requests: method: ${req.method} URL: ${req.url}`)
  next()
})


// prisma
//   .$connect()
//   .then(() => {
//     console.log("Prisma connected to DB");
//   })
//   .catch((error) => {
//     console.error("Prisma failed to connect to DB", {error});
//   });

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT} `);
});
