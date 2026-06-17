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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend avviato su http://localhost:${PORT}`);
});

app.get("/tagli", async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().input("cdl", sql.Int, 50723).query(`
        SELECT *
        FROM DATALOG_TAGLI
        WHERE CDL = @cdl
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
