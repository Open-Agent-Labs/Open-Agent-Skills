/**
 * Generate SQL file for seeding D1 database
 * 
 * Usage:
 *   tsx scripts/generate-seed-sql.ts > migrations/seed.sql
 *   npx wrangler d1 execute open-agent-skills-db --local --file=migrations/seed.sql
 */

import { skills } from "../src/data/skills";

function escapeSqlString(str: string | undefined | null): string {
  if (str === null || str === undefined) {
    return "NULL";
  }
  return "'" + str.replace(/'/g, "''") + "'";
}

console.log("-- Generated seed data from src/data/skills.ts");
console.log("-- Run with: npx wrangler d1 execute open-agent-skills-db --local --file=migrations/seed.sql\n");

for (const skill of skills) {
  console.log(
    `INSERT OR REPLACE INTO skills (id, name, description, description_zh, content, content_zh, category, repository, author, featured, official) VALUES (` +
    `${escapeSqlString(skill.id)}, ` +
    `${escapeSqlString(skill.name)}, ` +
    `${escapeSqlString(skill.description)}, ` +
    `${escapeSqlString(skill.descriptionZh)}, ` +
    `${escapeSqlString(skill.content)}, ` +
    `${escapeSqlString(skill.contentZh)}, ` +
    `${escapeSqlString(skill.category)}, ` +
    `${escapeSqlString(skill.repository)}, ` +
    `${escapeSqlString(skill.author)}, ` +
    `${skill.featured ? 1 : 0}, ` +
    `${skill.official ? 1 : 0});`
  );

  if (skill.tags && skill.tags.length > 0) {
    for (const tag of skill.tags) {
      console.log(
        `INSERT OR REPLACE INTO skill_tags (skill_id, tag) VALUES (${escapeSqlString(skill.id)}, ${escapeSqlString(tag)});`
      );
    }
  }
}

console.log("\n-- Seed data generation complete");
