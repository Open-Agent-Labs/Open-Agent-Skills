# Open Agent Skills

<p align="center">
  <strong>🚀 发现和分享 AI 代理的可复用技能</strong>
</p>

<p align="center">
  <a href="https://openagentskills.com">官网</a> •
  <a href="https://openagentskills.com/docs">文档</a> •
  <a href="https://openagentskills.com/skills">浏览技能</a>
</p>

---

## ✨ 项目简介

**Open Agent Skills** 是一个开源平台，专注于为 AI 代理（如 Claude、GPT、Cursor 等）提供可复用的技能（Skills）。我们精心收录了 **100+ 高质量技能**，帮助 AI 代理更可靠地完成各类任务。

无论你是想要增强 AI 工作流的开发者，还是希望贡献技能的创作者，Open Agent Skills 都是你的理想选择。

## 🎯 核心功能

- **🔍 技能发现** - 浏览 9 大类别的 100+ 技能，涵盖文档处理、开发工具、数据分析等
- **📖 详细文档** - 每个技能都附带完整的使用说明和示例
- **🌍 多语言支持** - 支持中文和英文界面
- **🌙 深色模式** - 优雅的深色/浅色主题切换
- **⚡ 快速集成** - 简单几步即可将技能添加到你的 AI 代理

## 📦 技能分类

| 分类 | 描述 |
|------|------|
| 📄 **文档处理** | DOCX、PDF、PPTX、XLSX 等文档操作 |
| 💻 **开发工具** | AWS、React、代码生成等开发相关技能 |
| 📊 **数据分析** | 数据处理、可视化、分析工具 |
| 🎨 **创意媒体** | 图像、视频、音频处理 |
| 💼 **商业营销** | 营销自动化、商业分析 |
| 📝 **效率工具** | 任务管理、自动化工作流 |
| 💬 **沟通协作** | 邮件、消息、团队协作 |
| 🔒 **安全** | 代码审计、安全检查 |

## 🚀 快速开始

### 使用技能

1. 浏览 [技能目录](https://openagentskills.com/skills) 找到所需技能
2. 下载 `SKILL.md` 文件
3. 将文件添加到项目的 `.cursor/skills` 或 `.agent/skills` 目录
4. 你的 AI 代理会自动发现并使用该技能

### 本地开发

```bash
# 克隆项目
git clone https://github.com/Open-Agent-Labs/Open-Agent-Skills.git
cd Open-Agent-Skills

# 安装依赖（需要 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 代码检查
pnpm lint
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 🛠️ 技术栈

| 技术 | 版本 |
|------|------|
| **Next.js** | 16.1.1 (App Router) |
| **React** | 19.2.3 |
| **Tailwind CSS** | v4 |
| **TypeScript** | ^5 |
| **next-intl** | ^4.7.0 |
| **MDX** | next-mdx-remote |
| **代码高亮** | rehype-pretty-code + Shiki |

## 📁 项目结构

```
src/
├── app/                  # Next.js App Router
│   ├── [locale]/         # 国际化路由 (en, zh)
│   │   ├── page.tsx      # 首页
│   │   ├── skills/       # 技能列表和详情
│   │   └── docs/         # 文档页面
│   └── api/              # API 路由
├── components/           # React 组件
├── content/              # MDX 文档内容
├── data/                 # 静态数据 (skills, categories)
├── i18n/                 # 国际化配置
└── lib/                  # 工具函数
messages/                 # 翻译文件 (en.json, zh.json)
```

## ☁️ 部署

项目使用 [OpenNext](https://github.com/opennextjs/opennextjs-cloudflare) 部署到 Cloudflare Workers：

```bash
# 构建 Cloudflare Workers
pnpm build:worker

# 部署到 Cloudflare
pnpm deploy

# 本地预览
pnpm preview
```

## 🤝 贡献指南

我们欢迎社区贡献！

1. 阅读 [Specification 文档](https://openagentskills.com/docs/specification) 了解 SKILL.md 格式
2. 按照最佳实践创建你的技能
3. 通过 GitHub 提交 Pull Request
4. 等待审核和发布

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。

## 🔗 相关链接

- 🌐 **官网**: [openagentskills.com](https://openagentskills.com)
- 📖 **文档**: [openagentskills.com/docs](https://openagentskills.com/docs)
- 🐙 **GitHub**: [Open-Agent-Labs/Open-Agent-Skills](https://github.com/Open-Agent-Labs/Open-Agent-Skills)

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/Open-Agent-Labs">Open Agent Labs</a></sub>
</p>
