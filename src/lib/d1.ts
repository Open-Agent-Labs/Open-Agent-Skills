import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Category, Skill } from "@/data/skills";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { eq, and, or, like, desc, asc, inArray, sql } from "drizzle-orm";
import { pinyin } from "pinyin-pro";

/**
 * 获取 D1 数据库实例
 * @returns Drizzle ORM 数据库实例或 null（当数据库不可用时）
 */
function getDB() {
  // 1. 预检查：如果在构建阶段，直接返回 null。
  // 在 Next.js 构建阶段，D1 绑定通常不可用，且 getCloudflareContext 会抛错。
  if (typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }

  try {
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const d1 = env.DB;
    if (!d1) {
      // 如果没有绑定，我们不能抛错导致整个应用崩溃（比如在某些开发环境下）
      // 而是返回 null 让调用方处理（虽然用户要求始终使用 D1，但在没有 D1 的环境还是得优雅一点）
      console.warn("D1 database binding 'DB' not found");
      return null;
    }
    return drizzle(d1, { schema });
  } catch (error: any) {
    // 针对用户遇到的 initOpenNextCloudflareForDev 未调用错误进行友好提示
    if (error?.message?.includes("initOpenNextCloudflareForDev")) {
      console.error("Cloudflare context not initialized. Please ensure 'initOpenNextCloudflareForDev()' is called in next.config.ts and restart the dev server.");
    } else {
      console.error("Failed to get D1 database:", error);
    }
    return null;
  }
}

/**
 * 根据 ID 获取单个技能
 * @param id 技能ID
 * @returns 技能对象或 null
 */
export async function getSkillById(id: string): Promise<Skill | null> {
  const db = getDB();
  if (!db) {
    // 如果没有数据库且是构建阶段，可以考虑是否要报错
    // 但为了应用能跑起来，目前只能返回 null。
    // 如果后续用户确定要在构建阶段也强制 D1，需要配置相应的构建环境。
    return null;
  }

  const result = await db.query.skills.findFirst({
    where: eq(schema.skills.id, id),
  });

  if (!result) {
    return null;
  }

  const tags = await db.query.skillTags.findMany({
    where: eq(schema.skillTags.skillId, id),
  });

  return {
    ...result,
    slug: result.slug || undefined,
    descriptionZh: result.descriptionZh || undefined,
    content: result.content || undefined,
    contentZh: result.contentZh || undefined,
    author: result.author || undefined,
    category: result.category as Category,
    featured: result.featured === 1,
    official: result.official === 1,
    tags: tags.length > 0 ? tags.map((t) => t.tag) : undefined,
  };
}

/**
 * 根据 name 获取单个技能
 * @param name 技能名称
 * @returns 技能对象或 null
 */
export async function getSkillByName(name: string): Promise<Skill | null> {
  const db = getDB();
  if (!db) {
    return null;
  }

  const result = await db.query.skills.findFirst({
    where: eq(schema.skills.name, name),
  });

  if (!result) {
    return null;
  }

  const tags = await db.query.skillTags.findMany({
    where: eq(schema.skillTags.skillId, result.id),
  });

  return {
    ...result,
    slug: result.slug || undefined,
    descriptionZh: result.descriptionZh || undefined,
    content: result.content || undefined,
    contentZh: result.contentZh || undefined,
    author: result.author || undefined,
    category: result.category as Category,
    featured: result.featured === 1,
    official: result.official === 1,
    tags: tags.length > 0 ? tags.map((t) => t.tag) : undefined,
  };
}

/**
 * 根据 slug 获取单个技能
 * @param slug 技能 slug
 * @returns 技能对象或 null
 */
export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const db = getDB();
  if (!db) {
    return null;
  }

  const result = await db.query.skills.findFirst({
    where: eq(schema.skills.slug, slug),
  });

  if (!result) {
    return null;
  }

  const tags = await db.query.skillTags.findMany({
    where: eq(schema.skillTags.skillId, result.id),
  });

  return {
    ...result,
    slug: result.slug || undefined,
    descriptionZh: result.descriptionZh || undefined,
    content: result.content || undefined,
    contentZh: result.contentZh || undefined,
    author: result.author || undefined,
    category: result.category as Category,
    featured: result.featured === 1,
    official: result.official === 1,
    tags: tags.length > 0 ? tags.map((t) => t.tag) : undefined,
  };
}

/**
 * 获取技能列表查询参数接口
 */
export interface GetSkillsParams {
  category?: Category; // 按分类筛选
  featured?: boolean; // 按精选状态筛选
  official?: boolean; // 按官方状态筛选
  tag?: string; // 按标签筛选
  search?: string; // 关键词搜索（名称、描述）
  limit?: number; // 返回数量限制
  offset?: number; // 分页偏移量
}

/**
 * 获取技能列表（支持多种筛选和分页）
 * @param params 查询参数
 * @returns 技能列表
 */
export async function getSkills(params: GetSkillsParams = {}): Promise<Skill[]> {
  const db = getDB();
  if (!db) return [];

  const {
    category,
    featured,
    official,
    tag,
    search,
    limit = 1000,
    offset = 0,
  } = params;

  const whereConditions = [];

  if (category) {
    whereConditions.push(eq(schema.skills.category, category));
  }
  if (featured !== undefined) {
    whereConditions.push(eq(schema.skills.featured, featured ? 1 : 0));
  }
  if (official !== undefined) {
    whereConditions.push(eq(schema.skills.official, official ? 1 : 0));
  }
  if (search) {
    const searchPattern = `%${search}%`;
    whereConditions.push(
      or(
        like(schema.skills.name, searchPattern),
        like(schema.skills.description, searchPattern),
        like(schema.skills.descriptionZh, searchPattern)
      )
    );
  }

  // 单独处理标签筛选：先查询包含该标签的技能 ID
  if (tag) {
    const taggedSkills = await db.query.skillTags.findMany({
      where: eq(schema.skillTags.tag, tag),
    });
    const skillIds = taggedSkills.map(ts => ts.skillId);
    if (skillIds.length === 0) return [];
    
    whereConditions.push(inArray(schema.skills.id, skillIds));
  }

  const skillResults = await db.query.skills.findMany({
    where: and(...whereConditions),
    orderBy: [desc(schema.skills.createdAt)],
    limit,
    offset,
  });

  if (skillResults.length === 0) {
    return [];
  }

  const skillIds = skillResults.map((s) => s.id);
  const tagResults = await db.query.skillTags.findMany({
    where: inArray(schema.skillTags.skillId, skillIds),
  });
  const tagsBySkillId = new Map<string, string[]>();
  for (const tag of tagResults) {
    const existing = tagsBySkillId.get(tag.skillId);
    if (existing) {
      existing.push(tag.tag);
    } else {
      tagsBySkillId.set(tag.skillId, [tag.tag]);
    }
  }

  return skillResults.map((s) => {
    const tags = tagsBySkillId.get(s.id);
    return {
      ...s,
      slug: s.slug || undefined,
      descriptionZh: s.descriptionZh || undefined,
      content: s.content || undefined,
      contentZh: s.contentZh || undefined,
      author: s.author || undefined,
      category: s.category as Category,
      featured: s.featured === 1,
      official: s.official === 1,
      tags: tags && tags.length > 0 ? tags : undefined,
    };
  });
}

/**
 * 获取所有技能
 * @returns 全部技能列表
 */
export async function getAllSkills(): Promise<Skill[]> {
  return getSkills({ limit: 10000 });
}

/**
 * 获取精选技能
 * @returns 精选技能列表
 */
export async function getFeaturedSkills(): Promise<Skill[]> {
  return getSkills({ featured: true });
}

/**
 * 获取官方技能
 * @returns 官方技能列表
 */
export async function getOfficialSkills(): Promise<Skill[]> {
  return getSkills({ official: true });
}

/**
 * 根据分类获取技能
 * @param category 分类ID
 * @returns 该分类下的技能列表
 */
export async function getSkillsByCategory(category: Category): Promise<Skill[]> {
  return getSkills({ category });
}

/**
 * 搜索技能（模糊匹配名称和描述）
 * @param query 搜索关键词
 * @returns 匹配的技能列表
 */
export async function searchSkills(query: string): Promise<Skill[]> {
  return getSkills({ search: query });
}

/**
 * 获取符合条件的技能总数
 * @param params 查询参数
 * @returns 技能总数
 */
export async function getSkillsCount(params: GetSkillsParams = {}): Promise<number> {
  const db = getDB();
  if (!db) return 0;

  const {
    category,
    featured,
    official,
    tag,
    search,
  } = params;

  const whereConditions = [];

  if (category) {
    whereConditions.push(eq(schema.skills.category, category));
  }
  if (featured !== undefined) {
    whereConditions.push(eq(schema.skills.featured, featured ? 1 : 0));
  }
  if (official !== undefined) {
    whereConditions.push(eq(schema.skills.official, official ? 1 : 0));
  }
  if (search) {
    const searchPattern = `%${search}%`;
    whereConditions.push(
      or(
        like(schema.skills.name, searchPattern),
        like(schema.skills.description, searchPattern),
        like(schema.skills.descriptionZh, searchPattern)
      )
    );
  }

  if (tag) {
    const taggedSkills = await db.query.skillTags.findMany({
      where: eq(schema.skillTags.tag, tag),
    });
    const skillIds = taggedSkills.map(ts => ts.skillId);
    if (skillIds.length === 0) return 0;
    whereConditions.push(inArray(schema.skills.id, skillIds));
  }

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(schema.skills);

  const results = whereConditions.length > 0
    ? await countQuery.where(and(...whereConditions))
    : await countQuery;

  return Number(results[0]?.count ?? 0);
}

/**
 * 获取相关技能（同分类下的其他技能）
 * @param skillId 技能ID
 * @param limit 返回数量限制，默认 3
 * @returns 相关技能列表
 */
export async function getRelatedSkills(skillId: string, limit = 3): Promise<Skill[]> {
  const skill = await getSkillById(skillId);
  if (!skill) return [];

  const relatedSkills = await getSkills({
    category: skill.category,
    limit: limit + 1,
  });

  return relatedSkills.filter((s) => s.id !== skillId).slice(0, limit);
}

/**
 * 创建或更新技能（Upsert 操作）
 * 使用事务确保数据一致性
 * @param skill 技能对象
 * @returns 更新后的技能对象或 null
 */
export async function upsertSkill(skill: Skill): Promise<Skill | null> {
  const db = getDB();
  if (!db) return null;

  const { tags, featured, official, slug, ...skillData } = skill;

  // 确保 slug 有值，如果没有则生成（中文转拼音）
  let finalSlug = slug;
  if (!finalSlug) {
    const pinyinText = pinyin(skill.name, { toneType: "none", type: "array" }).join("-");
    finalSlug = pinyinText
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  try {
    // 注意：Cloudflare D1 不支持 db.transaction()，需要手动执行多个操作
    // 1. Upsert 技能数据（存在则更新，不存在则插入）
    await db
      .insert(schema.skills)
      .values({
        ...skillData,
        slug: finalSlug,
        featured: featured ? 1 : 0,
        official: official ? 1 : 0,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .onConflictDoUpdate({
        target: schema.skills.id,
        set: {
          ...skillData,
          slug: finalSlug,
          featured: featured ? 1 : 0,
          official: official ? 1 : 0,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      });

    // 2. 同步标签：删除旧标签并插入新标签
    if (tags) {
      // 删除现有标签
      await db
        .delete(schema.skillTags)
        .where(eq(schema.skillTags.skillId, skill.id));

      // 插入新标签
      if (tags.length > 0) {
        await db.insert(schema.skillTags).values(
          tags.map((tag) => ({
            skillId: skill.id,
            tag,
          }))
        );
      }
    }

    // 3. 返回更新后的技能对象
    return getSkillById(skill.id);
  } catch (error) {
    console.error(`Error upserting skill ${skill.id}:`, error);
    throw error;
  }
}

/**
 * 删除技能
 * @param id 技能ID
 * @returns 是否成功删除
 */
export async function deleteSkill(id: string): Promise<boolean> {
  const db = getDB();
  if (!db) return false;

  try {
    const result = await db
      .delete(schema.skills)
      .where(eq(schema.skills.id, id));
    
    // In D1/SQLite with Drizzle, the result might vary, but we can check if it executed
    return true;
  } catch (error) {
    console.error(`Error deleting skill ${id}:`, error);
    throw error;
  }
}
