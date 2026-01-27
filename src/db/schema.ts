import { sqliteTable, text, integer, index, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

/**
 * Skills 表定义
 * 存储所有 Agent Skills 的核心信息
 */
export const skills = sqliteTable("skills", {
  id: text("id").primaryKey().notNull(), // 技能唯一标识符
  name: text("name").notNull(), // 技能名称
  description: text("description").notNull(), // 英文描述
  descriptionZh: text("description_zh"), // 中文描述
  content: text("content"), // 英文详细内容（Markdown 格式）
  contentZh: text("content_zh"), // 中文详细内容（Markdown 格式）
  category: text("category").notNull(), // 技能分类
  repository: text("repository").notNull(), // GitHub 仓库地址
  author: text("author"), // 作者名称
  featured: integer("featured").notNull().default(0), // 是否精选（0=否, 1=是）
  official: integer("official").notNull().default(0), // 是否官方技能（0=否, 1=是）
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), // 创建时间
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`), // 更新时间
}, (table) => [
  // 索引定义：加速按分类、精选、官方状态查询
  index("idx_skills_category").on(table.category),
  index("idx_skills_featured").on(table.featured),
  index("idx_skills_official").on(table.official),
]);

/**
 * Skill Tags 关联表
 * 存储技能的标签（多对多关系）
 */
export const skillTags = sqliteTable("skill_tags", {
  skillId: text("skill_id").notNull().references(() => skills.id, { onDelete: 'cascade' }), // 技能ID（外键，级联删除）
  tag: text("tag").notNull(), // 标签名称
}, (table) => [
  primaryKey({ columns: [table.skillId, table.tag] }), // 复合主键：一个技能可以有多个标签
  index("idx_skill_tags_tag").on(table.tag), // 标签索引：加速按标签查询
]);
