/**
 * 技能分类类型
 * 定义所有可用的技能分类
 */
export type Category =
  | "document-processing" // 文档处理
  | "development" // 开发工具
  | "data-analysis" // 数据分析
  | "business-marketing" // 商业营销
  | "communication" // 沟通写作
  | "creative-media" // 创意与媒体
  | "productivity" // 效率工具
  | "collaboration" // 协作管理
  | "security"; // 安全系统

/**
 * 技能数据结构
 * 定义单个 Agent Skill 的完整信息
 */
export interface Skill {
  id: string; // 技能唯一标识符
  name: string; // 技能名称
  description: string; // 英文简述
  descriptionZh?: string; // 中文简述
  content?: string; // 英文详细内容（Markdown）
  contentZh?: string; // 中文详细内容（Markdown）
  category: Category; // 所属分类
  repository: string; // GitHub 仓库地址
  author?: string; // 作者名称
  tags?: string[]; // 标签列表
  featured?: boolean; // 是否为精选技能
  official?: boolean; // 是否为官方技能
  createdAt?: string; // 创建时间
}

/**
 * 技能数据列表
 * 仅用于本地开发和数据导入，生产环境从 D1 数据库读取
 */
export const skills: Skill[] = [
  // ==================== Document Processing ====================
  {
    id: "docx",
    name: "DOCX",
    description: "Create, edit, analyze Word docs with tracked changes, comments, and formatting.",
    descriptionZh: "创建、编辑并分析 Word 文档，支持修订、评论和格式。",
    content: `## What is DOCX?

DOCX is an official Anthropic skill that enables AI agents to create, edit, and analyze Microsoft Word documents with full support for tracked changes, comments, and rich formatting.

### DOCX Key Capabilities

- **Create Documents**: Generate new Word documents from scratch with proper formatting
- **Edit Content**: Modify existing documents while preserving styles and layouts
- **Track Changes**: Work with revision history and accept/reject modifications
- **Comments**: Read and add comments to documents for collaboration
- **Formatting**: Apply headers, lists, tables, and other rich text elements

### DOCX Use Cases

- Automating report generation from data sources
- Batch processing document templates with variable content
- Converting content between formats while maintaining structure
- Reviewing and annotating documents programmatically

### How to Use DOCX

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. The agent will automatically load the DOCX capabilities

---

## FAQ

**Q: What Word versions are supported?**

A: The skill supports .docx format (Word 2007 and later). Legacy .doc files need conversion first.

**Q: Can it handle complex formatting like tables and images?**

A: Yes, the skill supports tables, images, headers/footers, and most common formatting elements.

**Q: Does it require Microsoft Word to be installed?**

A: No, the skill uses open-source libraries to process documents without requiring Word installation.`,
    contentZh: `## 什么是 DOCX？

DOCX 是 Anthropic 官方技能，让 AI 代理能够创建、编辑和分析 Microsoft Word 文档，完整支持修订跟踪、评论和丰富格式。

### DOCX 核心能力

- **创建文档**：从零开始生成带有正确格式的 Word 文档
- **编辑内容**：修改现有文档同时保留样式和布局
- **跟踪修订**：处理修订历史，接受或拒绝更改
- **评论功能**：读取和添加文档评论以便协作
- **格式处理**：应用标题、列表、表格和其他富文本元素

### DOCX 适用场景

- 从数据源自动生成报告
- 批量处理带变量内容的文档模板
- 在格式间转换内容同时保持结构
- 程序化审阅和批注文档

### 如何使用 DOCX

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 代理将自动加载 DOCX 功能

---

## 常见问题

**Q: 支持哪些 Word 版本？**

A: 该技能支持 .docx 格式（Word 2007 及更高版本）。旧版 .doc 文件需要先转换。

**Q: 能处理表格和图片等复杂格式吗？**

A: 可以，该技能支持表格、图片、页眉页脚和大多数常见格式元素。

**Q: 需要安装 Microsoft Word 吗？**

A: 不需要，该技能使用开源库处理文档，无需安装 Word。`,
    category: "document-processing",
    repository: "https://github.com/anthropics/skills/tree/main/skills/docx",
    author: "anthropics",
    tags: ["document", "word", "office"],
    official: true,
    featured: true,
  },
  {
    id: "pdf",
    name: "PDF",
    description: "Extract text, tables, metadata, merge & annotate PDFs.",
    descriptionZh: "提取文本、表格与元数据，并支持合并和批注 PDF。",
    content: `## What is PDF?

PDF is an official Anthropic skill that enables AI agents to extract content from PDF documents, merge multiple files, and add annotations programmatically.

### PDF Key Capabilities

- **Text Extraction**: Pull text content from PDF pages with layout preservation
- **Table Extraction**: Identify and extract tabular data into structured formats
- **Metadata Access**: Read and modify document properties and metadata
- **Merge Documents**: Combine multiple PDFs into a single file
- **Annotations**: Add highlights, comments, and other markup to documents

### PDF Use Cases

- Extracting data from invoices, reports, and forms
- Building searchable archives from scanned documents
- Automating document review workflows
- Creating consolidated reports from multiple sources

### How to Use PDF

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. The agent will automatically load PDF processing capabilities

---

## FAQ

**Q: Can it extract text from scanned PDFs?**

A: The skill works best with text-based PDFs. For scanned documents, OCR preprocessing may be needed.

**Q: What about password-protected PDFs?**

A: The skill can process encrypted PDFs if the password is provided. It cannot bypass protection.

**Q: Does it preserve formatting when extracting text?**

A: Basic layout is preserved. Complex multi-column layouts may require additional processing.`,
    contentZh: `## 什么是 PDF？

PDF 是 Anthropic 官方技能，让 AI 代理能够从 PDF 文档中提取内容、合并多个文件，并以编程方式添加批注。

### PDF 核心能力

- **文本提取**：从 PDF 页面提取文本内容并保留布局
- **表格提取**：识别并提取表格数据为结构化格式
- **元数据访问**：读取和修改文档属性和元数据
- **合并文档**：将多个 PDF 合并为单个文件
- **批注功能**：为文档添加高亮、评论和其他标记

### PDF 适用场景

- 从发票、报告和表单中提取数据
- 从扫描文档构建可搜索档案
- 自动化文档审阅工作流
- 从多个来源创建综合报告

### 如何使用 PDF

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 代理将自动加载 PDF 处理功能

---

## 常见问题

**Q: 能从扫描的 PDF 中提取文本吗？**

A: 该技能最适合处理基于文本的 PDF。扫描文档可能需要 OCR 预处理。

**Q: 加密的 PDF 怎么处理？**

A: 如果提供密码，该技能可以处理加密的 PDF。它无法绕过保护。

**Q: 提取文本时能保留格式吗？**

A: 基本布局会保留。复杂的多栏布局可能需要额外处理。`,
    category: "document-processing",
    repository: "https://github.com/anthropics/skills/tree/main/skills/pdf",
    author: "anthropics",
    tags: ["document", "pdf", "extract"],
    official: true,
    featured: true,
  },
  {
    id: "pptx",
    name: "PPTX",
    description: "Read, generate, and adjust slides, layouts, and templates.",
    descriptionZh: "读取、生成并调整幻灯片、版式与模板。",
    content: `## What is PPTX?

PPTX is an official Anthropic skill that enables AI agents to read, generate, and modify PowerPoint presentations with support for slides, layouts, and templates.

### PPTX Key Capabilities

- **Read Presentations**: Extract text, images, and structure from existing slides
- **Generate Slides**: Create new presentations from scratch or templates
- **Modify Content**: Update text, images, and formatting in existing files
- **Layout Management**: Work with slide masters and custom layouts
- **Template Support**: Apply and customize presentation templates

### PPTX Use Cases

- Automating weekly/monthly report presentations
- Converting data into visual slide decks
- Batch updating branding across multiple presentations
- Generating personalized pitch decks from templates

### How to Use PPTX

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. The agent will automatically load PPTX capabilities

---

## FAQ

**Q: What PowerPoint versions are supported?**

A: The skill supports .pptx format (PowerPoint 2007 and later). Legacy .ppt files need conversion.

**Q: Can it handle animations and transitions?**

A: Basic animations are preserved when reading/writing. Complex animations may have limited support.

**Q: Does it support embedded charts and graphs?**

A: Yes, the skill can read and modify embedded charts, though complex chart editing may require additional configuration.`,
    contentZh: `## 什么是 PPTX？

PPTX 是 Anthropic 官方技能，让 AI 代理能够读取、生成和修改 PowerPoint 演示文稿，支持幻灯片、版式和模板。

### PPTX 核心能力

- **读取演示文稿**：从现有幻灯片中提取文本、图片和结构
- **生成幻灯片**：从零开始或使用模板创建新演示文稿
- **修改内容**：更新现有文件中的文本、图片和格式
- **版式管理**：使用母版和自定义版式
- **模板支持**：应用和自定义演示模板

### PPTX 适用场景

- 自动化周报/月报演示文稿
- 将数据转换为可视化幻灯片
- 批量更新多个演示文稿的品牌元素
- 从模板生成个性化推介材料

### 如何使用 PPTX

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 代理将自动加载 PPTX 功能

---

## 常见问题

**Q: 支持哪些 PowerPoint 版本？**

A: 该技能支持 .pptx 格式（PowerPoint 2007 及更高版本）。旧版 .ppt 文件需要转换。

**Q: 能处理动画和转场效果吗？**

A: 读取和写入时会保留基本动画。复杂动画的支持可能有限。

**Q: 支持嵌入的图表吗？**

A: 可以，该技能可以读取和修改嵌入的图表，但复杂图表编辑可能需要额外配置。`,
    category: "document-processing",
    repository: "https://github.com/anthropics/skills/tree/main/skills/pptx",
    author: "anthropics",
    tags: ["document", "powerpoint", "slides"],
    official: true,
  },
  {
    id: "xlsx",
    name: "XLSX",
    description: "Spreadsheet manipulation: formulas, charts, data transformations.",
    descriptionZh: "电子表格处理：公式、图表与数据转换。",
    content: `## What is XLSX?

XLSX is an official Anthropic skill that enables AI agents to manipulate Excel spreadsheets including formulas, charts, and data transformations.

### XLSX Key Capabilities

- **Read Data**: Extract cell values, ranges, and structured data from spreadsheets
- **Write Data**: Create and update cells with values, formulas, and formatting
- **Formulas**: Work with Excel formulas and functions programmatically
- **Charts**: Create and modify charts and visualizations
- **Data Transformations**: Filter, sort, and pivot data within spreadsheets

### XLSX Use Cases

- Automating financial report generation
- Processing and analyzing CSV/Excel data files
- Creating data dashboards from multiple sources
- Batch updating spreadsheets with new data

### How to Use XLSX

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. The agent will automatically load XLSX capabilities

---

## FAQ

**Q: What Excel versions are supported?**

A: The skill supports .xlsx format (Excel 2007 and later). It can also read/write .csv files.

**Q: Can it execute VBA macros?**

A: No, VBA macro execution is not supported for security reasons. The skill focuses on data and formatting.

**Q: How does it handle large files?**

A: The skill can process large spreadsheets, but extremely large files may require streaming approaches for optimal performance.`,
    contentZh: `## 什么是 XLSX？

XLSX 是 Anthropic 官方技能，让 AI 代理能够操作 Excel 电子表格，包括公式、图表和数据转换。

### XLSX 核心能力

- **读取数据**：从电子表格中提取单元格值、范围和结构化数据
- **写入数据**：创建和更新带有值、公式和格式的单元格
- **公式处理**：以编程方式使用 Excel 公式和函数
- **图表功能**：创建和修改图表和可视化
- **数据转换**：在电子表格中筛选、排序和透视数据

### XLSX 适用场景

- 自动化财务报告生成
- 处理和分析 CSV/Excel 数据文件
- 从多个来源创建数据仪表板
- 批量用新数据更新电子表格

### 如何使用 XLSX

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 代理将自动加载 XLSX 功能

---

## 常见问题

**Q: 支持哪些 Excel 版本？**

A: 该技能支持 .xlsx 格式（Excel 2007 及更高版本）。也可以读写 .csv 文件。

**Q: 能执行 VBA 宏吗？**

A: 不能，出于安全考虑不支持 VBA 宏执行。该技能专注于数据和格式。

**Q: 如何处理大文件？**

A: 该技能可以处理大型电子表格，但超大文件可能需要流式处理以获得最佳性能。`,
    category: "document-processing",
    repository: "https://github.com/anthropics/skills/tree/main/skills/xlsx",
    author: "anthropics",
    tags: ["document", "excel", "spreadsheet"],
    official: true,
  },
  {
    id: "markdown-to-epub",
    name: "Markdown to EPUB Converter",
    description: "Converts markdown documents and chat summaries into professional EPUB ebook files.",
    descriptionZh: "将 Markdown 文档和聊天摘要转换为专业的 EPUB 电子书。",
    content: `## What is Markdown to EPUB Converter?

This skill enables AI agents to convert Markdown documents and chat conversation summaries into professional EPUB ebook files, ready for e-readers.

### Markdown to EPUB Converter Key Capabilities

- **Markdown Parsing**: Process standard and extended Markdown syntax
- **EPUB Generation**: Create valid EPUB files compatible with all major e-readers
- **Chat Summaries**: Convert AI conversation logs into readable ebook format
- **Formatting**: Preserve headers, lists, code blocks, and other formatting
- **Metadata**: Add title, author, and other book metadata

### Markdown to EPUB Converter Use Cases

- Converting documentation into offline-readable ebooks
- Archiving important AI conversations as ebooks
- Creating training materials in EPUB format
- Building personal knowledge bases as ebook collections

### How to Use Markdown to EPUB Converter

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide Markdown content or chat logs to convert

---

## FAQ

**Q: Which e-readers are compatible?**

A: The generated EPUB files work with Kindle (after conversion), Apple Books, Kobo, and other standard EPUB readers.

**Q: Can it handle images in Markdown?**

A: Yes, embedded images are included in the EPUB output with proper formatting.

**Q: What Markdown extensions are supported?**

A: Standard Markdown plus common extensions like tables, task lists, and fenced code blocks.`,
    contentZh: `## 什么是 Markdown 转 EPUB 转换器？

该技能让 AI 代理能够将 Markdown 文档和聊天对话摘要转换为专业的 EPUB 电子书文件，可直接在电子阅读器上阅读。

### Markdown 转 EPUB 转换器核心能力

- **Markdown 解析**：处理标准和扩展 Markdown 语法
- **EPUB 生成**：创建兼容所有主流电子阅读器的有效 EPUB 文件
- **聊天摘要**：将 AI 对话日志转换为可读的电子书格式
- **格式保留**：保留标题、列表、代码块和其他格式
- **元数据**：添加标题、作者和其他书籍元数据

### Markdown 转 EPUB 转换器适用场景

- 将文档转换为可离线阅读的电子书
- 将重要的 AI 对话归档为电子书
- 创建 EPUB 格式的培训材料
- 构建电子书形式的个人知识库

### 如何使用 Markdown 转 EPUB 转换器

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供要转换的 Markdown 内容或聊天日志

---

## 常见问题

**Q: 兼容哪些电子阅读器？**

A: 生成的 EPUB 文件可在 Kindle（转换后）、Apple Books、Kobo 和其他标准 EPUB 阅读器上使用。

**Q: 能处理 Markdown 中的图片吗？**

A: 可以，嵌入的图片会以正确的格式包含在 EPUB 输出中。

**Q: 支持哪些 Markdown 扩展？**

A: 支持标准 Markdown 以及表格、任务列表和围栏代码块等常见扩展。`,
    category: "document-processing",
    repository: "https://github.com/smerchek/claude-epub-skill",
    author: "smerchek",
    tags: ["markdown", "epub", "ebook"],
  },

  // ==================== Development & Code Tools ====================
  {
    id: "artifacts-builder",
    name: "Artifacts Builder",
    description: "Suite of tools for creating elaborate, multi-component HTML artifacts using React, Tailwind CSS, and shadcn/ui.",
    descriptionZh: "使用 React、Tailwind CSS 和 shadcn/ui 创建复杂多组件 HTML 作品的工具套件。",
    content: `## What is Artifacts Builder?

Artifacts Builder is an official Anthropic skill that provides a comprehensive toolkit for creating sophisticated, multi-component HTML artifacts using modern frontend technologies.

### Artifacts Builder Key Capabilities

- **React Components**: Build interactive UI components with React
- **Tailwind CSS**: Apply utility-first styling for rapid development
- **shadcn/ui**: Leverage pre-built, accessible component library
- **Multi-component**: Create complex layouts with multiple integrated parts
- **Live Preview**: Generate artifacts that can be previewed immediately

### Artifacts Builder Use Cases

- Building interactive dashboards and data displays
- Creating landing pages and marketing materials
- Prototyping web application interfaces
- Generating styled documentation with interactive elements

### How to Use Artifacts Builder

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Request HTML artifacts with specific component requirements

---

## FAQ

**Q: Do I need to know React to use this skill?**

A: No, the skill handles the technical implementation. Just describe what you want to build.

**Q: Can I customize the styling beyond Tailwind?**

A: Yes, custom CSS can be added alongside Tailwind classes for additional customization.

**Q: Are the generated artifacts production-ready?**

A: They're suitable for prototypes and demos. Production use may require additional optimization.`,
    contentZh: `## 什么是 Artifacts Builder？

Artifacts Builder 是 Anthropic 官方技能，提供使用现代前端技术创建复杂多组件 HTML 作品的综合工具包。

### Artifacts Builder 核心能力

- **React 组件**：使用 React 构建交互式 UI 组件
- **Tailwind CSS**：应用实用优先的样式快速开发
- **shadcn/ui**：利用预构建的无障碍组件库
- **多组件支持**：创建包含多个集成部分的复杂布局
- **实时预览**：生成可立即预览的作品

### Artifacts Builder 适用场景

- 构建交互式仪表板和数据展示
- 创建落地页和营销材料
- Web 应用界面原型设计
- 生成带交互元素的样式化文档

### 如何使用 Artifacts Builder

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 请求具有特定组件需求的 HTML 作品

---

## 常见问题

**Q: 使用这个技能需要了解 React 吗？**

A: 不需要，该技能处理技术实现。只需描述你想构建什么。

**Q: 能在 Tailwind 之外自定义样式吗？**

A: 可以，可以在 Tailwind 类之外添加自定义 CSS 进行额外定制。

**Q: 生成的作品可以用于生产环境吗？**

A: 适合原型和演示。生产使用可能需要额外优化。`,
    category: "development",
    repository: "https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder",
    author: "anthropics",
    tags: ["react", "tailwind", "frontend"],
    official: true,
    featured: true,
  },
  {
    id: "aws-skills",
    name: "AWS Skills",
    description: "AWS development with CDK best practices, cost optimization MCP servers, and serverless/event-driven architecture patterns.",
    descriptionZh: "涵盖 CDK 最佳实践、成本优化 MCP 服务器与无服务器/事件驱动架构的 AWS 开发。",
    content: `## What is AWS Skills?

AWS Skills provides comprehensive guidance for AWS development including CDK best practices, cost optimization strategies, and serverless architecture patterns.

### AWS Skills Key Capabilities

- **CDK Best Practices**: Infrastructure as Code patterns and conventions
- **Cost Optimization**: MCP servers for monitoring and reducing AWS costs
- **Serverless Architecture**: Event-driven and Lambda-based patterns
- **Multi-service Integration**: Patterns for combining AWS services effectively

### AWS Skills Use Cases

- Setting up new AWS projects with proper structure
- Optimizing existing AWS infrastructure costs
- Designing event-driven architectures
- Implementing serverless applications

### How to Use AWS Skills

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Request AWS guidance or implementation help

---

## FAQ

**Q: Which AWS services are covered?**

A: Focus on CDK, Lambda, API Gateway, DynamoDB, S3, and related serverless services.

**Q: Is this for beginners or advanced users?**

A: Both. It provides foundational patterns and advanced optimization techniques.

**Q: Does it handle multi-region deployments?**

A: Yes, it includes patterns for multi-region and disaster recovery setups.`,
    contentZh: `## 什么是 AWS Skills？

AWS Skills 提供全面的 AWS 开发指导，包括 CDK 最佳实践、成本优化策略和无服务器架构模式。

### AWS Skills 核心能力

- **CDK 最佳实践**：基础设施即代码的模式和约定
- **成本优化**：用于监控和降低 AWS 成本的 MCP 服务器
- **无服务器架构**：事件驱动和基于 Lambda 的模式
- **多服务集成**：有效组合 AWS 服务的模式

### AWS Skills 适用场景

- 使用正确结构设置新的 AWS 项目
- 优化现有 AWS 基础设施成本
- 设计事件驱动架构
- 实现无服务器应用

### 如何使用 AWS Skills

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 请求 AWS 指导或实现帮助

---

## 常见问题

**Q: 涵盖哪些 AWS 服务？**

A: 重点关注 CDK、Lambda、API Gateway、DynamoDB、S3 和相关无服务器服务。

**Q: 这是给初学者还是高级用户的？**

A: 都适用。它提供基础模式和高级优化技术。

**Q: 能处理多区域部署吗？**

A: 可以，包含多区域和灾难恢复设置的模式。`,
    category: "development",
    repository: "https://github.com/zxkane/aws-skills",
    author: "zxkane",
    tags: ["aws", "cdk", "serverless"],
  },
  {
    id: "changelog-generator",
    name: "Changelog Generator",
    description: "Automatically creates user-facing changelogs from git commits by analyzing history and transforming technical commits into customer-friendly release notes.",
    descriptionZh: "通过分析提交历史自动生成面向用户的变更日志，将技术提交转化为友好的发布说明。",
    content: `## What is Changelog Generator?

Changelog Generator automatically analyzes git commit history and transforms technical commit messages into user-friendly release notes and changelogs.

### Changelog Generator Key Capabilities

- **Commit Analysis**: Parse and categorize git commits automatically
- **User-friendly Output**: Transform technical messages into readable notes
- **Semantic Versioning**: Support for conventional commit formats
- **Customizable Templates**: Adjust output format to match your style

### Changelog Generator Use Cases

- Generating release notes for software versions
- Creating weekly/monthly development summaries
- Automating changelog updates in CI/CD pipelines
- Producing customer-facing product updates

### How to Use Changelog Generator

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Point the skill at your git repository

---

## FAQ

**Q: What commit formats are supported?**

A: Works best with conventional commits but can parse standard git messages too.

**Q: Can it filter commits by type?**

A: Yes, you can include/exclude commits based on type, scope, or patterns.

**Q: Does it support multiple languages?**

A: The output can be customized, but generation logic is English-focused.`,
    contentZh: `## 什么是 Changelog Generator？

Changelog Generator 自动分析 git 提交历史，将技术性的提交信息转换为用户友好的发布说明和变更日志。

### Changelog Generator 核心能力

- **提交分析**：自动解析和分类 git 提交
- **用户友好输出**：将技术信息转换为可读的说明
- **语义化版本**：支持约定式提交格式
- **可定制模板**：调整输出格式以匹配你的风格

### Changelog Generator 适用场景

- 为软件版本生成发布说明
- 创建每周/每月开发摘要
- 在 CI/CD 流水线中自动更新变更日志
- 生成面向客户的产品更新

### 如何使用 Changelog Generator

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 将技能指向你的 git 仓库

---

## 常见问题

**Q: 支持哪些提交格式？**

A: 最适合约定式提交，但也可以解析标准 git 信息。

**Q: 能按类型筛选提交吗？**

A: 可以，你可以根据类型、范围或模式包含/排除提交。

**Q: 支持多语言吗？**

A: 输出可以定制，但生成逻辑以英文为主。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator",
    author: "ComposioHQ",
    tags: ["git", "changelog", "automation"],
  },
  {
    id: "claude-code-terminal-title",
    name: "Claude Code Terminal Title",
    description: "Gives each Claude Code terminal window a dynamic title that describes the work being done.",
    descriptionZh: "为每个 Claude Code 终端窗口设置动态标题，描述当前工作内容。",
    content: `## What is Claude Code Terminal Title?

This skill dynamically updates Claude Code terminal window titles to reflect the current work context, making it easier to manage multiple sessions.

### Claude Code Terminal Title Key Capabilities

- **Dynamic Titles**: Automatically update terminal titles based on current task
- **Context Awareness**: Reflect project name, file, or operation in title
- **Multi-session Support**: Distinguish between multiple Claude Code windows
- **Customizable Format**: Adjust title format to your preferences

### Claude Code Terminal Title Use Cases

- Managing multiple Claude Code sessions simultaneously
- Quick identification of what each terminal is working on
- Better workflow organization with descriptive titles
- Reducing context-switching overhead

### How to Use Claude Code Terminal Title

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Terminal titles will update automatically during work

---

## FAQ

**Q: Does this work with all terminals?**

A: Works with terminals that support title escape sequences (most modern terminals).

**Q: Can I customize the title format?**

A: Yes, the title template can be adjusted to show different information.

**Q: Does it affect performance?**

A: Minimal impact - title updates are lightweight operations.`,
    contentZh: `## 什么是 Claude Code Terminal Title？

该技能动态更新 Claude Code 终端窗口标题以反映当前工作上下文，便于管理多个会话。

### Claude Code Terminal Title 核心能力

- **动态标题**：根据当前任务自动更新终端标题
- **上下文感知**：在标题中反映项目名称、文件或操作
- **多会话支持**：区分多个 Claude Code 窗口
- **可定制格式**：根据偏好调整标题格式

### Claude Code Terminal Title 适用场景

- 同时管理多个 Claude Code 会话
- 快速识别每个终端正在处理的内容
- 使用描述性标题更好地组织工作流
- 减少上下文切换开销

### 如何使用 Claude Code Terminal Title

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 终端标题将在工作期间自动更新

---

## 常见问题

**Q: 这适用于所有终端吗？**

A: 适用于支持标题转义序列的终端（大多数现代终端）。

**Q: 可以自定义标题格式吗？**

A: 可以，标题模板可以调整以显示不同信息。

**Q: 会影响性能吗？**

A: 影响最小 - 标题更新是轻量级操作。`,
    category: "development",
    repository: "https://github.com/bluzername/claude-code-terminal-title",
    author: "bluzername",
    tags: ["terminal", "productivity", "claude-code"],
  },
  {
    id: "d3-visualization",
    name: "D3.js Visualization",
    description: "Teaches Claude to produce D3 charts and interactive data visualizations.",
    descriptionZh: "教 Claude 生成 D3 图表与交互式数据可视化。",
    content: `## What is D3.js Visualization?

This skill enables Claude to create sophisticated D3.js charts and interactive data visualizations from data inputs.

### D3.js Visualization Key Capabilities

- **Chart Types**: Bar, line, pie, scatter, and more complex visualizations
- **Interactivity**: Hover effects, tooltips, zoom, and pan functionality
- **Data Binding**: Connect visualizations to dynamic data sources
- **Customization**: Colors, axes, legends, and responsive layouts

### D3.js Visualization Use Cases

- Creating data dashboards with interactive charts
- Visualizing complex datasets for analysis
- Building presentation-ready graphics from data
- Generating embeddable visualizations for web pages

### How to Use D3.js Visualization

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide data and describe the visualization you need

---

## FAQ

**Q: What data formats are supported?**

A: JSON, CSV, and structured arrays work best. The skill can help transform other formats.

**Q: Can I export the visualizations?**

A: Yes, generated D3 code can be exported as standalone HTML or SVG files.

**Q: Is D3 knowledge required?**

A: No, describe what you want and the skill handles the D3 implementation.`,
    contentZh: `## 什么是 D3.js Visualization？

该技能使 Claude 能够从数据输入创建复杂的 D3.js 图表和交互式数据可视化。

### D3.js Visualization 核心能力

- **图表类型**：柱状图、折线图、饼图、散点图和更复杂的可视化
- **交互性**：悬停效果、工具提示、缩放和平移功能
- **数据绑定**：将可视化连接到动态数据源
- **自定义**：颜色、坐标轴、图例和响应式布局

### D3.js Visualization 适用场景

- 创建带交互式图表的数据仪表板
- 可视化复杂数据集进行分析
- 从数据构建可用于演示的图形
- 生成可嵌入网页的可视化

### 如何使用 D3.js Visualization

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供数据并描述你需要的可视化

---

## 常见问题

**Q: 支持哪些数据格式？**

A: JSON、CSV 和结构化数组效果最好。该技能可以帮助转换其他格式。

**Q: 可以导出可视化吗？**

A: 可以，生成的 D3 代码可以导出为独立的 HTML 或 SVG 文件。

**Q: 需要了解 D3 吗？**

A: 不需要，描述你想要的，技能会处理 D3 实现。`,
    category: "development",
    repository: "https://github.com/chrisvoncsefalvay/claude-d3js-skill",
    author: "chrisvoncsefalvay",
    tags: ["d3", "visualization", "charts"],
  },
  {
    id: "ffuf-web-fuzzing",
    name: "FFUF Web Fuzzing",
    description: "Integrates the ffuf web fuzzer so Claude can run fuzzing tasks and analyze results for vulnerabilities.",
    descriptionZh: "集成 ffuf Web 模糊测试器，让 Claude 执行 fuzzing 并分析漏洞结果。",
    content: `## What is FFUF Web Fuzzing?

This skill integrates the ffuf (Fuzz Faster U Fool) web fuzzer, enabling Claude to perform security testing and vulnerability discovery on web applications.

### FFUF Web Fuzzing Key Capabilities

- **Directory Discovery**: Find hidden paths and endpoints
- **Parameter Fuzzing**: Test for injection vulnerabilities
- **Response Analysis**: Identify anomalies indicating vulnerabilities
- **Custom Wordlists**: Use standard or custom fuzzing dictionaries

### FFUF Web Fuzzing Use Cases

- Security testing of web applications
- Discovering hidden API endpoints
- Finding exposed configuration files
- Penetration testing preparation

### How to Use FFUF Web Fuzzing

1. Clone or download the skill from the GitHub repository
2. Ensure ffuf is installed on your system
3. Add the skill files to your agent's configuration directory
4. Specify target URLs and fuzzing parameters

---

## FAQ

**Q: Is ffuf included with the skill?**

A: No, ffuf must be installed separately. The skill provides the integration layer.

**Q: Is this for authorized testing only?**

A: Yes, only use on systems you have permission to test. Unauthorized testing is illegal.

**Q: What output formats are supported?**

A: Results can be output in JSON, CSV, or human-readable formats.`,
    contentZh: `## 什么是 FFUF Web Fuzzing？

该技能集成了 ffuf（Fuzz Faster U Fool）Web 模糊测试器，使 Claude 能够对 Web 应用程序执行安全测试和漏洞发现。

### FFUF Web Fuzzing 核心能力

- **目录发现**：查找隐藏的路径和端点
- **参数模糊测试**：测试注入漏洞
- **响应分析**：识别表明漏洞的异常
- **自定义字典**：使用标准或自定义的模糊测试字典

### FFUF Web Fuzzing 适用场景

- Web 应用程序的安全测试
- 发现隐藏的 API 端点
- 查找暴露的配置文件
- 渗透测试准备

### 如何使用 FFUF Web Fuzzing

1. 从 GitHub 仓库克隆或下载该技能
2. 确保系统上已安装 ffuf
3. 将技能文件添加到代理配置目录
4. 指定目标 URL 和模糊测试参数

---

## 常见问题

**Q: ffuf 包含在技能中吗？**

A: 不包含，ffuf 必须单独安装。该技能提供集成层。

**Q: 这只用于授权测试吗？**

A: 是的，只能在有权限测试的系统上使用。未经授权的测试是违法的。

**Q: 支持哪些输出格式？**

A: 结果可以输出为 JSON、CSV 或人类可读格式。`,
    category: "development",
    repository: "https://github.com/jthack/ffuf_claude_skill",
    author: "jthack",
    tags: ["security", "fuzzing", "testing"],
  },
  {
    id: "finishing-dev-branch",
    name: "Finishing Development Branch",
    description: "Guides completion of development work by presenting clear options and handling chosen workflow.",
    descriptionZh: "通过给出清晰选项并执行所选流程，指导完成开发工作。",
    content: `## What is Finishing Development Branch?

This skill guides developers through completing development work by presenting clear options for merging, squashing, or rebasing, then executing the chosen workflow.

### Finishing Development Branch Key Capabilities

- **Workflow Options**: Present merge, squash, rebase choices clearly
- **Branch Management**: Handle branch cleanup after completion
- **Conflict Resolution**: Guide through merge conflict handling
- **PR Preparation**: Prepare branches for pull request submission

### Finishing Development Branch Use Cases

- Completing feature branches for review
- Cleaning up commit history before merging
- Standardizing team git workflows
- Reducing merge-related mistakes

### How to Use Finishing Development Branch

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Invoke when ready to complete a development branch

---

## FAQ

**Q: Does it support all git workflows?**

A: Supports common workflows including GitFlow, GitHub Flow, and trunk-based development.

**Q: Can it handle complex merge conflicts?**

A: It provides guidance for conflict resolution but complex conflicts may need manual intervention.

**Q: Does it push changes automatically?**

A: Push behavior can be configured - it will ask for confirmation by default.`,
    contentZh: `## 什么是 Finishing Development Branch？

该技能通过呈现合并、压缩或变基的清晰选项来指导开发人员完成开发工作，然后执行所选的工作流。

### Finishing Development Branch 核心能力

- **工作流选项**：清晰呈现合并、压缩、变基选择
- **分支管理**：完成后处理分支清理
- **冲突解决**：指导处理合并冲突
- **PR 准备**：为提交拉取请求准备分支

### Finishing Development Branch 适用场景

- 完成功能分支以供审查
- 合并前清理提交历史
- 标准化团队 git 工作流
- 减少与合并相关的错误

### 如何使用 Finishing Development Branch

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 准备完成开发分支时调用

---

## 常见问题

**Q: 支持所有 git 工作流吗？**

A: 支持常见工作流，包括 GitFlow、GitHub Flow 和基于主干的开发。

**Q: 能处理复杂的合并冲突吗？**

A: 它提供冲突解决指导，但复杂冲突可能需要手动干预。

**Q: 会自动推送更改吗？**

A: 推送行为可配置 - 默认会请求确认。`,
    category: "development",
    repository: "https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch",
    author: "obra",
    tags: ["git", "workflow", "development"],
  },
  {
    id: "ios-simulator",
    name: "iOS Simulator",
    description: "Enables Claude to interact with iOS Simulator for testing and debugging iOS applications.",
    descriptionZh: "让 Claude 与 iOS 模拟器交互，用于测试与调试 iOS 应用。",
    content: `## What is iOS Simulator?

This skill enables Claude to interact with the iOS Simulator for testing, debugging, and validating iOS applications during development.

### iOS Simulator Key Capabilities

- **App Launch**: Start and stop applications in the simulator
- **UI Interaction**: Tap, swipe, and input text programmatically
- **Screenshot Capture**: Take screenshots for visual verification
- **Log Analysis**: Access and analyze simulator logs

### iOS Simulator Use Cases

- Automated UI testing of iOS applications
- Visual regression testing
- Debugging app behavior in different scenarios
- Rapid prototyping and iteration

### How to Use iOS Simulator

1. Ensure Xcode and iOS Simulator are installed
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Specify the app and actions to perform

---

## FAQ

**Q: Does it require a Mac?**

A: Yes, iOS Simulator only runs on macOS with Xcode installed.

**Q: Which iOS versions are supported?**

A: Any iOS version available in your installed Xcode simulators.

**Q: Can it test on physical devices?**

A: This skill focuses on the simulator. Physical device testing requires different tooling.`,
    contentZh: `## 什么是 iOS Simulator？

该技能使 Claude 能够与 iOS 模拟器交互，用于在开发过程中测试、调试和验证 iOS 应用程序。

### iOS Simulator 核心能力

- **应用启动**：在模拟器中启动和停止应用程序
- **UI 交互**：以编程方式点击、滑动和输入文本
- **截图捕获**：截取屏幕截图进行视觉验证
- **日志分析**：访问和分析模拟器日志

### iOS Simulator 适用场景

- iOS 应用程序的自动化 UI 测试
- 视觉回归测试
- 在不同场景中调试应用行为
- 快速原型设计和迭代

### 如何使用 iOS Simulator

1. 确保已安装 Xcode 和 iOS 模拟器
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 指定应用和要执行的操作

---

## 常见问题

**Q: 需要 Mac 吗？**

A: 是的，iOS 模拟器只能在安装了 Xcode 的 macOS 上运行。

**Q: 支持哪些 iOS 版本？**

A: 支持已安装 Xcode 模拟器中可用的任何 iOS 版本。

**Q: 能在物理设备上测试吗？**

A: 该技能专注于模拟器。物理设备测试需要不同的工具。`,
    category: "development",
    repository: "https://github.com/conorluddy/ios-simulator-skill",
    author: "conorluddy",
    tags: ["ios", "simulator", "mobile"],
  },
  {
    id: "langsmith-fetch",
    name: "LangSmith Fetch",
    description: "Debug LangChain and LangGraph agents by automatically fetching and analyzing execution traces from LangSmith Studio.",
    descriptionZh: "通过自动获取并分析 LangSmith Studio 执行轨迹来调试 LangChain 与 LangGraph 代理。",
    content: `## What is LangSmith Fetch?

LangSmith Fetch enables debugging of LangChain and LangGraph agents by automatically fetching and analyzing execution traces from LangSmith Studio.

### LangSmith Fetch Key Capabilities

- **Trace Fetching**: Automatically retrieve execution traces from LangSmith
- **Error Analysis**: Identify failure points in agent execution
- **Performance Insights**: Analyze latency and token usage patterns
- **Chain Visualization**: Understand the flow of agent operations

### LangSmith Fetch Use Cases

- Debugging failing LangChain agents
- Optimizing agent performance
- Understanding complex chain behaviors
- Troubleshooting LangGraph workflows

### How to Use LangSmith Fetch

1. Ensure you have a LangSmith account and API key
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Provide trace IDs or query parameters

---

## FAQ

**Q: Do I need a LangSmith subscription?**

A: LangSmith offers free tiers. The skill works with any LangSmith account.

**Q: Can it modify traces or agents?**

A: No, this skill is read-only. It fetches and analyzes but doesn't modify.

**Q: What trace formats are supported?**

A: Standard LangSmith trace formats including runs, spans, and feedback.`,
    contentZh: `## 什么是 LangSmith Fetch？

LangSmith Fetch 通过自动获取和分析 LangSmith Studio 的执行轨迹来调试 LangChain 和 LangGraph 代理。

### LangSmith Fetch 核心能力

- **轨迹获取**：自动从 LangSmith 检索执行轨迹
- **错误分析**：识别代理执行中的故障点
- **性能洞察**：分析延迟和令牌使用模式
- **链可视化**：理解代理操作流程

### LangSmith Fetch 适用场景

- 调试失败的 LangChain 代理
- 优化代理性能
- 理解复杂的链行为
- 排查 LangGraph 工作流问题

### 如何使用 LangSmith Fetch

1. 确保你有 LangSmith 账户和 API 密钥
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 提供轨迹 ID 或查询参数

---

## 常见问题

**Q: 需要 LangSmith 订阅吗？**

A: LangSmith 提供免费层级。该技能适用于任何 LangSmith 账户。

**Q: 能修改轨迹或代理吗？**

A: 不能，该技能是只读的。它获取和分析但不修改。

**Q: 支持哪些轨迹格式？**

A: 标准 LangSmith 轨迹格式，包括运行、跨度和反馈。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/langsmith-fetch",
    author: "OthmanAdi",
    tags: ["langchain", "debugging", "observability"],
  },
  {
    id: "mcp-builder",
    name: "MCP Builder",
    description: "Guides creation of high-quality MCP (Model Context Protocol) servers for integrating external APIs and services with LLMs.",
    descriptionZh: "指导创建高质量 MCP（模型上下文协议）服务器，用于与外部 API 和服务集成。",
    content: `## What is MCP Builder?

MCP Builder guides the creation of high-quality Model Context Protocol (MCP) servers, enabling seamless integration of external APIs and services with large language models.

### MCP Builder Key Capabilities

- **Server Scaffolding**: Generate MCP server boilerplate code
- **Tool Definition**: Create well-structured tool definitions
- **Resource Handling**: Implement resource endpoints properly
- **Best Practices**: Follow MCP specification guidelines

### MCP Builder Use Cases

- Building custom MCP servers for proprietary APIs
- Integrating third-party services with Claude
- Creating reusable MCP components
- Learning MCP architecture patterns

### How to Use MCP Builder

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the API or service you want to integrate
4. The skill will guide you through MCP server creation

---

## FAQ

**Q: What languages are supported for MCP servers?**

A: The skill focuses on TypeScript/Node.js, the most common MCP implementation language.

**Q: Do I need to know the MCP specification?**

A: No, the skill encapsulates the specification knowledge and guides you through it.

**Q: Can it generate production-ready servers?**

A: It generates solid foundations that may need customization for production use.`,
    contentZh: `## 什么是 MCP Builder？

MCP Builder 指导创建高质量的模型上下文协议（MCP）服务器，实现外部 API 和服务与大语言模型的无缝集成。

### MCP Builder 核心能力

- **服务器脚手架**：生成 MCP 服务器样板代码
- **工具定义**：创建结构良好的工具定义
- **资源处理**：正确实现资源端点
- **最佳实践**：遵循 MCP 规范指南

### MCP Builder 适用场景

- 为专有 API 构建自定义 MCP 服务器
- 将第三方服务与 Claude 集成
- 创建可复用的 MCP 组件
- 学习 MCP 架构模式

### 如何使用 MCP Builder

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你想要集成的 API 或服务
4. 技能将指导你完成 MCP 服务器创建

---

## 常见问题

**Q: MCP 服务器支持哪些语言？**

A: 该技能专注于 TypeScript/Node.js，这是最常见的 MCP 实现语言。

**Q: 需要了解 MCP 规范吗？**

A: 不需要，该技能封装了规范知识并指导你完成。

**Q: 能生成生产就绪的服务器吗？**

A: 它生成坚实的基础，可能需要针对生产使用进行定制。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/mcp-builder",
    author: "ComposioHQ",
    tags: ["mcp", "api", "integration"],
    featured: true,
  },
  {
    id: "move-code-quality",
    name: "Move Code Quality",
    description: "Analyzes Move language packages against the official Move Book Code Quality Checklist for Move 2024 Edition compliance.",
    descriptionZh: "依据 Move 2024 版官方代码质量清单分析 Move 语言包的合规性。",
    content: `## What is Move Code Quality?

This skill analyzes Move language packages against the official Move Book Code Quality Checklist, ensuring compliance with Move 2024 Edition standards.

### Move Code Quality Key Capabilities

- **Code Analysis**: Check Move code against quality guidelines
- **Compliance Checking**: Verify Move 2024 Edition compliance
- **Best Practices**: Identify deviations from recommended patterns
- **Detailed Reports**: Generate actionable quality reports

### Move Code Quality Use Cases

- Auditing Move smart contracts before deployment
- Ensuring code quality in blockchain projects
- Learning Move best practices through examples
- Preparing code for security reviews

### How to Use Move Code Quality

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Point the skill at your Move package
4. Review the generated quality report

---

## FAQ

**Q: Which Move implementations are supported?**

A: Focuses on Sui Move and Aptos Move implementations.

**Q: Does it find security vulnerabilities?**

A: It focuses on code quality. Security audits require specialized tools.

**Q: Can it auto-fix issues?**

A: It identifies issues and suggests fixes but doesn't automatically modify code.`,
    contentZh: `## 什么是 Move Code Quality？

该技能依据 Move 官方代码质量清单分析 Move 语言包，确保符合 Move 2024 版标准。

### Move Code Quality 核心能力

- **代码分析**：根据质量指南检查 Move 代码
- **合规检查**：验证 Move 2024 版合规性
- **最佳实践**：识别偏离推荐模式的情况
- **详细报告**：生成可操作的质量报告

### Move Code Quality 适用场景

- 部署前审计 Move 智能合约
- 确保区块链项目中的代码质量
- 通过示例学习 Move 最佳实践
- 为安全审查准备代码

### 如何使用 Move Code Quality

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 将技能指向你的 Move 包
4. 查看生成的质量报告

---

## 常见问题

**Q: 支持哪些 Move 实现？**

A: 专注于 Sui Move 和 Aptos Move 实现。

**Q: 能发现安全漏洞吗？**

A: 它专注于代码质量。安全审计需要专门的工具。

**Q: 能自动修复问题吗？**

A: 它识别问题并建议修复，但不会自动修改代码。`,
    category: "development",
    repository: "https://github.com/1NickPappas/move-code-quality-skill",
    author: "1NickPappas",
    tags: ["move", "blockchain", "quality"],
  },
  {
    id: "playwright-automation",
    name: "Playwright Browser Automation",
    description: "Model-invoked Playwright automation for testing and validating web applications.",
    descriptionZh: "模型触发的 Playwright 自动化，用于测试与验证 Web 应用。",
    content: `## What is Playwright Browser Automation?

This skill enables Claude to invoke Playwright for browser automation, allowing testing and validation of web applications programmatically.

### Playwright Browser Automation Key Capabilities

- **Browser Control**: Launch, navigate, and interact with browsers
- **Element Interaction**: Click, type, select, and assert on elements
- **Screenshot Capture**: Take screenshots for visual verification
- **Multi-browser Support**: Test across Chromium, Firefox, and WebKit

### Playwright Browser Automation Use Cases

- Automated end-to-end testing of web applications
- Visual regression testing
- Form submission and validation testing
- Web scraping and data extraction

### How to Use Playwright Browser Automation

1. Ensure Playwright is installed (npm install playwright)
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Describe the web testing scenario you need

---

## FAQ

**Q: Do I need to install browsers separately?**

A: Playwright can install browsers automatically with npx playwright install.

**Q: Can it handle authentication?**

A: Yes, it supports login flows, cookies, and session management.

**Q: Does it work with SPAs and dynamic content?**

A: Yes, Playwright handles JavaScript-rendered content and waits for elements automatically.`,
    contentZh: `## 什么是 Playwright Browser Automation？

该技能使 Claude 能够调用 Playwright 进行浏览器自动化，允许以编程方式测试和验证 Web 应用程序。

### Playwright Browser Automation 核心能力

- **浏览器控制**：启动、导航和与浏览器交互
- **元素交互**：点击、输入、选择和断言元素
- **截图捕获**：截取屏幕截图进行视觉验证
- **多浏览器支持**：跨 Chromium、Firefox 和 WebKit 测试

### Playwright Browser Automation 适用场景

- Web 应用程序的自动化端到端测试
- 视觉回归测试
- 表单提交和验证测试
- 网页抓取和数据提取

### 如何使用 Playwright Browser Automation

1. 确保已安装 Playwright（npm install playwright）
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 描述你需要的 Web 测试场景

---

## 常见问题

**Q: 需要单独安装浏览器吗？**

A: Playwright 可以使用 npx playwright install 自动安装浏览器。

**Q: 能处理身份验证吗？**

A: 可以，支持登录流程、cookie 和会话管理。

**Q: 适用于 SPA 和动态内容吗？**

A: 是的，Playwright 处理 JavaScript 渲染的内容并自动等待元素。`,
    category: "development",
    repository: "https://github.com/lackeyjb/playwright-skill",
    author: "lackeyjb",
    tags: ["playwright", "testing", "automation"],
    featured: true,
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    description: "Teaches well-known prompt engineering techniques and patterns, including Anthropic best practices and agent persuasion principles.",
    descriptionZh: "介绍经典提示词工程方法与模式，包括 Anthropic 最佳实践和代理说服原则。",
    content: `## What is Prompt Engineering?

This skill teaches established prompt engineering techniques and patterns, incorporating Anthropic best practices and principles for effective AI agent interactions.

### Prompt Engineering Key Capabilities

- **Technique Library**: Access to proven prompting patterns
- **Best Practices**: Anthropic-recommended approaches
- **Chain-of-Thought**: Structured reasoning techniques
- **Agent Persuasion**: Principles for effective agent guidance

### Prompt Engineering Use Cases

- Crafting more effective prompts for AI interactions
- Improving consistency in AI responses
- Designing complex multi-step workflows
- Training teams on prompt engineering

### How to Use Prompt Engineering

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Request specific prompting techniques or patterns

---

## FAQ

**Q: Is this specific to Claude?**

A: While it includes Anthropic best practices, many techniques apply to other LLMs too.

**Q: Does it cover image/multimodal prompting?**

A: Focuses primarily on text prompting. Multimodal techniques may be added later.

**Q: Can it help debug problematic prompts?**

A: Yes, it can analyze prompts and suggest improvements.`,
    contentZh: `## 什么是 Prompt Engineering？

该技能教授已建立的提示词工程技术和模式，融入 Anthropic 最佳实践和有效 AI 代理交互原则。

### Prompt Engineering 核心能力

- **技术库**：访问经过验证的提示模式
- **最佳实践**：Anthropic 推荐的方法
- **思维链**：结构化推理技术
- **代理说服**：有效代理引导原则

### Prompt Engineering 适用场景

- 为 AI 交互制作更有效的提示词
- 提高 AI 响应的一致性
- 设计复杂的多步骤工作流
- 培训团队掌握提示词工程

### 如何使用 Prompt Engineering

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 请求特定的提示技术或模式

---

## 常见问题

**Q: 这是专门针对 Claude 的吗？**

A: 虽然包含 Anthropic 最佳实践，但许多技术也适用于其他 LLM。

**Q: 涵盖图像/多模态提示吗？**

A: 主要关注文本提示。多模态技术可能稍后添加。

**Q: 能帮助调试有问题的提示吗？**

A: 可以，它可以分析提示并建议改进。`,
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/customaize-agent/skills/prompt-engineering",
    author: "NeoLabHQ",
    tags: ["prompts", "ai", "best-practices"],
  },
  {
    id: "pypict-testing",
    name: "PyPICT Testing",
    description: "Design comprehensive test cases using PICT (Pairwise Independent Combinatorial Testing) for requirements or code.",
    descriptionZh: "使用 PICT（成对独立组合测试）为需求或代码设计全面测试用例。",
    content: `## What is PyPICT Testing?

This skill helps design comprehensive test cases using PICT (Pairwise Independent Combinatorial Testing), a proven technique for efficient test coverage with minimal test cases.

### PyPICT Testing Key Capabilities

- **Combinatorial Testing**: Generate optimal test combinations
- **Pairwise Coverage**: Ensure all parameter pairs are tested
- **Constraint Handling**: Define valid/invalid combinations
- **Test Optimization**: Reduce test count while maintaining coverage

### PyPICT Testing Use Cases

- Designing test suites for configuration-heavy systems
- API parameter testing
- UI form validation testing
- Reducing regression test execution time

### How to Use PyPICT Testing

1. Install PyPICT (pip install pypict)
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Define your parameters and constraints

---

## FAQ

**Q: What is pairwise testing?**

A: A technique ensuring every combination of two parameters is tested at least once, dramatically reducing test count.

**Q: How much can it reduce test cases?**

A: Often 80-90% reduction compared to exhaustive testing while catching most defects.

**Q: Does it work with any testing framework?**

A: It generates test cases that can be used with any framework.`,
    contentZh: `## 什么是 PyPICT Testing？

该技能帮助使用 PICT（成对独立组合测试）设计全面的测试用例，这是一种以最少测试用例实现高效测试覆盖的成熟技术。

### PyPICT Testing 核心能力

- **组合测试**：生成最优测试组合
- **成对覆盖**：确保所有参数对都被测试
- **约束处理**：定义有效/无效组合
- **测试优化**：在保持覆盖率的同时减少测试数量

### PyPICT Testing 适用场景

- 为配置密集型系统设计测试套件
- API 参数测试
- UI 表单验证测试
- 减少回归测试执行时间

### 如何使用 PyPICT Testing

1. 安装 PyPICT（pip install pypict）
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 定义你的参数和约束

---

## 常见问题

**Q: 什么是成对测试？**

A: 一种确保每两个参数的组合至少测试一次的技术，大幅减少测试数量。

**Q: 能减少多少测试用例？**

A: 与穷举测试相比通常减少 80-90%，同时捕获大多数缺陷。

**Q: 适用于任何测试框架吗？**

A: 它生成的测试用例可与任何框架配合使用。`,
    category: "development",
    repository: "https://github.com/omkamal/pypict-claude-skill",
    author: "omkamal",
    tags: ["testing", "pict", "quality"],
  },
  {
    id: "reddit-fetch",
    name: "Reddit Fetch",
    description: "Fetches Reddit content via Gemini CLI when WebFetch is blocked or returns 403 errors.",
    descriptionZh: "在 WebFetch 被阻止或返回 403 时，通过 Gemini CLI 获取 Reddit 内容。",
    content: `## What is Reddit Fetch?

This skill provides an alternative method to fetch Reddit content using Gemini CLI when standard web fetching is blocked or returns 403 errors.

### Reddit Fetch Key Capabilities

- **Bypass Restrictions**: Access Reddit when WebFetch is blocked
- **Content Extraction**: Retrieve posts, comments, and metadata
- **Gemini Integration**: Leverage Gemini CLI for fetching
- **Fallback Support**: Use as backup when primary methods fail

### Reddit Fetch Use Cases

- Researching Reddit discussions for context
- Gathering user feedback from subreddits
- Monitoring Reddit for mentions or topics
- Accessing Reddit data for analysis

### How to Use Reddit Fetch

1. Ensure Gemini CLI is installed and configured
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Request Reddit content with URLs or queries

---

## FAQ

**Q: Why does Reddit block normal fetching?**

A: Reddit's anti-bot measures often block automated requests. This skill provides a workaround.

**Q: Is this compliant with Reddit's terms?**

A: Use responsibly and in accordance with Reddit's API terms of service.

**Q: What content can be fetched?**

A: Public posts, comments, and subreddit information. Private/restricted content is not accessible.`,
    contentZh: `## 什么是 Reddit Fetch？

该技能提供在标准网页抓取被阻止或返回 403 错误时，使用 Gemini CLI 获取 Reddit 内容的替代方法。

### Reddit Fetch 核心能力

- **绕过限制**：在 WebFetch 被阻止时访问 Reddit
- **内容提取**：检索帖子、评论和元数据
- **Gemini 集成**：利用 Gemini CLI 进行获取
- **备用支持**：在主要方法失败时作为备份

### Reddit Fetch 适用场景

- 研究 Reddit 讨论以获取上下文
- 从子版块收集用户反馈
- 监控 Reddit 的提及或话题
- 访问 Reddit 数据进行分析

### 如何使用 Reddit Fetch

1. 确保已安装和配置 Gemini CLI
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 使用 URL 或查询请求 Reddit 内容

---

## 常见问题

**Q: 为什么 Reddit 会阻止正常抓取？**

A: Reddit 的反机器人措施经常阻止自动请求。该技能提供一种解决方法。

**Q: 这符合 Reddit 的条款吗？**

A: 请负责任地使用，并遵守 Reddit 的 API 服务条款。

**Q: 可以获取什么内容？**

A: 公开帖子、评论和子版块信息。私密/受限内容无法访问。`,
    category: "development",
    repository: "https://github.com/ykdojo/claude-code-tips/tree/main/skills/reddit-fetch",
    author: "ykdojo",
    tags: ["reddit", "fetch", "api"],
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    description: "Provides guidance for creating effective Claude Skills that extend capabilities with specialized knowledge and workflows.",
    descriptionZh: "指导创建有效的 Claude Skills，以专门知识与流程扩展能力。",
    content: `## What is Skill Creator?

Skill Creator provides comprehensive guidance for creating effective Claude Skills, helping you extend AI capabilities with specialized knowledge and custom workflows.

### Skill Creator Key Capabilities

- **Skill Structure**: Best practices for organizing skill files
- **Instruction Writing**: Craft clear, effective instructions
- **Context Design**: Optimize context usage and token efficiency
- **Testing Guidance**: Validate skills before deployment

### Skill Creator Use Cases

- Building custom skills for specific domains
- Standardizing skill creation across teams
- Learning skill architecture patterns
- Creating reusable skill templates

### How to Use Skill Creator

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the skill you want to create
4. Follow the guided creation process

---

## FAQ

**Q: What makes a good skill?**

A: Clear scope, well-structured instructions, appropriate context, and tested workflows.

**Q: How long should skill instructions be?**

A: As concise as possible while being complete. Avoid unnecessary verbosity.

**Q: Can skills call other skills?**

A: Skills are independent but can be designed to complement each other.`,
    contentZh: `## 什么是 Skill Creator？

Skill Creator 提供创建有效 Claude Skills 的全面指导，帮助你用专门知识和自定义工作流扩展 AI 能力。

### Skill Creator 核心能力

- **技能结构**：组织技能文件的最佳实践
- **指令编写**：制作清晰、有效的指令
- **上下文设计**：优化上下文使用和令牌效率
- **测试指导**：部署前验证技能

### Skill Creator 适用场景

- 为特定领域构建自定义技能
- 在团队中标准化技能创建
- 学习技能架构模式
- 创建可复用的技能模板

### 如何使用 Skill Creator

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你想创建的技能
4. 按照引导的创建过程进行

---

## 常见问题

**Q: 什么是好的技能？**

A: 清晰的范围、结构良好的指令、适当的上下文和经过测试的工作流。

**Q: 技能指令应该多长？**

A: 在完整的同时尽可能简洁。避免不必要的冗长。

**Q: 技能可以调用其他技能吗？**

A: 技能是独立的，但可以设计成相互补充。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/skill-creator",
    author: "ComposioHQ",
    tags: ["skills", "meta", "creation"],
  },
  {
    id: "skill-seekers",
    name: "Skill Seekers",
    description: "Automatically converts any documentation website into a Claude AI skill in minutes.",
    descriptionZh: "在数分钟内将任意文档网站自动转换为 Claude AI Skill。",
    content: `## What is Skill Seekers?

Skill Seekers automatically converts any documentation website into a Claude AI skill, enabling rapid skill creation from existing documentation.

### Skill Seekers Key Capabilities

- **Auto-conversion**: Transform documentation sites into skills
- **Content Extraction**: Parse and structure documentation content
- **Skill Generation**: Create properly formatted skill files
- **Quick Setup**: Complete conversion in minutes

### Skill Seekers Use Cases

- Creating skills from API documentation
- Converting product docs into AI assistants
- Building internal knowledge bases as skills
- Rapid prototyping of specialized AI helpers

### How to Use Skill Seekers

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide the documentation URL
4. Review and refine the generated skill

---

## FAQ

**Q: What documentation formats work best?**

A: Works well with structured HTML docs, MDX, and common documentation platforms.

**Q: Can it handle authentication-protected docs?**

A: Public documentation works best. Protected content may require additional configuration.

**Q: How accurate is the conversion?**

A: Results are good starting points but may need refinement for production use.`,
    contentZh: `## 什么是 Skill Seekers？

Skill Seekers 自动将任何文档网站转换为 Claude AI 技能，实现从现有文档快速创建技能。

### Skill Seekers 核心能力

- **自动转换**：将文档网站转换为技能
- **内容提取**：解析和结构化文档内容
- **技能生成**：创建格式正确的技能文件
- **快速设置**：在几分钟内完成转换

### Skill Seekers 适用场景

- 从 API 文档创建技能
- 将产品文档转换为 AI 助手
- 将内部知识库构建为技能
- 快速原型化专门的 AI 助手

### 如何使用 Skill Seekers

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供文档 URL
4. 审查和完善生成的技能

---

## 常见问题

**Q: 哪些文档格式效果最好？**

A: 结构化 HTML 文档、MDX 和常见文档平台效果良好。

**Q: 能处理需要身份验证的文档吗？**

A: 公开文档效果最好。受保护的内容可能需要额外配置。

**Q: 转换的准确性如何？**

A: 结果是很好的起点，但可能需要为生产使用进行完善。`,
    category: "development",
    repository: "https://github.com/yusufkaraaslan/Skill_Seekers",
    author: "yusufkaraaslan",
    tags: ["documentation", "automation", "conversion"],
  },
  {
    id: "software-architecture",
    name: "Software Architecture",
    description: "Implements design patterns including Clean Architecture, SOLID principles, and comprehensive software design best practices.",
    descriptionZh: "实现包括整洁架构、SOLID 原则在内的软件设计模式与最佳实践。",
    content: `## What is Software Architecture?

This skill implements proven design patterns including Clean Architecture, SOLID principles, and comprehensive software design best practices for building maintainable systems.

### Software Architecture Key Capabilities

- **Clean Architecture**: Layered architecture patterns
- **SOLID Principles**: Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion
- **Design Patterns**: Factory, Strategy, Observer, and more
- **DDD Support**: Domain-Driven Design concepts

### Software Architecture Use Cases

- Designing new application architectures
- Refactoring legacy codebases
- Code review with architecture focus
- Teaching software design principles

### How to Use Software Architecture

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe your architecture needs or code to review

---

## FAQ

**Q: Which programming languages are supported?**

A: Patterns are language-agnostic. Examples may focus on common languages like TypeScript, Python, or Java.

**Q: Is this for beginners or experienced developers?**

A: Both. It explains concepts clearly while providing advanced implementation guidance.

**Q: Does it help with microservices?**

A: Yes, it covers patterns applicable to microservices and distributed systems.`,
    contentZh: `## 什么是 Software Architecture？

该技能实现经过验证的设计模式，包括整洁架构、SOLID 原则和全面的软件设计最佳实践，用于构建可维护的系统。

### Software Architecture 核心能力

- **整洁架构**：分层架构模式
- **SOLID 原则**：单一职责、开闭原则、里氏替换、接口隔离、依赖倒置
- **设计模式**：工厂、策略、观察者等
- **DDD 支持**：领域驱动设计概念

### Software Architecture 适用场景

- 设计新的应用架构
- 重构遗留代码库
- 以架构为重点进行代码审查
- 教授软件设计原则

### 如何使用 Software Architecture

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你的架构需求或要审查的代码

---

## 常见问题

**Q: 支持哪些编程语言？**

A: 模式是语言无关的。示例可能侧重于 TypeScript、Python 或 Java 等常见语言。

**Q: 这是给初学者还是有经验的开发者的？**

A: 都适用。它清晰地解释概念，同时提供高级实现指导。

**Q: 对微服务有帮助吗？**

A: 有，涵盖适用于微服务和分布式系统的模式。`,
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/ddd/skills/software-architecture",
    author: "NeoLabHQ",
    tags: ["architecture", "design-patterns", "solid"],
  },
  {
    id: "subagent-development",
    name: "Subagent Driven Development",
    description: "Dispatches independent subagents for individual tasks with code review checkpoints between iterations.",
    descriptionZh: "为单个任务分派独立子代理，并在迭代间加入代码审查检查点。",
    content: `## What is Subagent Driven Development?

This skill enables a development workflow where independent subagents handle individual tasks, with code review checkpoints between iterations ensuring quality.

### Subagent Driven Development Key Capabilities

- **Task Distribution**: Break work into subagent-assignable tasks
- **Parallel Execution**: Run multiple subagents concurrently
- **Review Checkpoints**: Automatic code review between iterations
- **Quality Assurance**: Built-in verification steps

### Subagent Driven Development Use Cases

- Large feature implementations
- Complex refactoring projects
- Multi-file code generation
- Parallel development workflows

### How to Use Subagent Driven Development

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Define tasks for subagent distribution
4. Monitor progress through checkpoints

---

## FAQ

**Q: How many subagents can run in parallel?**

A: Depends on your setup. The skill manages coordination regardless of count.

**Q: What happens if a subagent fails?**

A: Failed tasks are flagged for review and can be retried or reassigned.

**Q: Can I customize the review checkpoints?**

A: Yes, review criteria and frequency can be configured.`,
    contentZh: `## 什么是 Subagent Driven Development？

该技能实现一种开发工作流，其中独立的子代理处理单个任务，迭代之间的代码审查检查点确保质量。

### Subagent Driven Development 核心能力

- **任务分配**：将工作分解为可分配给子代理的任务
- **并行执行**：同时运行多个子代理
- **审查检查点**：迭代之间自动进行代码审查
- **质量保证**：内置验证步骤

### Subagent Driven Development 适用场景

- 大型功能实现
- 复杂的重构项目
- 多文件代码生成
- 并行开发工作流

### 如何使用 Subagent Driven Development

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 定义要分配给子代理的任务
4. 通过检查点监控进度

---

## 常见问题

**Q: 可以并行运行多少个子代理？**

A: 取决于你的设置。该技能无论数量如何都管理协调。

**Q: 如果子代理失败怎么办？**

A: 失败的任务会被标记以供审查，可以重试或重新分配。

**Q: 可以自定义审查检查点吗？**

A: 可以，审查标准和频率可以配置。`,
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/sadd/skills/subagent-driven-development",
    author: "NeoLabHQ",
    tags: ["agents", "development", "workflow"],
  },
  {
    id: "tdd",
    name: "Test Driven Development",
    description: "Use when implementing any feature or bugfix, before writing implementation code.",
    descriptionZh: "在实现任何功能或修复之前使用，再编写实现代码。",
    content: `## What is Test Driven Development?

This skill guides the TDD (Test Driven Development) workflow: write tests first, then implement code to make tests pass, ensuring better code quality and coverage.

### Test Driven Development Key Capabilities

- **Red-Green-Refactor**: Classic TDD cycle guidance
- **Test First**: Write failing tests before implementation
- **Incremental Development**: Small, verified steps
- **Refactoring Support**: Safe refactoring with test coverage

### Test Driven Development Use Cases

- Implementing new features with confidence
- Fixing bugs with regression prevention
- Refactoring with safety nets
- Teaching TDD methodology

### How to Use Test Driven Development

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the feature or bug to fix
4. Follow the TDD guidance provided

---

## FAQ

**Q: What testing frameworks are supported?**

A: Framework-agnostic guidance, applicable to Jest, pytest, JUnit, etc.

**Q: Is TDD always necessary?**

A: It's most valuable for complex logic. Simple changes may not need full TDD rigor.

**Q: How does it handle existing code without tests?**

A: It can guide adding tests to legacy code incrementally.`,
    contentZh: `## 什么是 Test Driven Development？

该技能指导 TDD（测试驱动开发）工作流：先写测试，然后实现代码使测试通过，确保更好的代码质量和覆盖率。

### Test Driven Development 核心能力

- **红-绿-重构**：经典 TDD 循环指导
- **测试优先**：在实现之前编写失败的测试
- **增量开发**：小步骤、已验证的步骤
- **重构支持**：在测试覆盖下安全重构

### Test Driven Development 适用场景

- 自信地实现新功能
- 修复 bug 并防止回归
- 有安全网的重构
- 教授 TDD 方法论

### 如何使用 Test Driven Development

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述要修复的功能或 bug
4. 按照提供的 TDD 指导进行

---

## 常见问题

**Q: 支持哪些测试框架？**

A: 与框架无关的指导，适用于 Jest、pytest、JUnit 等。

**Q: TDD 总是必要的吗？**

A: 对于复杂逻辑最有价值。简单的更改可能不需要完整的 TDD 严格性。

**Q: 如何处理没有测试的现有代码？**

A: 它可以指导逐步为遗留代码添加测试。`,
    category: "development",
    repository: "https://github.com/obra/superpowers/tree/main/skills/test-driven-development",
    author: "obra",
    tags: ["tdd", "testing", "development"],
  },
  {
    id: "git-worktrees",
    name: "Using Git Worktrees",
    description: "Creates isolated git worktrees with smart directory selection and safety verification.",
    descriptionZh: "创建隔离的 git worktree，并提供智能目录选择与安全校验。",
    content: `## What is Using Git Worktrees?

This skill helps create and manage isolated git worktrees, enabling work on multiple branches simultaneously without switching or stashing.

### Using Git Worktrees Key Capabilities

- **Worktree Creation**: Smart directory selection for new worktrees
- **Safety Verification**: Prevent accidental data loss
- **Branch Management**: Easy switching between worktrees
- **Cleanup**: Proper worktree removal when done

### Using Git Worktrees Use Cases

- Working on multiple features in parallel
- Testing changes across branches simultaneously
- Code review while continuing development
- Comparing implementations across branches

### How to Use Git Worktrees

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Request worktree creation for a branch
4. The skill handles directory setup and verification

---

## FAQ

**Q: What are git worktrees?**

A: Worktrees allow checking out multiple branches from the same repo in different directories simultaneously.

**Q: Do worktrees share the .git folder?**

A: Yes, they share the same git history and objects, saving disk space.

**Q: Can I delete a worktree safely?**

A: Yes, the skill handles proper cleanup to avoid orphaned worktrees.`,
    contentZh: `## 什么是 Using Git Worktrees？

该技能帮助创建和管理隔离的 git worktree，使你能够同时在多个分支上工作，无需切换或暂存。

### Git Worktrees 核心能力

- **Worktree 创建**：为新 worktree 智能选择目录
- **安全验证**：防止意外数据丢失
- **分支管理**：在 worktree 之间轻松切换
- **清理**：完成后正确移除 worktree

### Git Worktrees 适用场景

- 并行处理多个功能
- 同时在不同分支上测试更改
- 在继续开发的同时进行代码审查
- 跨分支比较实现

### 如何使用 Git Worktrees

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 请求为分支创建 worktree
4. 技能处理目录设置和验证

---

## 常见问题

**Q: 什么是 git worktree？**

A: Worktree 允许在不同目录中同时检出同一仓库的多个分支。

**Q: Worktree 共享 .git 文件夹吗？**

A: 是的，它们共享相同的 git 历史和对象，节省磁盘空间。

**Q: 可以安全删除 worktree 吗？**

A: 可以，该技能处理正确的清理以避免孤立的 worktree。`,
    category: "development",
    repository: "https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/",
    author: "obra",
    tags: ["git", "worktrees", "workflow"],
  },
  {
    id: "connect-apps",
    name: "Connect Apps",
    description: "Connect Claude to any app. Send emails, create issues, post messages across Gmail, Slack, GitHub, Notion, and 1000+ services.",
    descriptionZh: "将 Claude 连接到任意应用，可在 Gmail、Slack、GitHub、Notion 等 1000+ 服务中发送邮件、创建问题、发布消息。",
    content: `## What is Connect Apps?

Connect Apps enables Claude to interact with over 1000 services including Gmail, Slack, GitHub, Notion, and more, allowing automated actions across applications.

### Connect Apps Key Capabilities

- **Multi-platform**: Connect to 1000+ services and APIs
- **Email**: Send and manage emails via Gmail, Outlook
- **Collaboration**: Post to Slack, Teams, Discord
- **Development**: Create GitHub issues, manage repos
- **Productivity**: Update Notion, create calendar events

### Connect Apps Use Cases

- Automating cross-application workflows
- Sending notifications and updates
- Creating issues from conversations
- Syncing data between platforms

### How to Use Connect Apps

1. Clone or download the skill from the GitHub repository
2. Configure authentication for desired services
3. Add the skill files to your agent's configuration directory
4. Request actions across connected apps

---

## FAQ

**Q: How is authentication handled?**

A: OAuth and API keys depending on the service. Credentials are stored securely.

**Q: Which services are supported?**

A: Over 1000 including major platforms. Check the repository for the full list.

**Q: Can I add custom integrations?**

A: Yes, the framework supports adding new service integrations.`,
    contentZh: `## 什么是 Connect Apps？

Connect Apps 使 Claude 能够与超过 1000 种服务交互，包括 Gmail、Slack、GitHub、Notion 等，允许跨应用程序自动执行操作。

### Connect Apps 核心能力

- **多平台**：连接到 1000+ 服务和 API
- **电子邮件**：通过 Gmail、Outlook 发送和管理邮件
- **协作**：发布到 Slack、Teams、Discord
- **开发**：创建 GitHub issue、管理仓库
- **生产力**：更新 Notion、创建日历事件

### Connect Apps 适用场景

- 自动化跨应用工作流
- 发送通知和更新
- 从对话中创建 issue
- 在平台之间同步数据

### 如何使用 Connect Apps

1. 从 GitHub 仓库克隆或下载该技能
2. 为所需服务配置身份验证
3. 将技能文件添加到代理配置目录
4. 请求跨连接应用的操作

---

## 常见问题

**Q: 如何处理身份验证？**

A: 根据服务使用 OAuth 和 API 密钥。凭据安全存储。

**Q: 支持哪些服务？**

A: 超过 1000 个，包括主要平台。查看仓库获取完整列表。

**Q: 可以添加自定义集成吗？**

A: 可以，该框架支持添加新的服务集成。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/connect",
    author: "ComposioHQ",
    tags: ["integration", "apps", "automation"],
    featured: true,
  },
  {
    id: "webapp-testing",
    name: "Webapp Testing",
    description: "Tests local web applications using Playwright for verifying frontend functionality, debugging UI behavior, and capturing screenshots.",
    descriptionZh: "使用 Playwright 测试本地 Web 应用，用于验证前端功能、调试界面行为并截图。",
    content: `## What is Webapp Testing?

This skill tests local web applications using Playwright, enabling verification of frontend functionality, UI debugging, and screenshot capture for visual testing.

### Webapp Testing Key Capabilities

- **Local Testing**: Test apps running on localhost
- **UI Verification**: Validate frontend behavior and appearance
- **Screenshot Capture**: Document UI states for comparison
- **Debug Support**: Identify and diagnose UI issues

### Webapp Testing Use Cases

- Testing local development builds
- Visual regression testing
- Debugging UI rendering issues
- Documenting UI states for review

### How to Use Webapp Testing

1. Ensure Playwright is installed
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Start your local app and provide the URL

---

## FAQ

**Q: Does it work with any frontend framework?**

A: Yes, it tests the rendered output regardless of framework (React, Vue, Angular, etc.).

**Q: Can it run tests headlessly?**

A: Yes, both headless and headed modes are supported.

**Q: How are screenshots compared?**

A: Screenshots can be compared manually or with visual diff tools.`,
    contentZh: `## 什么是 Webapp Testing？

该技能使用 Playwright 测试本地 Web 应用程序，实现前端功能验证、UI 调试和截图捕获用于视觉测试。

### Webapp Testing 核心能力

- **本地测试**：测试在 localhost 上运行的应用
- **UI 验证**：验证前端行为和外观
- **截图捕获**：记录 UI 状态以供比较
- **调试支持**：识别和诊断 UI 问题

### Webapp Testing 适用场景

- 测试本地开发构建
- 视觉回归测试
- 调试 UI 渲染问题
- 记录 UI 状态以供审查

### 如何使用 Webapp Testing

1. 确保已安装 Playwright
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 启动本地应用并提供 URL

---

## 常见问题

**Q: 适用于任何前端框架吗？**

A: 是的，它测试渲染输出，与框架无关（React、Vue、Angular 等）。

**Q: 可以无头运行测试吗？**

A: 可以，支持无头和有头模式。

**Q: 如何比较截图？**

A: 截图可以手动比较或使用视觉差异工具比较。`,
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/webapp-testing",
    author: "ComposioHQ",
    tags: ["playwright", "testing", "web"],
  },

  // ==================== Data & Analysis ====================
  {
    id: "csv-summarizer",
    name: "CSV Data Summarizer",
    description: "Automatically analyzes CSV files and generates comprehensive insights with visualizations without requiring user prompts.",
    descriptionZh: "自动分析 CSV 文件并生成包含可视化的全面洞察，无需用户提示。",
    content: `## What is CSV Data Summarizer?

This skill automatically analyzes CSV files and generates comprehensive insights with visualizations, providing data summaries without requiring detailed user prompts.

### CSV Data Summarizer Key Capabilities

- **Auto-analysis**: Analyze CSV structure and content automatically
- **Statistical Summary**: Generate mean, median, distributions, correlations
- **Visualizations**: Create charts and graphs for key insights
- **Data Profiling**: Identify data types, missing values, outliers

### CSV Data Summarizer Use Cases

- Quick exploration of new datasets
- Generating data quality reports
- Creating executive summaries from data
- Preliminary analysis before deep dives

### How to Use CSV Data Summarizer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide a CSV file for analysis
4. Receive automated insights and visualizations

---

## FAQ

**Q: What size CSV files can it handle?**

A: Works well with files up to several hundred MB. Very large files may need sampling.

**Q: What visualization formats are supported?**

A: Generates charts as images or HTML depending on the output context.

**Q: Can it handle messy data?**

A: Yes, it identifies and reports data quality issues as part of the analysis.`,
    contentZh: `## 什么是 CSV Data Summarizer？

该技能自动分析 CSV 文件并生成带有可视化的全面洞察，无需详细的用户提示即可提供数据摘要。

### CSV Data Summarizer 核心能力

- **自动分析**：自动分析 CSV 结构和内容
- **统计摘要**：生成均值、中位数、分布、相关性
- **可视化**：为关键洞察创建图表
- **数据分析**：识别数据类型、缺失值、异常值

### CSV Data Summarizer 适用场景

- 快速探索新数据集
- 生成数据质量报告
- 从数据创建高管摘要
- 深入分析前的初步分析

### 如何使用 CSV Data Summarizer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供要分析的 CSV 文件
4. 接收自动化的洞察和可视化

---

## 常见问题

**Q: 能处理多大的 CSV 文件？**

A: 对几百 MB 以内的文件效果良好。非常大的文件可能需要采样。

**Q: 支持哪些可视化格式？**

A: 根据输出上下文生成图像或 HTML 格式的图表。

**Q: 能处理杂乱的数据吗？**

A: 可以，它会识别并报告数据质量问题作为分析的一部分。`,
    category: "data-analysis",

    repository: "https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill",
    author: "coffeefuelbump",
    tags: ["csv", "analysis", "visualization"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "Execute safe read-only SQL queries against PostgreSQL databases with multi-connection support and defense-in-depth security.",
    descriptionZh: "在 PostgreSQL 上执行安全只读查询，支持多连接与纵深防御安全策略。",
    content: `## What is PostgreSQL?

This skill enables safe, read-only SQL query execution against PostgreSQL databases with multi-connection support and defense-in-depth security measures.

### PostgreSQL Key Capabilities

- **Read-only Queries**: Execute SELECT queries safely
- **Multi-connection**: Support for multiple database connections
- **Security**: Defense-in-depth protection against SQL injection
- **Query Optimization**: Suggestions for query performance

### PostgreSQL Use Cases

- Exploring database schemas and data
- Generating reports from database queries
- Data analysis and aggregation
- Database documentation and discovery

### How to Use PostgreSQL

1. Clone or download the skill from the GitHub repository
2. Configure database connection strings securely
3. Add the skill files to your agent's configuration directory
4. Request data queries in natural language

---

## FAQ

**Q: Can it run write operations?**

A: No, by design it only supports read-only operations for safety.

**Q: How are credentials handled?**

A: Connection strings should be configured via environment variables, not hardcoded.

**Q: Does it support other databases?**

A: This skill focuses on PostgreSQL. Similar skills exist for other databases.`,
    contentZh: `## 什么是 PostgreSQL？

该技能在 PostgreSQL 数据库上启用安全的只读 SQL 查询执行，支持多连接和纵深防御安全措施。

### PostgreSQL 核心能力

- **只读查询**：安全执行 SELECT 查询
- **多连接**：支持多个数据库连接
- **安全性**：防止 SQL 注入的纵深防御保护
- **查询优化**：查询性能建议

### PostgreSQL 适用场景

- 探索数据库模式和数据
- 从数据库查询生成报告
- 数据分析和聚合
- 数据库文档和发现

### 如何使用 PostgreSQL

1. 从 GitHub 仓库克隆或下载该技能
2. 安全配置数据库连接字符串
3. 将技能文件添加到代理配置目录
4. 用自然语言请求数据查询

---

## 常见问题

**Q: 能运行写操作吗？**

A: 不能，为了安全起见，设计上只支持只读操作。

**Q: 如何处理凭据？**

A: 连接字符串应通过环境变量配置，而不是硬编码。

**Q: 支持其他数据库吗？**

A: 该技能专注于 PostgreSQL。其他数据库有类似的技能。`,
    category: "data-analysis",
    repository: "https://github.com/sanjay3290/ai-skills/tree/main/skills/postgres",
    author: "sanjay3290",
    tags: ["postgres", "sql", "database"],
  },

  // ==================== Business & Marketing ====================
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description: "Applies Anthropic's official brand colors and typography to artifacts for consistent visual identity.",
    descriptionZh: "将 Anthropic 官方品牌配色与字体应用于作品，确保视觉一致性。",
    content: `## What is Brand Guidelines?

This skill applies Anthropic's official brand colors and typography to generated artifacts, ensuring consistent visual identity across outputs.

### Brand Guidelines Key Capabilities

- **Brand Colors**: Apply official Anthropic color palette
- **Typography**: Use brand-approved fonts and styles
- **Consistency**: Ensure visual consistency across artifacts
- **Templates**: Pre-configured brand-compliant templates

### Brand Guidelines Use Cases

- Creating branded presentations
- Generating marketing materials
- Building internal documents with brand compliance
- Designing web artifacts with official styling

### How to Use Brand Guidelines

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Request artifacts with brand guidelines applied
4. Outputs will follow Anthropic's visual identity

---

## FAQ

**Q: Is this only for Anthropic branding?**

A: This version focuses on Anthropic. The approach can be adapted for other brands.

**Q: Can I customize the brand elements?**

A: The skill applies official guidelines. Custom branding would need a modified version.

**Q: What output formats support branding?**

A: HTML artifacts, presentations, and documents can all be branded.`,
    contentZh: `## 什么是 Brand Guidelines？

该技能将 Anthropic 官方品牌颜色和字体应用于生成的作品，确保输出的视觉一致性。

### Brand Guidelines 核心能力

- **品牌颜色**：应用官方 Anthropic 调色板
- **字体排版**：使用品牌认可的字体和样式
- **一致性**：确保作品间的视觉一致性
- **模板**：预配置的品牌合规模板

### Brand Guidelines 适用场景

- 创建品牌演示文稿
- 生成营销材料
- 构建符合品牌的内部文档
- 设计带有官方样式的 Web 作品

### 如何使用 Brand Guidelines

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 请求应用品牌指南的作品
4. 输出将遵循 Anthropic 的视觉标识

---

## 常见问题

**Q: 这只适用于 Anthropic 品牌吗？**

A: 此版本专注于 Anthropic。该方法可以适配其他品牌。

**Q: 可以自定义品牌元素吗？**

A: 该技能应用官方指南。自定义品牌需要修改版本。

**Q: 哪些输出格式支持品牌化？**

A: HTML 作品、演示文稿和文档都可以品牌化。`,
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/brand-guidelines",
    author: "ComposioHQ",
    tags: ["branding", "design", "identity"],
  },
  {
    id: "competitive-ads",
    name: "Competitive Ads Extractor",
    description: "Extracts and analyzes competitors' ads from ad libraries to understand messaging and creative approaches.",
    descriptionZh: "从广告库提取并分析竞品广告，以理解其传播信息与创意方式。",
    content: `## What is Competitive Ads Extractor?

This skill extracts and analyzes competitor advertisements from ad libraries, providing insights into messaging strategies and creative approaches.

### Competitive Ads Extractor Key Capabilities

- **Ad Extraction**: Pull ads from major ad libraries
- **Messaging Analysis**: Understand competitor positioning
- **Creative Insights**: Analyze visual and copy patterns
- **Trend Detection**: Identify advertising trends over time

### Competitive Ads Extractor Use Cases

- Competitive intelligence gathering
- Informing ad creative development
- Understanding market positioning
- Tracking competitor campaign changes

### How to Use Competitive Ads Extractor

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Specify competitors or industries to analyze
4. Receive structured competitive ad insights

---

## FAQ

**Q: Which ad libraries are supported?**

A: Supports major platforms like Meta Ad Library and Google Ads Transparency Center.

**Q: Is this compliant with platform terms?**

A: Uses public ad library data. Review platform terms for your use case.

**Q: How current is the data?**

A: Fetches current active ads. Historical data depends on library availability.`,
    contentZh: `## 什么是 Competitive Ads Extractor？

该技能从广告库中提取和分析竞争对手的广告，提供关于信息策略和创意方法的洞察。

### Competitive Ads Extractor 核心能力

- **广告提取**：从主要广告库拉取广告
- **信息分析**：理解竞争对手定位
- **创意洞察**：分析视觉和文案模式
- **趋势检测**：识别一段时间内的广告趋势

### Competitive Ads Extractor 适用场景

- 竞争情报收集
- 为广告创意开发提供信息
- 理解市场定位
- 跟踪竞争对手广告变化

### 如何使用 Competitive Ads Extractor

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 指定要分析的竞争对手或行业
4. 接收结构化的竞争广告洞察

---

## 常见问题

**Q: 支持哪些广告库？**

A: 支持 Meta 广告库和 Google 广告透明中心等主要平台。

**Q: 这符合平台条款吗？**

A: 使用公开的广告库数据。请为你的用例审查平台条款。

**Q: 数据有多新？**

A: 获取当前活跃的广告。历史数据取决于广告库的可用性。`,
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/competitive-ads-extractor",
    author: "ComposioHQ",
    tags: ["marketing", "ads", "competitive"],
  },
  {
    id: "domain-brainstormer",
    name: "Domain Name Brainstormer",
    description: "Generates creative domain name ideas and checks availability across multiple TLDs including .com, .io, .dev, and .ai.",
    descriptionZh: "生成创意域名并检查 .com、.io、.dev、.ai 等多种后缀的可用性。",
    content: `## What is Domain Name Brainstormer?

This skill generates creative domain name ideas based on your requirements and checks availability across multiple TLDs including .com, .io, .dev, and .ai.

### Domain Name Brainstormer Key Capabilities

- **Name Generation**: Creative domain name suggestions
- **Availability Check**: Real-time availability across TLDs
- **Multiple TLDs**: Check .com, .io, .dev, .ai, and more
- **Alternatives**: Suggest variations when preferred names are taken

### Domain Name Brainstormer Use Cases

- Naming new startups and projects
- Finding available domains for products
- Exploring brand name options
- Securing domain portfolios

### How to Use Domain Name Brainstormer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe your project or desired name characteristics
4. Receive domain suggestions with availability status

---

## FAQ

**Q: How accurate is the availability check?**

A: Checks are real-time but domains can be registered quickly. Verify before purchase.

**Q: Can it suggest premium domains?**

A: It focuses on standard registration. Premium/aftermarket domains aren't included.

**Q: What about trademark conflicts?**

A: Domain availability doesn't guarantee trademark clearance. Conduct proper trademark research.`,
    contentZh: `## 什么是 Domain Name Brainstormer？

该技能根据你的需求生成创意域名想法，并检查 .com、.io、.dev、.ai 等多种 TLD 的可用性。

### Domain Name Brainstormer 核心能力

- **名称生成**：创意域名建议
- **可用性检查**：跨 TLD 的实时可用性
- **多种 TLD**：检查 .com、.io、.dev、.ai 等
- **替代方案**：当首选名称被占用时建议变体

### Domain Name Brainstormer 适用场景

- 为新创业公司和项目命名
- 为产品寻找可用域名
- 探索品牌名称选项
- 确保域名组合

### 如何使用 Domain Name Brainstormer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你的项目或期望的名称特征
4. 接收带有可用性状态的域名建议

---

## 常见问题

**Q: 可用性检查有多准确？**

A: 检查是实时的，但域名可能很快被注册。购买前请验证。

**Q: 能建议高级域名吗？**

A: 它专注于标准注册。不包括高级/二级市场域名。

**Q: 商标冲突怎么办？**

A: 域名可用性不保证商标清除。请进行适当的商标研究。`,
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/domain-name-brainstormer",
    author: "ComposioHQ",
    tags: ["domain", "naming", "startup"],
  },
  {
    id: "internal-comms",
    name: "Internal Comms",
    description: "Helps write internal communications including updates, company newsletters, FAQs, status reports, and project updates.",
    descriptionZh: "协助撰写内部沟通材料，包括更新、公司简报、FAQ、状态报告与项目更新。",
    content: `## What is Internal Comms?

This skill helps write effective internal communications including company updates, newsletters, FAQs, status reports, and project updates.

### Internal Comms Key Capabilities

- **Company Updates**: Write clear organizational announcements
- **Newsletters**: Create engaging internal newsletters
- **Status Reports**: Structure progress updates effectively
- **FAQ Documents**: Develop comprehensive FAQ content

### Internal Comms Use Cases

- Weekly/monthly company updates
- Project status communications
- Policy and procedure announcements
- Team and department newsletters

### How to Use Internal Comms

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the communication type and key points
4. Receive professionally formatted internal content

---

## FAQ

**Q: What tone does it use?**

A: Professional but approachable. Tone can be adjusted based on company culture.

**Q: Can it handle sensitive topics?**

A: It provides frameworks for difficult communications. Final review is recommended.

**Q: What formats are supported?**

A: Email, document, and presentation formats for internal distribution.`,
    contentZh: `## 什么是 Internal Comms？

该技能帮助撰写有效的内部沟通，包括公司更新、简报、FAQ、状态报告和项目更新。

### Internal Comms 核心能力

- **公司更新**：撰写清晰的组织公告
- **简报**：创建引人入胜的内部简报
- **状态报告**：有效地结构化进度更新
- **FAQ 文档**：开发全面的 FAQ 内容

### Internal Comms 适用场景

- 每周/每月公司更新
- 项目状态沟通
- 政策和程序公告
- 团队和部门简报

### 如何使用 Internal Comms

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述沟通类型和要点
4. 接收专业格式化的内部内容

---

## 常见问题

**Q: 使用什么语气？**

A: 专业但易于接近。语气可以根据公司文化调整。

**Q: 能处理敏感话题吗？**

A: 它为困难的沟通提供框架。建议最终审查。

**Q: 支持哪些格式？**

A: 用于内部分发的邮件、文档和演示文稿格式。`,
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/internal-comms",
    author: "ComposioHQ",
    tags: ["communication", "writing", "business"],
  },
  {
    id: "lead-research",
    name: "Lead Research Assistant",
    description: "Identifies and qualifies high-quality leads by analyzing your product, searching for target companies, and providing outreach strategies.",
    descriptionZh: "通过分析你的产品、搜索目标公司并提供触达策略来识别并筛选高质量潜在客户。",
    content: `## What is Lead Research Assistant?

Lead Research Assistant helps identify and qualify high-quality sales leads by analyzing your product offering, searching for target companies, and providing personalized outreach strategies.

### Lead Research Assistant Key Capabilities

- **Product Analysis**: Understand your offering to find ideal customers
- **Company Research**: Search and qualify potential target companies
- **Lead Qualification**: Score and prioritize leads based on fit
- **Outreach Strategies**: Generate personalized outreach recommendations

### Lead Research Assistant Use Cases

- Building targeted prospect lists for sales teams
- Qualifying inbound leads against ideal customer profiles
- Researching companies before sales calls
- Developing account-based marketing strategies

### How to Use Lead Research Assistant

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe your product and ideal customer profile
4. Receive qualified lead lists with outreach recommendations

---

## FAQ

**Q: What data sources does it use?**

A: Combines web research, company databases, and public information to build lead profiles.

**Q: Can it integrate with CRM systems?**

A: It generates lead data that can be imported into most CRM systems.

**Q: How does it handle GDPR compliance?**

A: Uses publicly available business information. Ensure your outreach complies with local regulations.`,
    contentZh: `## 什么是 Lead Research Assistant？

Lead Research Assistant 通过分析你的产品、搜索目标公司并提供个性化触达策略，帮助识别和筛选高质量销售线索。

### Lead Research Assistant 核心能力

- **产品分析**：理解你的产品以找到理想客户
- **公司研究**：搜索和筛选潜在目标公司
- **线索筛选**：根据匹配度对线索进行评分和优先排序
- **触达策略**：生成个性化的触达建议

### Lead Research Assistant 适用场景

- 为销售团队构建目标客户列表
- 根据理想客户画像筛选入站线索
- 销售电话前研究公司信息
- 制定基于账户的营销策略

### 如何使用 Lead Research Assistant

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你的产品和理想客户画像
4. 获得带有触达建议的合格线索列表

---

## 常见问题

**Q: 使用哪些数据源？**

A: 结合网络研究、公司数据库和公开信息来构建线索档案。

**Q: 能与 CRM 系统集成吗？**

A: 它生成的线索数据可以导入大多数 CRM 系统。

**Q: 如何处理 GDPR 合规？**

A: 使用公开可用的商业信息。请确保你的触达符合当地法规。`,
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/lead-research-assistant",
    author: "ComposioHQ",
    tags: ["sales", "leads", "research"],
  },

  // ==================== Communication & Writing ====================
  {
    id: "article-extractor",
    name: "Article Extractor",
    description: "Extract full article text and metadata from web pages.",
    descriptionZh: "从网页中提取完整文章正文与元数据。",
    content: `## What is Article Extractor?

Article Extractor enables AI agents to extract full article text and metadata from web pages, providing clean content for analysis, summarization, or archival.

### Article Extractor Key Capabilities

- **Content Extraction**: Pull main article text from cluttered web pages
- **Metadata Parsing**: Extract title, author, date, and other metadata
- **Clean Output**: Remove ads, navigation, and irrelevant elements
- **Format Preservation**: Maintain headings, lists, and basic structure

### Article Extractor Use Cases

- Research and content aggregation
- Building article databases for analysis
- Preparing content for summarization
- Archiving important web content

### How to Use Article Extractor

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide URLs of articles to extract
4. Receive clean text and metadata

---

## FAQ

**Q: Does it work with paywalled content?**

A: Only publicly accessible content can be extracted. Paywalled articles require authentication.

**Q: What about JavaScript-rendered pages?**

A: Works best with static HTML. Dynamic content may require additional handling.

**Q: Can it extract images?**

A: Focuses on text content. Image URLs can be captured but not the images themselves.`,
    contentZh: `## 什么是 Article Extractor？

Article Extractor 使 AI 代理能够从网页中提取完整的文章文本和元数据，提供干净的内容用于分析、摘要或存档。

### Article Extractor 核心能力

- **内容提取**：从杂乱的网页中提取主要文章文本
- **元数据解析**：提取标题、作者、日期和其他元数据
- **干净输出**：移除广告、导航和无关元素
- **格式保留**：保持标题、列表和基本结构

### Article Extractor 适用场景

- 研究和内容聚合
- 构建文章数据库用于分析
- 为摘要准备内容
- 存档重要的网页内容

### 如何使用 Article Extractor

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供要提取的文章 URL
4. 获得干净的文本和元数据

---

## 常见问题

**Q: 能提取付费墙内容吗？**

A: 只能提取公开可访问的内容。付费文章需要身份验证。

**Q: JavaScript 渲染的页面怎么办？**

A: 最适合静态 HTML。动态内容可能需要额外处理。

**Q: 能提取图片吗？**

A: 专注于文本内容。可以捕获图片 URL，但不能提取图片本身。`,
    category: "communication",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/article-extractor",
    author: "michalparkola",
    tags: ["web", "extraction", "articles"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    description: "Transform rough ideas into fully-formed designs through structured questioning and alternative exploration.",
    descriptionZh: "通过结构化提问与备选探索，将粗略想法转化为完整设计。",
    content: `## What is Brainstorming?

Brainstorming transforms rough ideas into fully-formed designs through structured questioning, alternative exploration, and creative expansion techniques.

### Brainstorming Key Capabilities

- **Structured Questioning**: Probe ideas with targeted questions
- **Alternative Exploration**: Generate multiple solution paths
- **Idea Expansion**: Build on initial concepts systematically
- **Design Refinement**: Evolve rough sketches into detailed plans

### Brainstorming Use Cases

- Product feature ideation sessions
- Problem-solving and solution design
- Creative project development
- Strategic planning and exploration

### How to Use Brainstorming

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Present your rough idea or problem statement
4. Engage with the structured brainstorming process

---

## FAQ

**Q: How is this different from just asking for ideas?**

A: It follows a structured methodology that systematically explores possibilities rather than generating random suggestions.

**Q: Can it work with technical concepts?**

A: Yes, it adapts to technical, creative, business, or any other domain.

**Q: How long does a brainstorming session take?**

A: Sessions are interactive and can be as brief or extensive as needed.`,
    contentZh: `## 什么是 Brainstorming？

Brainstorming 通过结构化提问、备选探索和创意扩展技术，将粗略想法转化为完整设计。

### Brainstorming 核心能力

- **结构化提问**：用有针对性的问题探索想法
- **备选探索**：生成多条解决路径
- **想法扩展**：系统地在初始概念上构建
- **设计细化**：将粗略草图演变为详细计划

### Brainstorming 适用场景

- 产品功能构思会议
- 问题解决和方案设计
- 创意项目开发
- 战略规划和探索

### 如何使用 Brainstorming

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提出你的粗略想法或问题陈述
4. 参与结构化的头脑风暴过程

---

## 常见问题

**Q: 这与直接要求提供想法有什么不同？**

A: 它遵循一种结构化方法论，系统地探索可能性，而不是生成随机建议。

**Q: 能处理技术概念吗？**

A: 可以，它适应技术、创意、商业或任何其他领域。

**Q: 头脑风暴会议需要多长时间？**

A: 会议是互动的，可以根据需要简短或深入。`,
    category: "communication",
    repository: "https://github.com/obra/superpowers/tree/main/skills/brainstorming",
    author: "obra",
    tags: ["ideation", "creativity", "design"],
  },
  {
    id: "content-research-writer",
    name: "Content Research Writer",
    description: "Assists in writing high-quality content by conducting research, adding citations, improving hooks, and providing feedback.",
    descriptionZh: "通过研究、补充引用、优化开头并提供反馈，协助产出高质量内容。",
    content: `## What is Content Research Writer?

Content Research Writer assists in creating high-quality content by conducting research, adding credible citations, improving hooks, and providing constructive feedback.

### Content Research Writer Key Capabilities

- **Research Integration**: Find and incorporate relevant sources
- **Citation Addition**: Add credible references to strengthen content
- **Hook Optimization**: Craft compelling openings and headlines
- **Feedback Loop**: Provide constructive improvement suggestions

### Content Research Writer Use Cases

- Blog post and article writing
- Creating research-backed marketing content
- Academic and technical writing assistance
- Content quality improvement and editing

### How to Use Content Research Writer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide your content draft or topic
4. Receive enhanced content with research and citations

---

## FAQ

**Q: What types of content does it support?**

A: Blog posts, articles, reports, marketing copy, and most written content formats.

**Q: How does it verify source credibility?**

A: Prioritizes authoritative sources and academic references when available.

**Q: Can it match specific writing styles?**

A: Yes, provide style guidelines and it will adapt the content accordingly.`,
    contentZh: `## 什么是 Content Research Writer？

Content Research Writer 通过进行研究、添加可靠引用、优化开头和提供建设性反馈，协助创建高质量内容。

### Content Research Writer 核心能力

- **研究整合**：查找并整合相关来源
- **引用添加**：添加可靠参考以加强内容
- **开头优化**：制作引人注目的开头和标题
- **反馈循环**：提供建设性的改进建议

### Content Research Writer 适用场景

- 博客文章和文章写作
- 创建有研究支持的营销内容
- 学术和技术写作辅助
- 内容质量改进和编辑

### 如何使用 Content Research Writer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供你的内容草稿或主题
4. 获得带有研究和引用的增强内容

---

## 常见问题

**Q: 支持哪些类型的内容？**

A: 博客文章、文章、报告、营销文案和大多数书面内容格式。

**Q: 如何验证来源可信度？**

A: 优先使用权威来源和学术参考（如果可用）。

**Q: 能匹配特定的写作风格吗？**

A: 可以，提供风格指南，它会相应地调整内容。`,
    category: "communication",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/content-research-writer",
    author: "ComposioHQ",
    tags: ["writing", "research", "content"],
  },
  {
    id: "family-history",
    name: "Family History Research",
    description: "Provides assistance with planning family history and genealogy research projects.",
    descriptionZh: "协助规划家族史与族谱研究项目。",
    content: `## What is Family History Research?

Family History Research provides comprehensive assistance with planning and conducting genealogy research projects, helping you discover and document your ancestry.

### Family History Research Key Capabilities

- **Research Planning**: Structure genealogy research projects effectively
- **Source Guidance**: Identify relevant records and archives to search
- **Documentation**: Organize findings in standard genealogical formats
- **Analysis Support**: Help interpret historical records and documents

### Family History Research Use Cases

- Starting a family history research project
- Organizing existing genealogy research
- Finding strategies to break through research walls
- Documenting family stories and heritage

### How to Use Family History Research

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe your family history research goals
4. Receive structured research plans and guidance

---

## FAQ

**Q: Does it access genealogy databases directly?**

A: It provides research guidance. Actual database access requires separate subscriptions.

**Q: What time periods does it cover?**

A: Provides guidance for research across all historical periods and regions.

**Q: Can it help with non-English records?**

A: Yes, it can provide guidance for researching records in various languages and regions.`,
    contentZh: `## 什么是 Family History Research？

Family History Research 提供规划和开展家谱研究项目的全面帮助，帮助你发现和记录你的祖先。

### Family History Research 核心能力

- **研究规划**：有效地构建家谱研究项目
- **来源指导**：识别相关的记录和档案进行搜索
- **文档整理**：以标准家谱格式整理发现
- **分析支持**：帮助解读历史记录和文档

### Family History Research 适用场景

- 开始家族史研究项目
- 整理现有的家谱研究
- 寻找突破研究瓶颈的策略
- 记录家族故事和遗产

### 如何使用 Family History Research

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你的家族史研究目标
4. 获得结构化的研究计划和指导

---

## 常见问题

**Q: 它能直接访问家谱数据库吗？**

A: 它提供研究指导。实际数据库访问需要单独订阅。

**Q: 涵盖哪些时间段？**

A: 为跨越所有历史时期和地区的研究提供指导。

**Q: 能帮助处理非英语记录吗？**

A: 可以，它可以为研究各种语言和地区的记录提供指导。`,
    category: "communication",
    repository: "https://github.com/emaynard/claude-family-history-research-skill",
    author: "emaynard",
    tags: ["genealogy", "research", "history"],
  },
  {
    id: "meeting-insights",
    name: "Meeting Insights Analyzer",
    description: "Analyzes meeting transcripts to uncover behavioral patterns including conflict avoidance, speaking ratios, and leadership style.",
    descriptionZh: "分析会议记录以揭示行为模式，包括回避冲突、发言比例和领导风格。",
    content: `## What is Meeting Insights Analyzer?

Meeting Insights Analyzer examines meeting transcripts to uncover behavioral patterns, communication dynamics, and team interactions including speaking ratios and leadership styles.

### Meeting Insights Analyzer Key Capabilities

- **Behavioral Analysis**: Identify conflict avoidance and collaboration patterns
- **Speaking Ratios**: Measure participation balance across attendees
- **Leadership Insights**: Analyze leadership and decision-making styles
- **Team Dynamics**: Understand interaction patterns and communication flow

### Meeting Insights Analyzer Use Cases

- Improving meeting effectiveness and participation
- Leadership development and coaching
- Team dynamics assessment
- Communication pattern analysis

### How to Use Meeting Insights Analyzer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide meeting transcripts for analysis
4. Receive behavioral insights and recommendations

---

## FAQ

**Q: What transcript formats are supported?**

A: Plain text, VTT, SRT, and common meeting platform exports.

**Q: Is the analysis confidential?**

A: Analysis is performed locally. No data is shared externally.

**Q: Can it track patterns over multiple meetings?**

A: Yes, providing multiple transcripts enables trend analysis over time.`,
    contentZh: `## 什么是 Meeting Insights Analyzer？

Meeting Insights Analyzer 分析会议记录以揭示行为模式、沟通动态和团队互动，包括发言比例和领导风格。

### Meeting Insights Analyzer 核心能力

- **行为分析**：识别回避冲突和协作模式
- **发言比例**：衡量参与者之间的参与平衡
- **领导力洞察**：分析领导力和决策风格
- **团队动态**：理解互动模式和沟通流程

### Meeting Insights Analyzer 适用场景

- 提高会议效率和参与度
- 领导力发展和辅导
- 团队动态评估
- 沟通模式分析

### 如何使用 Meeting Insights Analyzer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供会议记录进行分析
4. 获得行为洞察和建议

---

## 常见问题

**Q: 支持哪些记录格式？**

A: 纯文本、VTT、SRT 和常见会议平台导出格式。

**Q: 分析是保密的吗？**

A: 分析在本地执行。不会与外部共享数据。

**Q: 能跟踪多次会议的模式吗？**

A: 可以，提供多个记录可以进行长期趋势分析。`,
    category: "communication",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/meeting-insights-analyzer",
    author: "ComposioHQ",
    tags: ["meetings", "analysis", "insights"],
  },
  {
    id: "notebooklm",
    name: "NotebookLM Integration",
    description: "Lets Claude Code chat directly with NotebookLM for source-grounded answers based exclusively on uploaded documents.",
    descriptionZh: "让 Claude Code 直接与 NotebookLM 对话，基于上传文档提供有据可依的回答。",
    content: `## What is NotebookLM Integration?

NotebookLM Integration enables Claude Code to chat directly with Google's NotebookLM, providing source-grounded answers based exclusively on your uploaded documents.

### NotebookLM Integration Key Capabilities

- **Direct Integration**: Connect Claude Code with NotebookLM seamlessly
- **Source Grounding**: Get answers backed by your uploaded documents
- **Document Context**: Leverage your specific knowledge base
- **Citation Support**: Receive answers with references to source material

### NotebookLM Integration Use Cases

- Researching within personal document collections
- Getting answers grounded in specific source materials
- Cross-referencing information across documents
- Building knowledge assistants from your own content

### How to Use NotebookLM Integration

1. Set up NotebookLM with your documents
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Query your documents through Claude Code

---

## FAQ

**Q: Do I need a NotebookLM account?**

A: Yes, you need access to Google's NotebookLM service.

**Q: What document types are supported?**

A: Depends on NotebookLM's supported formats - typically PDFs, Google Docs, and text files.

**Q: Can it access documents I haven't uploaded?**

A: No, answers are grounded only in documents you've uploaded to NotebookLM.`,
    contentZh: `## 什么是 NotebookLM Integration？

NotebookLM Integration 使 Claude Code 能够直接与 Google 的 NotebookLM 对话，基于你上传的文档提供有据可依的回答。

### NotebookLM Integration 核心能力

- **直接集成**：无缝连接 Claude Code 与 NotebookLM
- **来源依据**：获得由你上传的文档支持的答案
- **文档上下文**：利用你特定的知识库
- **引用支持**：获得带有源材料引用的答案

### NotebookLM Integration 适用场景

- 在个人文档集合中进行研究
- 获得基于特定源材料的答案
- 跨文档交叉引用信息
- 从你自己的内容构建知识助手

### 如何使用 NotebookLM Integration

1. 用你的文档设置 NotebookLM
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 通过 Claude Code 查询你的文档

---

## 常见问题

**Q: 需要 NotebookLM 账户吗？**

A: 需要，你需要访问 Google 的 NotebookLM 服务。

**Q: 支持哪些文档类型？**

A: 取决于 NotebookLM 支持的格式 - 通常是 PDF、Google Docs 和文本文件。

**Q: 能访问我没有上传的文档吗？**

A: 不能，答案仅基于你上传到 NotebookLM 的文档。`,
    category: "communication",
    repository: "https://github.com/PleasePrompto/notebooklm-skill",
    author: "PleasePrompto",
    tags: ["notebooklm", "research", "documents"],
  },

  // ==================== Creative & Media ====================
  {
    id: "canvas-design",
    name: "Canvas Design",
    description: "Creates beautiful visual art in PNG and PDF documents using design philosophy and aesthetic principles.",
    descriptionZh: "运用设计哲学与美学原则在 PNG 与 PDF 中创作精美视觉艺术。",
    content: `## What is Canvas Design?

Canvas Design creates beautiful visual art in PNG and PDF formats, applying design philosophy and aesthetic principles to generate professional graphics.

### Canvas Design Key Capabilities

- **Visual Creation**: Generate professional graphics and artwork
- **Design Principles**: Apply color theory, composition, and balance
- **Multiple Formats**: Export as PNG and PDF documents
- **Style Flexibility**: Adapt to various aesthetic styles

### Canvas Design Use Cases

- Creating social media graphics
- Designing presentation visuals
- Generating marketing materials
- Producing artistic illustrations

### How to Use Canvas Design

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe your visual design requirements
4. Receive professionally designed graphics

---

## FAQ

**Q: What resolution outputs are supported?**

A: Configurable resolutions suitable for web and print use.

**Q: Can it match brand guidelines?**

A: Yes, provide brand colors and styles for consistent output.

**Q: Does it create vector graphics?**

A: PDF output includes vector elements. Pure SVG export may require additional tools.`,
    contentZh: `## 什么是 Canvas Design？

Canvas Design 以 PNG 和 PDF 格式创作精美的视觉艺术，应用设计哲学和美学原则生成专业图形。

### Canvas Design 核心能力

- **视觉创作**：生成专业图形和艺术作品
- **设计原则**：应用色彩理论、构图和平衡
- **多种格式**：导出为 PNG 和 PDF 文档
- **风格灵活**：适应各种美学风格

### Canvas Design 适用场景

- 创建社交媒体图形
- 设计演示视觉效果
- 生成营销材料
- 制作艺术插图

### 如何使用 Canvas Design

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你的视觉设计需求
4. 获得专业设计的图形

---

## 常见问题

**Q: 支持什么分辨率输出？**

A: 可配置的分辨率，适用于网页和打印用途。

**Q: 能匹配品牌指南吗？**

A: 可以，提供品牌颜色和样式以获得一致的输出。

**Q: 能创建矢量图形吗？**

A: PDF 输出包含矢量元素。纯 SVG 导出可能需要额外工具。`,
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/canvas-design",
    author: "ComposioHQ",
    tags: ["design", "art", "visual"],
  },
  {
    id: "imagen",
    name: "Imagen",
    description: "Generate images using Google Gemini's image generation API for UI mockups, icons, illustrations, and visual assets.",
    descriptionZh: "使用 Google Gemini 图像生成 API 生成 UI 模型、图标、插画与视觉素材。",
    content: `## What is Imagen?

Imagen leverages Google Gemini's image generation API to create UI mockups, icons, illustrations, and visual assets for your projects.

### Imagen Key Capabilities

- **Image Generation**: Create images from text descriptions
- **UI Mockups**: Generate interface designs and wireframes
- **Icon Creation**: Produce custom icons and symbols
- **Illustrations**: Create visual assets for any purpose

### Imagen Use Cases

- Rapid UI/UX prototyping
- Creating placeholder images for development
- Generating custom icons and graphics
- Visual brainstorming and concept art

### How to Use Imagen

1. Set up Google Gemini API access
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Describe the images you need to generate

---

## FAQ

**Q: Do I need a Gemini API key?**

A: Yes, you need access to Google's Gemini API for image generation.

**Q: What image sizes are supported?**

A: Depends on Gemini API capabilities. Common sizes for web and mobile are supported.

**Q: Can I generate multiple variations?**

A: Yes, you can request multiple versions of the same concept.`,
    contentZh: `## 什么是 Imagen？

Imagen 利用 Google Gemini 的图像生成 API 为你的项目创建 UI 原型、图标、插图和视觉素材。

### Imagen 核心能力

- **图像生成**：从文字描述创建图像
- **UI 原型**：生成界面设计和线框图
- **图标创建**：制作自定义图标和符号
- **插图**：为任何目的创建视觉素材

### Imagen 适用场景

- 快速 UI/UX 原型设计
- 为开发创建占位图像
- 生成自定义图标和图形
- 视觉头脑风暴和概念艺术

### 如何使用 Imagen

1. 设置 Google Gemini API 访问
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 描述你需要生成的图像

---

## 常见问题

**Q: 需要 Gemini API 密钥吗？**

A: 需要，你需要访问 Google 的 Gemini API 进行图像生成。

**Q: 支持什么图像尺寸？**

A: 取决于 Gemini API 功能。支持网页和移动端的常见尺寸。

**Q: 可以生成多个变体吗？**

A: 可以，你可以请求同一概念的多个版本。`,
    category: "creative-media",
    repository: "https://github.com/sanjay3290/ai-skills/tree/main/skills/imagen",
    author: "sanjay3290",
    tags: ["images", "generation", "ai"],
  },
  {
    id: "image-enhancer",
    name: "Image Enhancer",
    description: "Improves image and screenshot quality by enhancing resolution, sharpness, and clarity for professional presentations.",
    descriptionZh: "通过提升分辨率、锐度与清晰度改善图片与截图质量，用于专业展示。",
    content: `## What is Image Enhancer?

Image Enhancer improves the quality of images and screenshots by enhancing resolution, sharpness, and clarity for professional presentations and publications.

### Image Enhancer Key Capabilities

- **Resolution Enhancement**: Upscale images without quality loss
- **Sharpness Improvement**: Enhance edge definition and clarity
- **Noise Reduction**: Clean up grainy or low-quality images
- **Color Correction**: Improve color balance and vibrancy

### Image Enhancer Use Cases

- Preparing screenshots for documentation
- Enhancing product images for marketing
- Improving presentation visuals
- Restoring old or low-quality photos

### How to Use Image Enhancer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide images to enhance
4. Receive improved quality versions

---

## FAQ

**Q: How much can resolution be increased?**

A: Typically 2-4x upscaling while maintaining quality. Extreme upscaling may introduce artifacts.

**Q: What image formats are supported?**

A: Common formats including PNG, JPEG, and WebP.

**Q: Does it work with screenshots?**

A: Yes, particularly effective for UI screenshots and text-heavy images.`,
    contentZh: `## 什么是 Image Enhancer？

Image Enhancer 通过增强分辨率、锐度和清晰度来改善图像和截图的质量，用于专业演示和出版。

### Image Enhancer 核心能力

- **分辨率增强**：在不损失质量的情况下放大图像
- **锐度提升**：增强边缘定义和清晰度
- **降噪**：清理颗粒状或低质量的图像
- **色彩校正**：改善色彩平衡和鲜艳度

### Image Enhancer 适用场景

- 为文档准备截图
- 增强产品图像用于营销
- 改善演示视觉效果
- 修复旧的或低质量的照片

### 如何使用 Image Enhancer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供要增强的图像
4. 获得改进质量的版本

---

## 常见问题

**Q: 分辨率可以提高多少？**

A: 通常在保持质量的同时可以放大 2-4 倍。极端放大可能会引入伪影。

**Q: 支持哪些图像格式？**

A: 常见格式，包括 PNG、JPEG 和 WebP。

**Q: 对截图有效吗？**

A: 有效，特别适用于 UI 截图和文字密集的图像。`,
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/image-enhancer",
    author: "ComposioHQ",
    tags: ["images", "enhancement", "quality"],
  },
  {
    id: "slack-gif-creator",
    name: "Slack GIF Creator",
    description: "Creates animated GIFs optimized for Slack with validators for size constraints and composable animation primitives.",
    descriptionZh: "创建适配 Slack 的动画 GIF，提供尺寸限制校验与可组合动画原语。",
    content: `## What is Slack GIF Creator?

Slack GIF Creator produces animated GIFs optimized for Slack, with built-in validators for size constraints and composable animation primitives for custom effects.

### Slack GIF Creator Key Capabilities

- **Slack Optimization**: Create GIFs within Slack's size limits
- **Size Validation**: Automatic checking against constraints
- **Animation Primitives**: Composable effects for custom animations
- **Preview Support**: Test GIFs before sharing

### Slack GIF Creator Use Cases

- Creating reaction GIFs for Slack
- Animated announcements and celebrations
- Visual demonstrations for team communication
- Fun and engaging team interactions

### How to Use Slack GIF Creator

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the animation you want to create
4. Receive optimized GIF ready for Slack

---

## FAQ

**Q: What is Slack's size limit for GIFs?**

A: Slack recommends GIFs under 2MB for best performance. The skill optimizes accordingly.

**Q: Can I create custom animations?**

A: Yes, using composable animation primitives for custom effects.

**Q: What frame rates are supported?**

A: Configurable frame rates balanced for quality and file size.`,
    contentZh: `## 什么是 Slack GIF Creator？

Slack GIF Creator 创建针对 Slack 优化的动画 GIF，内置尺寸约束验证器和可组合的动画原语用于自定义效果。

### Slack GIF Creator 核心能力

- **Slack 优化**：创建符合 Slack 大小限制的 GIF
- **尺寸验证**：自动检查约束
- **动画原语**：用于自定义动画的可组合效果
- **预览支持**：分享前测试 GIF

### Slack GIF Creator 适用场景

- 为 Slack 创建反应 GIF
- 动画公告和庆祝
- 团队沟通的视觉演示
- 有趣且引人入胜的团队互动

### 如何使用 Slack GIF Creator

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你想创建的动画
4. 获得为 Slack 优化的 GIF

---

## 常见问题

**Q: Slack 的 GIF 大小限制是多少？**

A: Slack 建议 GIF 小于 2MB 以获得最佳性能。该技能会相应优化。

**Q: 可以创建自定义动画吗？**

A: 可以，使用可组合的动画原语来实现自定义效果。

**Q: 支持什么帧率？**

A: 可配置的帧率，平衡质量和文件大小。`,
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/slack-gif-creator",
    author: "ComposioHQ",
    tags: ["gif", "slack", "animation"],
  },
  {
    id: "theme-factory",
    name: "Theme Factory",
    description: "Applies professional font and color themes to artifacts including slides, docs, reports, and HTML landing pages.",
    descriptionZh: "为作品应用专业字体与配色主题，涵盖幻灯片、文档、报告与 HTML 落地页。",
    content: `## What is Theme Factory?

Theme Factory applies professional font and color themes to various artifacts including slides, documents, reports, and HTML landing pages.

### Theme Factory Key Capabilities

- **Theme Application**: Apply consistent visual themes across materials
- **Font Management**: Professional typography selection and pairing
- **Color Schemes**: Coordinated color palettes for visual harmony
- **Multi-format Support**: Works with slides, docs, reports, and HTML

### Theme Factory Use Cases

- Creating cohesive presentation decks
- Styling reports and documents professionally
- Designing HTML landing pages with consistent themes
- Maintaining brand consistency across materials

### How to Use Theme Factory

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide content and theme preferences
4. Receive professionally themed output

---

## FAQ

**Q: Can I create custom themes?**

A: Yes, define custom color palettes and font combinations.

**Q: What pre-built themes are available?**

A: Includes modern, corporate, creative, and minimal theme options.

**Q: Does it work with existing brand guidelines?**

A: Yes, provide brand colors and fonts to create matching themes.`,
    contentZh: `## 什么是 Theme Factory？

Theme Factory 为各种作品应用专业的字体和颜色主题，包括幻灯片、文档、报告和 HTML 落地页。

### Theme Factory 核心能力

- **主题应用**：在材料间应用一致的视觉主题
- **字体管理**：专业的字体选择和搭配
- **配色方案**：协调的调色板以实现视觉和谐
- **多格式支持**：适用于幻灯片、文档、报告和 HTML

### Theme Factory 适用场景

- 创建统一的演示文稿
- 专业地美化报告和文档
- 设计具有一致主题的 HTML 落地页
- 在材料间保持品牌一致性

### 如何使用 Theme Factory

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供内容和主题偏好
4. 获得专业主题化的输出

---

## 常见问题

**Q: 可以创建自定义主题吗？**

A: 可以，定义自定义调色板和字体组合。

**Q: 有哪些预置主题？**

A: 包括现代、企业、创意和简约主题选项。

**Q: 能与现有品牌指南配合使用吗？**

A: 可以，提供品牌颜色和字体来创建匹配的主题。`,
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/theme-factory",
    author: "ComposioHQ",
    tags: ["themes", "design", "styling"],
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    description: "Downloads videos from YouTube and other platforms for offline viewing, editing, or archival.",
    descriptionZh: "从 YouTube 等平台下载视频，用于离线观看、编辑或归档。",
    content: `## What is Video Downloader?

Video Downloader enables downloading videos from YouTube and other platforms for offline viewing, editing, or archival purposes.

### Video Downloader Key Capabilities

- **Multi-platform Support**: Download from YouTube and other video sites
- **Quality Selection**: Choose resolution and format options
- **Audio Extraction**: Download audio-only versions
- **Batch Downloads**: Process multiple videos efficiently

### Video Downloader Use Cases

- Saving videos for offline viewing
- Extracting clips for video editing
- Archiving important video content
- Creating local video libraries

### How to Use Video Downloader

1. Ensure yt-dlp or similar tool is installed
2. Clone or download the skill from the GitHub repository
3. Add the skill files to your agent's configuration directory
4. Provide video URLs to download

---

## FAQ

**Q: Is this legal to use?**

A: Use only for personal, fair use purposes. Respect copyright and platform terms.

**Q: What platforms are supported?**

A: YouTube and many other platforms supported by yt-dlp.

**Q: Can it download private videos?**

A: Only videos you have access to. Authentication may be required for private content.`,
    contentZh: `## 什么是 Video Downloader？

Video Downloader 使你能够从 YouTube 和其他平台下载视频，用于离线观看、编辑或存档。

### Video Downloader 核心能力

- **多平台支持**：从 YouTube 和其他视频网站下载
- **质量选择**：选择分辨率和格式选项
- **音频提取**：下载纯音频版本
- **批量下载**：高效处理多个视频

### Video Downloader 适用场景

- 保存视频供离线观看
- 为视频编辑提取片段
- 存档重要视频内容
- 创建本地视频库

### 如何使用 Video Downloader

1. 确保已安装 yt-dlp 或类似工具
2. 从 GitHub 仓库克隆或下载该技能
3. 将技能文件添加到代理配置目录
4. 提供要下载的视频 URL

---

## 常见问题

**Q: 使用这个合法吗？**

A: 仅用于个人、合理使用目的。尊重版权和平台条款。

**Q: 支持哪些平台？**

A: YouTube 和 yt-dlp 支持的许多其他平台。

**Q: 能下载私人视频吗？**

A: 只能下载你有权访问的视频。私人内容可能需要身份验证。`,
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader",
    author: "ComposioHQ",
    tags: ["video", "download", "youtube"],
  },
  {
    id: "youtube-transcript",
    name: "YouTube Transcript",
    description: "Fetch transcripts from YouTube videos and prepare summaries.",
    descriptionZh: "获取 YouTube 视频字幕并生成摘要。",
    content: `## What is YouTube Transcript?

YouTube Transcript fetches transcripts from YouTube videos and prepares summaries, enabling text-based analysis of video content.

### YouTube Transcript Key Capabilities

- **Transcript Extraction**: Pull text transcripts from YouTube videos
- **Summary Generation**: Create concise summaries of video content
- **Multi-language Support**: Access transcripts in available languages
- **Timestamp Mapping**: Link text to video timestamps

### YouTube Transcript Use Cases

- Researching video content without watching
- Creating notes from educational videos
- Extracting quotes and references
- Accessibility and content repurposing

### How to Use YouTube Transcript

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide YouTube video URLs
4. Receive transcripts and summaries

---

## FAQ

**Q: Does it work with all YouTube videos?**

A: Only videos with available captions/transcripts (auto-generated or manual).

**Q: What about auto-generated captions?**

A: Yes, auto-generated captions are supported, though quality varies.

**Q: Can it handle multiple languages?**

A: Yes, if the video has transcripts in multiple languages available.`,
    contentZh: `## 什么是 YouTube Transcript？

YouTube Transcript 从 YouTube 视频中获取字幕并准备摘要，使你能够对视频内容进行基于文本的分析。

### YouTube Transcript 核心能力

- **字幕提取**：从 YouTube 视频中提取文字字幕
- **摘要生成**：创建视频内容的简洁摘要
- **多语言支持**：访问可用语言的字幕
- **时间戳映射**：将文本链接到视频时间戳

### YouTube Transcript 适用场景

- 不观看视频即可研究视频内容
- 从教育视频创建笔记
- 提取引用和参考
- 无障碍访问和内容再利用

### 如何使用 YouTube Transcript

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供 YouTube 视频 URL
4. 获得字幕和摘要

---

## 常见问题

**Q: 对所有 YouTube 视频都有效吗？**

A: 只对有可用字幕/字幕的视频有效（自动生成或手动添加）。

**Q: 自动生成的字幕怎么样？**

A: 支持，但质量可能有所不同。

**Q: 能处理多种语言吗？**

A: 可以，如果视频有多种语言的字幕可用。`,
    category: "creative-media",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/youtube-transcript",
    author: "michalparkola",
    tags: ["youtube", "transcript", "video"],
  },

  // ==================== Productivity & Organization ====================
  {
    id: "file-organizer",
    name: "File Organizer",
    description: "Intelligently organizes files and folders by understanding context, finding duplicates, and suggesting better structures.",
    descriptionZh: "通过理解上下文、查找重复项并建议更优结构来智能整理文件与文件夹。",
    content: `## What is File Organizer?

File Organizer intelligently organizes files and folders by understanding context, identifying duplicates, and suggesting optimal directory structures.

### File Organizer Key Capabilities

- **Context Analysis**: Understand file content and purpose
- **Duplicate Detection**: Find and handle duplicate files
- **Structure Suggestions**: Recommend better folder organization
- **Batch Processing**: Organize multiple files efficiently

### File Organizer Use Cases

- Cleaning up cluttered downloads folders
- Organizing project files systematically
- Archiving old files with proper structure
- Maintaining consistent folder conventions

### How to Use File Organizer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Specify directories to organize
4. Review and approve organization suggestions

---

## FAQ

**Q: Will it delete files automatically?**

A: No, it suggests changes and requires confirmation before moving or deleting.

**Q: How does it detect duplicates?**

A: Uses file hashes and content comparison, not just names.

**Q: Can it preserve folder structures?**

A: Yes, it can maintain existing structures while optimizing.`,
    contentZh: `## 什么是 File Organizer？

File Organizer 通过理解上下文、识别重复项和建议最佳目录结构来智能整理文件和文件夹。

### File Organizer 核心能力

- **上下文分析**：理解文件内容和用途
- **重复检测**：查找和处理重复文件
- **结构建议**：推荐更好的文件夹组织方式
- **批量处理**：高效整理多个文件

### File Organizer 适用场景

- 清理杂乱的下载文件夹
- 系统地整理项目文件
- 用正确的结构归档旧文件
- 保持一致的文件夹规范

### 如何使用 File Organizer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 指定要整理的目录
4. 审查并批准整理建议

---

## 常见问题

**Q: 会自动删除文件吗？**

A: 不会，它会建议更改并在移动或删除前需要确认。

**Q: 如何检测重复项？**

A: 使用文件哈希和内容比较，而不仅仅是名称。

**Q: 能保留文件夹结构吗？**

A: 可以，它可以在优化的同时保持现有结构。`,
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/file-organizer",
    author: "ComposioHQ",
    tags: ["files", "organization", "automation"],
  },
  {
    id: "invoice-organizer",
    name: "Invoice Organizer",
    description: "Automatically organizes invoices and receipts for tax preparation by reading files, extracting information, and renaming consistently.",
    descriptionZh: "通过读取文件、提取信息并统一命名来自动整理发票与收据以便报税。",
    content: `## What is Invoice Organizer?

Invoice Organizer automatically organizes invoices and receipts for tax preparation by extracting information, renaming files consistently, and categorizing expenses.

### Invoice Organizer Key Capabilities

- **Information Extraction**: Pull vendor, date, amount from invoices
- **Consistent Naming**: Rename files with standardized conventions
- **Categorization**: Organize by expense type and tax category
- **Summary Generation**: Create expense summaries for tax filing

### Invoice Organizer Use Cases

- Preparing documents for tax season
- Organizing business expense receipts
- Creating expense reports
- Maintaining financial records

### How to Use Invoice Organizer

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Point to your invoice/receipt folders
4. Receive organized, renamed, and categorized files

---

## FAQ

**Q: What file formats are supported?**

A: PDF invoices and image receipts (PNG, JPEG) are supported.

**Q: Does it integrate with accounting software?**

A: Generates organized files that can be imported into accounting systems.

**Q: How accurate is the data extraction?**

A: High accuracy for standard invoice formats. Manual review recommended for unusual formats.`,
    contentZh: `## 什么是 Invoice Organizer？

Invoice Organizer 通过提取信息、统一命名文件和分类支出来自动整理发票和收据以便报税。

### Invoice Organizer 核心能力

- **信息提取**：从发票中提取供应商、日期、金额
- **统一命名**：使用标准化约定重命名文件
- **分类**：按支出类型和税务类别整理
- **摘要生成**：为报税创建支出摘要

### Invoice Organizer 适用场景

- 为报税季准备文件
- 整理业务支出收据
- 创建费用报告
- 维护财务记录

### 如何使用 Invoice Organizer

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 指向你的发票/收据文件夹
4. 获得整理、重命名和分类的文件

---

## 常见问题

**Q: 支持哪些文件格式？**

A: 支持 PDF 发票和图像收据（PNG、JPEG）。

**Q: 能与会计软件集成吗？**

A: 生成可以导入会计系统的整理好的文件。

**Q: 数据提取有多准确？**

A: 对标准发票格式准确率高。不常见格式建议手动审查。`,
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/invoice-organizer",
    author: "ComposioHQ",
    tags: ["invoices", "tax", "organization"],
  },
  {
    id: "kaizen",
    name: "Kaizen",
    description: "Applies continuous improvement methodology with multiple analytical approaches, based on Japanese Kaizen philosophy.",
    descriptionZh: "基于日本 Kaizen 理念，使用多种分析方法实施持续改进。",
    content: `## What is Kaizen?

Kaizen applies the Japanese philosophy of continuous improvement with multiple analytical approaches to help you systematically improve processes and outcomes.

### Kaizen Key Capabilities

- **Continuous Improvement**: Incremental optimization methodology
- **Root Cause Analysis**: Identify underlying issues systematically
- **Process Mapping**: Visualize and improve workflows
- **Metrics Tracking**: Measure improvement over time

### Kaizen Use Cases

- Improving development workflows
- Optimizing business processes
- Personal productivity enhancement
- Team efficiency improvements

### How to Use Kaizen

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the process or area you want to improve
4. Follow the guided improvement methodology

---

## FAQ

**Q: What makes Kaizen different from other improvement methods?**

A: Focuses on small, continuous improvements rather than large transformations.

**Q: Can it work for personal productivity?**

A: Yes, Kaizen principles apply to personal as well as organizational improvement.

**Q: How long does it take to see results?**

A: Small improvements are immediate. Cumulative benefits grow over time.`,
    contentZh: `## 什么是 Kaizen？

Kaizen 应用日本持续改进哲学，使用多种分析方法帮助你系统地改进流程和成果。

### Kaizen 核心能力

- **持续改进**：增量优化方法论
- **根因分析**：系统地识别潜在问题
- **流程映射**：可视化和改进工作流
- **指标跟踪**：衡量随时间的改进

### Kaizen 适用场景

- 改进开发工作流
- 优化业务流程
- 个人生产力提升
- 团队效率改进

### 如何使用 Kaizen

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你想改进的流程或领域
4. 按照引导的改进方法论进行

---

## 常见问题

**Q: Kaizen 与其他改进方法有什么不同？**

A: 专注于小的、持续的改进，而不是大的转型。

**Q: 能用于个人生产力吗？**

A: 可以，Kaizen 原则适用于个人和组织改进。

**Q: 多久能看到效果？**

A: 小改进是立竿见影的。累积效益随时间增长。`,
    category: "productivity",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/kaizen/skills/kaizen",
    author: "NeoLabHQ",
    tags: ["improvement", "methodology", "lean"],
  },
  {
    id: "n8n-skills",
    name: "n8n Skills",
    description: "Enables AI assistants to directly understand and operate n8n workflows.",
    descriptionZh: "让 AI 助手直接理解并操作 n8n 工作流。",
    content: `## What is n8n Skills?

n8n Skills enables AI assistants to directly understand, create, and operate n8n automation workflows, bridging AI capabilities with workflow automation.

### n8n Skills Key Capabilities

- **Workflow Understanding**: Parse and comprehend n8n workflow structures
- **Workflow Creation**: Generate new n8n workflows from descriptions
- **Workflow Modification**: Edit and optimize existing workflows
- **Execution Support**: Help troubleshoot and debug workflows

### n8n Skills Use Cases

- Creating automation workflows through natural language
- Debugging problematic n8n workflows
- Optimizing existing automation processes
- Learning n8n through guided examples

### How to Use n8n Skills

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Describe the automation you want to create or modify
4. Receive n8n workflow configurations

---

## FAQ

**Q: Do I need n8n installed?**

A: Yes, n8n should be installed to execute the workflows created.

**Q: Which n8n nodes are supported?**

A: Supports common n8n nodes. Complex custom nodes may need manual configuration.

**Q: Can it connect to my n8n instance?**

A: It generates workflow JSON. Importing to your instance is a separate step.`,
    contentZh: `## 什么是 n8n Skills？

n8n Skills 使 AI 助手能够直接理解、创建和操作 n8n 自动化工作流，将 AI 能力与工作流自动化连接起来。

### n8n Skills 核心能力

- **工作流理解**：解析和理解 n8n 工作流结构
- **工作流创建**：从描述生成新的 n8n 工作流
- **工作流修改**：编辑和优化现有工作流
- **执行支持**：帮助排查和调试工作流

### n8n Skills 适用场景

- 通过自然语言创建自动化工作流
- 调试有问题的 n8n 工作流
- 优化现有自动化流程
- 通过引导示例学习 n8n

### 如何使用 n8n Skills

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 描述你想创建或修改的自动化
4. 获得 n8n 工作流配置

---

## 常见问题

**Q: 需要安装 n8n 吗？**

A: 需要，应该安装 n8n 来执行创建的工作流。

**Q: 支持哪些 n8n 节点？**

A: 支持常见的 n8n 节点。复杂的自定义节点可能需要手动配置。

**Q: 能连接到我的 n8n 实例吗？**

A: 它生成工作流 JSON。导入到你的实例是单独的步骤。`,
    category: "productivity",
    repository: "https://github.com/haunchen/n8n-skills",
    author: "haunchen",
    tags: ["n8n", "automation", "workflows"],
  },
  {
    id: "raffle-picker",
    name: "Raffle Winner Picker",
    description: "Randomly selects winners from lists, spreadsheets, or Google Sheets for giveaways with cryptographically secure randomness.",
    descriptionZh: "使用加密级随机从列表、表格或 Google Sheets 中抽取抽奖获奖者。",
    content: `## What is Raffle Winner Picker?

Raffle Winner Picker randomly selects winners from participant lists using cryptographically secure randomness, ensuring fair and verifiable giveaway results.

### Raffle Winner Picker Key Capabilities

- **Secure Randomness**: Cryptographically secure random selection
- **Multiple Sources**: Import from lists, CSV, or Google Sheets
- **Configurable Rules**: Set winner count, eligibility criteria
- **Audit Trail**: Generate verifiable selection records

### Raffle Winner Picker Use Cases

- Running social media giveaways
- Selecting contest winners fairly
- Random employee selection for activities
- Fair distribution of limited resources

### How to Use Raffle Winner Picker

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide participant list or spreadsheet
4. Receive randomly selected winners

---

## FAQ

**Q: How is randomness ensured?**

A: Uses cryptographically secure random number generation, not pseudo-random.

**Q: Can I exclude previous winners?**

A: Yes, provide exclusion lists to prevent repeat winners.

**Q: What proof of fairness is provided?**

A: Generates audit logs with timestamps and selection methodology.`,
    contentZh: `## 什么是 Raffle Winner Picker？

Raffle Winner Picker 使用加密安全的随机性从参与者列表中随机选择获奖者，确保公平且可验证的抽奖结果。

### Raffle Winner Picker 核心能力

- **安全随机**：加密安全的随机选择
- **多种来源**：从列表、CSV 或 Google Sheets 导入
- **可配置规则**：设置获奖者数量、资格标准
- **审计追踪**：生成可验证的选择记录

### Raffle Winner Picker 适用场景

- 进行社交媒体抽奖
- 公平地选择比赛获奖者
- 随机选择员工参加活动
- 公平分配有限资源

### 如何使用 Raffle Winner Picker

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供参与者列表或电子表格
4. 获得随机选择的获奖者

---

## 常见问题

**Q: 如何确保随机性？**

A: 使用加密安全的随机数生成，而不是伪随机。

**Q: 可以排除之前的获奖者吗？**

A: 可以，提供排除列表以防止重复获奖。

**Q: 提供什么公平性证明？**

A: 生成带有时间戳和选择方法的审计日志。`,
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/raffle-winner-picker",
    author: "ComposioHQ",
    tags: ["raffle", "random", "giveaway"],
  },
  {
    id: "resume-generator",
    name: "Tailored Resume Generator",
    description: "Analyzes job descriptions and generates tailored resumes that highlight relevant experience and skills.",
    descriptionZh: "分析岗位描述并生成量身定制的简历，突出相关经验与技能。",
    content: `## What is Tailored Resume Generator?

Tailored Resume Generator analyzes job descriptions and creates customized resumes that highlight your most relevant experience and skills for each application.

### Tailored Resume Generator Key Capabilities

- **Job Analysis**: Parse and understand job requirements
- **Content Tailoring**: Emphasize relevant experience for each role
- **Keyword Optimization**: Include important keywords from job postings
- **Format Flexibility**: Generate in multiple resume formats

### Tailored Resume Generator Use Cases

- Creating job-specific resumes
- Optimizing resumes for ATS systems
- Highlighting transferable skills
- Career pivot resume preparation

### How to Use Tailored Resume Generator

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide your experience and a job description
4. Receive a tailored resume optimized for the role

---

## FAQ

**Q: Does it help with ATS optimization?**

A: Yes, it includes relevant keywords to improve ATS compatibility.

**Q: What resume formats are supported?**

A: Generates content for various formats including traditional, modern, and functional.

**Q: Can it suggest missing skills to develop?**

A: Yes, it can identify gaps between your experience and job requirements.`,
    contentZh: `## 什么是 Tailored Resume Generator？

Tailored Resume Generator 分析职位描述并创建定制简历，为每次申请突出你最相关的经验和技能。

### Tailored Resume Generator 核心能力

- **职位分析**：解析和理解职位要求
- **内容定制**：为每个角色强调相关经验
- **关键词优化**：包含职位发布中的重要关键词
- **格式灵活**：生成多种简历格式

### Tailored Resume Generator 适用场景

- 创建针对特定职位的简历
- 为 ATS 系统优化简历
- 突出可转移技能
- 职业转型简历准备

### 如何使用 Tailored Resume Generator

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供你的经历和职位描述
4. 获得为该角色优化的定制简历

---

## 常见问题

**Q: 对 ATS 优化有帮助吗？**

A: 有，它包含相关关键词以提高 ATS 兼容性。

**Q: 支持哪些简历格式？**

A: 为各种格式生成内容，包括传统、现代和功能性格式。

**Q: 能建议需要发展的缺失技能吗？**

A: 可以，它可以识别你的经历与职位要求之间的差距。`,
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/tailored-resume-generator",
    author: "ComposioHQ",
    tags: ["resume", "job", "career"],
    featured: true,
  },
  {
    id: "ship-learn-next",
    name: "Ship Learn Next",
    description: "Skill to help iterate on what to build or learn next, based on feedback loops.",
    descriptionZh: "基于反馈循环帮助迭代下一步要构建或学习的内容。",
    content: `## What is Ship Learn Next?

Ship Learn Next helps you iterate on what to build or learn next by establishing feedback loops and analyzing outcomes from previous iterations.

### Ship Learn Next Key Capabilities

- **Feedback Analysis**: Evaluate outcomes from previous work
- **Priority Setting**: Determine what to focus on next
- **Learning Loops**: Establish iterative improvement cycles
- **Goal Alignment**: Keep efforts aligned with objectives

### Ship Learn Next Use Cases

- Planning next steps in personal projects
- Deciding what skills to develop
- Iterating on product features based on feedback
- Continuous learning path optimization

### How to Use Ship Learn Next

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Reflect on recent work or learning outcomes
4. Receive prioritized suggestions for next steps

---

## FAQ

**Q: How does it differ from task management?**

A: Focuses on learning and iteration cycles, not just task tracking.

**Q: Can it track progress over time?**

A: Yes, maintaining context across sessions helps track progress.

**Q: Does it work for teams or individuals?**

A: Designed for individual learning but principles apply to teams.`,
    contentZh: `## 什么是 Ship Learn Next？

Ship Learn Next 通过建立反馈循环和分析之前迭代的结果，帮助你迭代下一步要构建或学习的内容。

### Ship Learn Next 核心能力

- **反馈分析**：评估之前工作的结果
- **优先级设定**：确定下一步要关注什么
- **学习循环**：建立迭代改进周期
- **目标对齐**：使努力与目标保持一致

### Ship Learn Next 适用场景

- 规划个人项目的下一步
- 决定要发展哪些技能
- 根据反馈迭代产品功能
- 持续学习路径优化

### 如何使用 Ship Learn Next

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 反思最近的工作或学习成果
4. 获得下一步的优先级建议

---

## 常见问题

**Q: 这与任务管理有什么不同？**

A: 专注于学习和迭代循环，而不仅仅是任务跟踪。

**Q: 能跟踪一段时间内的进度吗？**

A: 可以，跨会话保持上下文有助于跟踪进度。

**Q: 适用于团队还是个人？**

A: 为个人学习设计，但原则也适用于团队。`,
    category: "productivity",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/ship-learn-next",
    author: "michalparkola",
    tags: ["learning", "iteration", "feedback"],
  },
  {
    id: "tapestry",
    name: "Tapestry",
    description: "Interlink and summarize related documents into knowledge networks.",
    descriptionZh: "将相关文档互相关联并总结为知识网络。",
    content: `## What is Tapestry?

Tapestry interlinks and summarizes related documents into knowledge networks, creating connected webs of information from disparate sources.

### Tapestry Key Capabilities

- **Document Linking**: Connect related documents automatically
- **Knowledge Graphs**: Build networks of related information
- **Summarization**: Create summaries across linked content
- **Pattern Discovery**: Identify themes and connections

### Tapestry Use Cases

- Building personal knowledge bases
- Research synthesis across multiple papers
- Connecting project documentation
- Creating navigable knowledge networks

### How to Use Tapestry

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide documents to analyze and connect
4. Receive interlinked knowledge networks

---

## FAQ

**Q: What document formats are supported?**

A: Markdown, plain text, and common document formats.

**Q: How are connections determined?**

A: Semantic analysis identifies topical relationships between documents.

**Q: Can it update existing networks?**

A: Yes, new documents can be added to existing knowledge networks.`,
    contentZh: `## 什么是 Tapestry？

Tapestry 将相关文档互相关联并总结为知识网络，从不同来源创建连接的信息网络。

### Tapestry 核心能力

- **文档链接**：自动连接相关文档
- **知识图谱**：构建相关信息网络
- **摘要生成**：跨链接内容创建摘要
- **模式发现**：识别主题和联系

### Tapestry 适用场景

- 构建个人知识库
- 跨多篇论文的研究综合
- 连接项目文档
- 创建可导航的知识网络

### 如何使用 Tapestry

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供要分析和连接的文档
4. 获得互相链接的知识网络

---

## 常见问题

**Q: 支持哪些文档格式？**

A: Markdown、纯文本和常见文档格式。

**Q: 如何确定连接？**

A: 语义分析识别文档之间的主题关系。

**Q: 能更新现有网络吗？**

A: 可以，可以向现有知识网络添加新文档。`,
    category: "productivity",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/tapestry",
    author: "michalparkola",
    tags: ["knowledge", "documents", "linking"],
  },

  // ==================== Collaboration & Project Management ====================
  {
    id: "git-pushing",
    name: "Git Pushing",
    description: "Automate git operations and repository interactions.",
    descriptionZh: "自动化 git 操作与仓库交互。",
    content: `## What is Git Pushing?

Git Pushing automates git operations and repository interactions, streamlining version control workflows and reducing manual command execution.

### Git Pushing Key Capabilities

- **Automated Commits**: Stage and commit changes with smart messages
- **Push Operations**: Push to remotes with proper configuration
- **Branch Management**: Create, switch, and manage branches
- **Conflict Handling**: Guide through merge conflict resolution

### Git Pushing Use Cases

- Streamlining development workflow
- Automating routine git operations
- Ensuring consistent commit practices
- Reducing git command errors

### How to Use Git Pushing

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Work on your code changes
4. Request git operations naturally

---

## FAQ

**Q: Does it handle authentication?**

A: Uses your existing git credentials and SSH keys.

**Q: Can it force push?**

A: Force push is avoided by default. Requires explicit confirmation.

**Q: What about protected branches?**

A: Respects branch protection rules and will notify when blocked.`,
    contentZh: `## 什么是 Git Pushing？

Git Pushing 自动化 git 操作和仓库交互，简化版本控制工作流并减少手动命令执行。

### Git Pushing 核心能力

- **自动提交**：用智能消息暂存和提交更改
- **推送操作**：用正确的配置推送到远程
- **分支管理**：创建、切换和管理分支
- **冲突处理**：指导解决合并冲突

### Git Pushing 适用场景

- 简化开发工作流
- 自动化常规 git 操作
- 确保一致的提交实践
- 减少 git 命令错误

### 如何使用 Git Pushing

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 处理你的代码更改
4. 自然地请求 git 操作

---

## 常见问题

**Q: 它处理身份验证吗？**

A: 使用你现有的 git 凭据和 SSH 密钥。

**Q: 能强制推送吗？**

A: 默认避免强制推送。需要明确确认。

**Q: 保护分支怎么办？**

A: 尊重分支保护规则，被阻止时会通知。`,
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/git-pushing",
    author: "mhattingpete",
    tags: ["git", "automation", "workflow"],
  },
  {
    id: "review-implementing",
    name: "Review Implementing",
    description: "Evaluate code implementation plans and align with specs.",
    descriptionZh: "评估代码实现计划并与规范对齐。",
    content: `## What is Review Implementing?

Review Implementing evaluates code implementation plans against specifications, ensuring alignment between design documents and actual code.

### Review Implementing Key Capabilities

- **Plan Evaluation**: Assess implementation plans against requirements
- **Spec Alignment**: Verify code matches design specifications
- **Gap Analysis**: Identify missing or divergent implementations
- **Recommendation Generation**: Suggest improvements for alignment

### Review Implementing Use Cases

- Pre-implementation plan review
- Code audit against specifications
- Ensuring design-code consistency
- Quality assurance checkpoints

### How to Use Review Implementing

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Provide implementation plans and specifications
4. Receive alignment analysis and recommendations

---

## FAQ

**Q: What specification formats are supported?**

A: Markdown specs, user stories, and structured requirements documents.

**Q: Can it review partial implementations?**

A: Yes, it can assess work-in-progress against plans.

**Q: Does it suggest code changes?**

A: Provides guidance on what needs to change, not direct code edits.`,
    contentZh: `## 什么是 Review Implementing？

Review Implementing 根据规范评估代码实现计划，确保设计文档与实际代码之间的一致性。

### Review Implementing 核心能力

- **计划评估**：根据需求评估实现计划
- **规范对齐**：验证代码是否符合设计规范
- **差距分析**：识别缺失或偏离的实现
- **建议生成**：建议改进以实现对齐

### Review Implementing 适用场景

- 实现前的计划审查
- 根据规范进行代码审计
- 确保设计与代码的一致性
- 质量保证检查点

### 如何使用 Review Implementing

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 提供实现计划和规范
4. 获得对齐分析和建议

---

## 常见问题

**Q: 支持哪些规范格式？**

A: Markdown 规范、用户故事和结构化需求文档。

**Q: 能审查部分实现吗？**

A: 可以，它可以根据计划评估进行中的工作。

**Q: 它会建议代码更改吗？**

A: 提供需要更改什么的指导，而不是直接的代码编辑。`,
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/review-implementing",
    author: "mhattingpete",
    tags: ["code-review", "planning", "specs"],
  },
  {
    id: "test-fixing",
    name: "Test Fixing",
    description: "Detect failing tests and propose patches or fixes.",
    descriptionZh: "检测失败测试并提出补丁或修复方案。",
    content: `## What is Test Fixing?

Test Fixing detects failing tests and proposes patches or fixes, helping developers quickly resolve test failures and maintain code quality.

### Test Fixing Key Capabilities

- **Failure Detection**: Identify failing tests and root causes
- **Fix Proposals**: Generate patches to resolve failures
- **Regression Analysis**: Determine if failures are new or existing
- **Coverage Impact**: Assess how fixes affect test coverage

### Test Fixing Use Cases

- Rapid test failure resolution
- CI/CD pipeline debugging
- Maintaining test suite health
- Pre-commit test verification

### How to Use Test Fixing

1. Clone or download the skill from the GitHub repository
2. Add the skill files to your agent's configuration directory
3. Run tests and provide failure output
4. Receive fix proposals and patches

---

## FAQ

**Q: What test frameworks are supported?**

A: Works with common frameworks like Jest, pytest, JUnit, and others.

**Q: Does it modify test files directly?**

A: Proposes changes for review. You control when to apply.

**Q: Can it distinguish test bugs from code bugs?**

A: Analyzes both possibilities and indicates likely cause.`,
    contentZh: `## 什么是 Test Fixing？

Test Fixing 检测失败的测试并提出补丁或修复方案，帮助开发人员快速解决测试失败并保持代码质量。

### Test Fixing 核心能力

- **失败检测**：识别失败的测试和根本原因
- **修复建议**：生成解决失败的补丁
- **回归分析**：确定失败是新的还是已存在的
- **覆盖率影响**：评估修复如何影响测试覆盖率

### Test Fixing 适用场景

- 快速解决测试失败
- CI/CD 流水线调试
- 维护测试套件健康
- 提交前测试验证

### 如何使用 Test Fixing

1. 从 GitHub 仓库克隆或下载该技能
2. 将技能文件添加到代理配置目录
3. 运行测试并提供失败输出
4. 获得修复建议和补丁

---

## 常见问题

**Q: 支持哪些测试框架？**

A: 适用于 Jest、pytest、JUnit 等常见框架。

**Q: 它会直接修改测试文件吗？**

A: 提出更改供审查。你控制何时应用。

**Q: 能区分测试 bug 和代码 bug 吗？**

A: 分析两种可能性并指出可能的原因。`,
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/test-fixing",
    author: "mhattingpete",
    tags: ["testing", "debugging", "fixes"],
  },

  // ==================== Security & Systems ====================

];

