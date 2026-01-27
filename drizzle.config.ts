import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

function getLocalD1Path() {
  const basePath = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
  if (fs.existsSync(basePath)) {
    const files = fs.readdirSync(basePath);
    const sqliteFile = files.find((f) => f.endsWith(".sqlite"));
    if (sqliteFile) {
      return path.join(basePath, sqliteFile);
    }
  }
  return "local.sqlite";
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: getLocalD1Path(),
  },
});
