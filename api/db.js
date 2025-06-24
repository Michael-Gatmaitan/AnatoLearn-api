const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString:
  //   "postgresql://localhost:5432/anatolearn?user=postgres&password=michealpostgre",
  ssl: {
    rejectUnauthorized: false, // required for Supabase SSL
  },
});

module.exports = pool;
