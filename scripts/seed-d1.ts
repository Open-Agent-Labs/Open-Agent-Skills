/**
 * Seed D1 database with skills data from src/data/skills.ts
 * 
 * Usage:
 *   tsx scripts/seed-d1.ts
 * 
 * Prerequisites:
 *   1. Create D1 database: npx wrangler d1 create open-agent-skills-db
 *   2. Update wrangler.jsonc with the database_id
 *   3. Run migrations: npx wrangler d1 migrations apply open-agent-skills-db --local
 */

import { skills } from "../src/data/skills";

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
}

interface D1Result<T = unknown> {
  success: boolean;
  meta: { changes: number; last_row_id: number };
  results?: T[];
}

async function seedSkills(db: D1Database) {
  console.log(`Seeding ${skills.length} skills...`);

  const statements: D1PreparedStatement[] = [];

  for (const skill of skills) {
    // Insert skill
    statements.push(
      db.prepare(
        `INSERT OR REPLACE INTO skills (
          id, name, description, description_zh, content, content_zh,
          category, repository, author, featured, official
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        skill.id,
        skill.name,
        skill.description,
        skill.descriptionZh || null,
        skill.content || null,
        skill.contentZh || null,
        skill.category,
        skill.repository,
        skill.author || null,
        skill.featured ? 1 : 0,
        skill.official ? 1 : 0
      )
    );

    // Insert tags
    if (skill.tags && skill.tags.length > 0) {
      for (const tag of skill.tags) {
        statements.push(
          db.prepare(
            `INSERT OR REPLACE INTO skill_tags (skill_id, tag) VALUES (?, ?)`
          ).bind(skill.id, tag)
        );
      }
    }
  }

  // Execute all statements in batches
  const batchSize = 100;
  for (let i = 0; i < statements.length; i += batchSize) {
    const batch = statements.slice(i, i + batchSize);
    await db.batch(batch);
    console.log(`Processed ${Math.min(i + batchSize, statements.length)}/${statements.length} statements`);
  }

  console.log("✅ Seeding completed successfully!");
}

// This script is intended to be run via wrangler or a custom runner
// For now, export the seed function to be used in a worker context
export { seedSkills };

// For local testing with wrangler, you can use:
// npx wrangler d1 execute open-agent-skills-db --local --file=./path/to/generated.sql
console.log(`
To seed the database:
1. Generate SQL file: tsx scripts/generate-seed-sql.ts > seed.sql
2. Run: npx wrangler d1 execute open-agent-skills-db --local --file=seed.sql
   (or without --local for production)
`);
