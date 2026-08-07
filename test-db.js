require("dotenv").config({ path: ".env.local" });

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: false,
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");

    console.log("✅ Conexión exitosa");
    console.log(result.rows);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);

    process.exit(1);
  }
})();
