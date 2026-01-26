import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Category, Skill } from "@/data/skills";
import { skills as staticSkills } from "@/data/skills";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { eq, and, or, like, desc, asc, inArray } from "drizzle-orm";

function getDB() {
  // 预检查：如果不在 Node.js 环境或明确在构建阶段，直接返回 null 避免触发敏感报错
  if (typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }

  try {
    // 只有在存在这个全局初始化标记时才尝试，或者在生产环境下尝试
    // 注意：initOpenNextCloudflareForDev 会设置一些内部标记
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    const d1 = env.DB;
    if (!d1) {
      return null;
    }
    return drizzle(d1, { schema });
  } catch (error) {
    // 静默失败，不打印堆栈，只在非常必要时记录
    return null;
  }
}

export async function getSkillById(id: string): Promise<Skill | null> {
  const db = getDB();
  if (!db) {
    return staticSkills.find((s) => s.id === id) || null;
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

  // Handle tag filtering separately
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
    orderBy: [desc(schema.skills.featured), desc(schema.skills.official), asc(schema.skills.name)],
    limit,
    offset,
  });

  const skillsWithTags = await Promise.all(
    skillResults.map(async (s) => {
      const tags = await db.query.skillTags.findMany({
        where: eq(schema.skillTags.skillId, s.id),
      });
      return {
        ...s,
        descriptionZh: s.descriptionZh || undefined,
        content: s.content || undefined,
        contentZh: s.contentZh || undefined,
        author: s.author || undefined,
        category: s.category as Category,
        featured: s.featured === 1,
        official: s.official === 1,
        tags: tags.length > 0 ? tags.map((t) => t.tag) : undefined,
      };
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
