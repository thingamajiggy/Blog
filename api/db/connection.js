import pg from "pg";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const ENV = process.env.NODE_ENV || "development";
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: `${__dirname}/../.env`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.PGDATABASE,
      };

export default new pg.Pool(config);
