import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend attivo");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Backend avviato su http://localhost:${PORT}`);

  try {
    const db = await import("./db.js");
    poolPromise = db.poolPromise;
  } catch (err) {
    console.error("❌ DB INIT ERROR:", err);
  }
});

app.get("/cdl/exists/:cdl", async (req, res) => {
  try {
    const pool = await poolPromise;
    const cdl = Number(req.params.cdl);

    const result = await pool.request().input("cdl", sql.Int, cdl).query(`
        SELECT TOP 1 1 as ok
        FROM DATALOG_TAGLI
        WHERE CDL = @cdl
      `);

    const exists = result.recordset.length > 0;

    res.json({ exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cdl/:cdl/data", async (req, res) => {
  try {
    const pool = await poolPromise;
    const cdl = Number(req.params.cdl);

    const result = await pool.request().input("cdl", sql.Int, cdl).query(`
        SELECT *
        FROM DATALOG_TAGLI
        WHERE CDL = @cdl
        ORDER BY S_DATE DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cdl/:cdl/count", async (req, res) => {
  try {
    const pool = await poolPromise;
    const cdl = Number(req.params.cdl);

    const result = await pool.request().input("cdl", sql.Int, cdl).query(`
        SELECT COUNT(*) AS total
        FROM DATALOG_TAGLI
        WHERE CDL = @cdl
      `);

    res.json({ total: result.recordset[0].total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/datalog/:cdl", async (req, res) => {
  try {
    const pool = await poolPromise;
    const cdl = Number(req.params.cdl);

    const result = await pool.request().input("cdl", sql.Int, cdl).query(`
        SELECT *
        FROM DATALOG_TAGLI
        WHERE CDL = @cdl
        ORDER BY S_DATE DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
