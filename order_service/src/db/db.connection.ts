import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { DB_URL } from "../config";
import { NodePgDatabase } from "drizzle-orm/node-postgres/driver";
const client = postgres(DB_URL);

export const DB: NodePgDatabase<typeof schema> = drizzle({ client, schema });
