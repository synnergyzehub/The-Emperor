import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "../server/db";
import { testConnection } from "../server/db";

async function main() {
  console.log("Testing database connection...");
  const connected = await testConnection();
  
  if (!connected) {
    console.error("Failed to connect to database. Please check your DATABASE_URL environment variable.");
    process.exit(1);
  }

  console.log("Pushing schema changes to database...");
  
  try {
    // Apply schema changes to database
    await migrate(db, { migrationsFolder: "./drizzle" });
    
    console.log("Schema push completed successfully!");
  } catch (error) {
    console.error("Failed to push schema:", error);
    process.exit(1);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});