// En AWS, estas variables vienen de variables de entorno del EC2
// (nunca hardcodeadas), idealmente inyectadas desde Secrets Manager.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
})

export default pool