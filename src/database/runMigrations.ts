import { PoolClient } from "pg";

const fs = require("fs").promises;
const path = require("path");

export async function runMigration(
  client: PoolClient,
  migrationsDir = path.join(__dirname, "migrations")
) {
  const files = await fs.readdir(migrationsDir);
  for (const file of files) {
    if (path.extname(file) === ".sql" && !file.includes("_undo")) {
      const filePath = path.join(migrationsDir, file);
      const query = await fs.readFile(filePath, "utf8");
      await client.query(query);
      await client.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
      console.log(`${file} migration executed and registered successfully!`);
    }
  }
}
