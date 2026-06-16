import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { poolPromise } from "./db.js";
import sql from "mssql";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend attivo");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend avviato su http://localhost:${PORT}`);
});
