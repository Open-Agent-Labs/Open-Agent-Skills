import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Category, Skill } from "@/data/skills";
import { skills as staticSkills } from "@/data/skills";

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

export interface D1Result<T = unknown> {
  success: boolean;
  meta?: { changes?: number; last_row_id?: number; duration?: number };
  results?: T[];
}

interface SkillRow {
  id: string;
  name: string;
  description: string;
  description_zh: string | null;
  content: string | null;
  content_zh: string | null;
  category: string;
  repository: string;
  author: string | null;
  featured: number;
  official: number;
  created_at: string;
  updated_at: string;
}

interface TagRow {
  tag: string;
}

function getDB(): D1Database | null {
  try {
    const context = getCloudflareContext();
    const env = context.env as Record<string, unknown>;
    const db = env.DB;
    if (!db) {
      console.warn("D1 database binding 'DB' not found, falling back to static data");
      return null;
    }
    return db as D1Database;
  } catch (error) {
    // During build or in some dev environments, getCloudflareContext might fail
    console.warn("getCloudflareContext failed, falling back to static data:", error instanceof Error ? error.message : String(error));
    return null;
  }
}

function rowToSkill(row: SkillRow, tags: string[] = []): Skill {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    descriptionZh: row.description_zh || undefined,
    content: row.content || undefined,
    contentZh: row.content_zh || undefined,
    category: row.category as Category,
    repository: row.repository,
    author: row.author || undefined,
    tags: tags.length > 0 ? tags : undefined,
    featured: row.featured === 1,
    official: row.official === 1,
  };
}

export async function getSkillById(id: string): Promise<Skill | null> {
  const db = getDB();
  if (!db) {
    return staticSkills.find((s) => s.id === id) || null;
  }

  const skillRow = await db
    .prepare("SELECT * FROM skills WHERE id = ?")
    .bind(id)
    .first<SkillRow>();

  if (!skillRow) {
    return null;
  }

  const tagsResult = await db
    .prepare("SELECT tag FROM skill_tags WHERE skill_id = ?")
    .bind(id)
    .all<TagRow>();

  const tags = tagsResult.results?.map((t) => t.tag) || [];

  return rowToSkill(skillRow, tags);
}

export interface GetSkillsParams {
  category?: Category;
  featured?: boolean;
  official?: boolean;
  tag?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getSkills(params: GetSkillsParams = {}): Promise<Skill[]> {
  const db = getDB();
  const {
    category,
    featured,
    official,
    tag,
    search,
    limit = 1000,
    offset = 0,
  } = params;

  if (!db) {
    let result = [...staticSkills];
    if (category) result = result.filter((s) => s.category === category);
    if (featured !== undefined) result = result.filter((s) => s.featured === featured);
    if (official !== undefined) result = result.filter((s) => s.official === official);
    if (tag) result = result.filter((s) => s.tags?.includes(tag));
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerSearch) ||
          s.description.toLowerCase().includes(lowerSearch)
      );
    }
    return result.slice(offset, offset + limit);
  }

  let query = "SELECT DISTINCT s.* FROM skills s";
  const bindings: unknown[] = [];

  if (tag) {
    query += " INNER JOIN skill_tags st ON s.id = st.skill_id";
  }

  const conditions: string[] = [];

  if (category) {
    conditions.push("s.category = ?");
    bindings.push(category);
  }

  if (featured !== undefined) {
    conditions.push("s.featured = ?");
    bindings.push(featured ? 1 : 0);
  }

  if (official !== undefined) {
    conditions.push("s.official = ?");
    bindings.push(official ? 1 : 0);
  }

  if (tag) {
    conditions.push("st.tag = ?");
    bindings.push(tag);
  }

  if (search) {
    conditions.push(
      "(s.name LIKE ? OR s.description LIKE ? OR s.description_zh LIKE ?)"
    );
    const searchPattern = `%${search}%`;
    bindings.push(searchPattern, searchPattern, searchPattern);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY s.featured DESC, s.official DESC, s.name ASC";
  query += " LIMIT ? OFFSET ?";
  bindings.push(limit, offset);

  const result = await db.prepare(query).bind(...bindings).all<SkillRow>();

  if (!result.results || result.results.length === 0) {
    return [];
  }

  const skillsWithTags = await Promise.all(
    result.results.map(async (row) => {
      const tagsResult = await db
        .prepare("SELECT tag FROM skill_tags WHERE skill_id = ?")
        .bind(row.id)
        .all<TagRow>();
      const tags = tagsResult.results?.map((t) => t.tag) || [];
      return rowToSkill(row, tags);
    })
  );

  return skillsWithTags;
}

export async function getAllSkills(): Promise<Skill[]> {
  return getSkills({ limit: 10000 });
}

export async function getFeaturedSkills(): Promise<Skill[]> {
  return getSkills({ featured: true });
}

export async function getOfficialSkills(): Promise<Skill[]> {
  return getSkills({ official: true });
}

export async function getSkillsByCategory(category: Category): Promise<Skill[]> {
  return getSkills({ category });
}

export async function searchSkills(query: string): Promise<Skill[]> {
  return getSkills({ search: query });
}

export async function getRelatedSkills(skillId: string, limit = 3): Promise<Skill[]> {
  const skill = await getSkillById(skillId);
  if (!skill) return [];

  const relatedSkills = await getSkills({
    category: skill.category,
    limit: limit + 1,
  });

  return relatedSkills.filter((s) => s.id !== skillId).slice(0, limit);
}
