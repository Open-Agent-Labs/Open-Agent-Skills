import { sqliteTable, text, integer, index, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const skills = sqliteTable("skills", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  descriptionZh: text("description_zh"),
  content: text("content"),
  contentZh: text("content_zh"),
  category: text("category").notNull(),
  repository: text("repository").notNull(),
  author: text("author"),
  featured: integer("featured").notNull().default(0),
  official: integer("official").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("idx_skills_category").on(table.category),
  index("idx_skills_featured").on(table.featured),
  index("idx_skills_official").on(table.official),
]);

export const skillTags = sqliteTable("skill_tags", {
  skillId: text("skill_id").notNull().references(() => skills.id, { onDelete: 'cascade' }),
  tag: text("tag").notNull(),
}, (table) => [
  primaryKey({ columns: [table.skillId, table.tag] }),
  index("idx_skill_tags_tag").on(table.tag),
]);
