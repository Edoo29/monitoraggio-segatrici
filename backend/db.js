import sql from "mssql";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), ".env")
      : ".env",
});

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

console.log("DB CONFIG:", config);

export const poolPromise = sql
  .connect(config)
  .then((pool) => {
    console.log("✅ DB CONNESSO");
    return pool;
  })
  .catch((err) => {
    console.error("❌ ERRORE DB:", err);
    throw err;
  });
