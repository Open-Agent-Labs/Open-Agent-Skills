# D1 数据库设置指南

本项目使用 Cloudflare D1 存储 skills 数据。请按以下步骤完成设置。

## 1. 创建 D1 数据库

```bash
npx wrangler d1 create open-agent-skills-db
```

执行后会返回 `database_id`，类似：
```
✅ Successfully created DB 'open-agent-skills-db' in region APAC
Created your database using D1's new storage backend.

[[d1_databases]]
binding = "DB"
database_name = "open-agent-skills-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## 2. 更新 wrangler.jsonc

将上一步获得的 `database_id` 填入 `wrangler.jsonc` 中的 `d1_databases` 配置：

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "open-agent-skills-db",
    "database_id": "你的-database-id"  // ← 替换这里
  }
]
```

## 3. 运行数据库迁移

创建表结构：

```bash
# 本地开发环境
npx wrangler d1 migrations apply open-agent-skills-db --local

# 生产环境（部署后）
npx wrangler d1 migrations apply open-agent-skills-db
```

## 4. 导入初始数据

### 方式 1：生成 SQL 文件并执行（推荐）

```bash
# 生成 seed SQL
tsx scripts/generate-seed-sql.ts > migrations/seed.sql

# 导入到本地 D1
npx wrangler d1 execute open-agent-skills-db --local --file=migrations/seed.sql

# 或导入到生产环境
npx wrangler d1 execute open-agent-skills-db --file=migrations/seed.sql
```

### 方式 2：手动查询

如需确认数据已导入，可以通过以下命令查询：

```bash
# 查询 skills 总数
npx wrangler d1 execute open-agent-skills-db --local --command="SELECT COUNT(*) FROM skills"

# 查看前 5 条 skills
npx wrangler d1 execute open-agent-skills-db --local --command="SELECT id, name FROM skills LIMIT 5"
```

## 5. 本地开发

启动开发服务器：

```bash
pnpm dev
```

应用会自动连接到本地 D1 数据库（使用 `--local` 标志创建的数据）。

## 6. 部署到 Cloudflare

部署前请确保：
1. 已在生产环境创建 D1 数据库
2. 已运行生产环境的 migrations 和 seed
3. `wrangler.jsonc` 中的 `database_id` 已正确配置

然后执行：

```bash
pnpm build:worker
pnpm deploy
```

## 常见问题

### Q: 如何重置数据库？

```bash
# 删除并重建表
npx wrangler d1 execute open-agent-skills-db --local --command="DROP TABLE IF EXISTS skill_tags; DROP TABLE IF EXISTS skills;"

# 重新运行迁移和导入
npx wrangler d1 migrations apply open-agent-skills-db --local
tsx scripts/generate-seed-sql.ts | npx wrangler d1 execute open-agent-skills-db --local --file=-
```

### Q: 如何更新 skills 数据？

修改 `src/data/skills.ts` 后，重新生成并导入 SQL：

```bash
tsx scripts/generate-seed-sql.ts > migrations/seed.sql
npx wrangler d1 execute open-agent-skills-db --local --file=migrations/seed.sql
```

### Q: 如何查看 D1 中的数据？

使用 wrangler 命令行查询：

```bash
npx wrangler d1 execute open-agent-skills-db --local --command="SELECT * FROM skills WHERE featured = 1"
```

或使用 Cloudflare Dashboard：
1. 访问 https://dash.cloudflare.com
2. 进入 Workers & Pages > D1
3. 选择你的数据库
4. 使用 Console 执行 SQL 查询
