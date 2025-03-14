import postgres from "postgres";
import { DB_URL } from "./src/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigration() {
  try {
    console.log("migration start...");
    const client = postgres(DB_URL);
    const db = drizzle({ client });
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migration was successfull");
    client.end();
  } catch (error) {
    console.log("migration error", error);
  }
}

runMigration();
