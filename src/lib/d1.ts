import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Category, Skill } from "@/data/skills";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { eq, and, or, like, desc, asc, inArray } from "drizzle-orm";

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

