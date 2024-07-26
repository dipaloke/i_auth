const express = require("express");
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import { prisma } from "./utils/db";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// prisma
//   .$connect()
//   .then(() => {
//     console.log("Prisma connected to DB");
//   })
//   .catch((error) => {
//     console.error("Prisma failed to connect to DB", {error});
//   });

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT} `);
});
