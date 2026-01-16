import type { Category } from "./skills";

export interface CategoryConfig {
  id: Category;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh: string;
}

export const categories: CategoryConfig[] = [
  {
    id: "development",
    name: "Development",
    nameZh: "开发工具",
    icon: "🛠️",
    description: "Code tools, testing, and development workflows",
    descriptionZh: "代码工具、测试和开发工作流",
  },
  {
    id: "document-processing",
    name: "Document Processing",
    nameZh: "文档处理",
    icon: "📄",
    description: "Create, edit, and analyze documents",
    descriptionZh: "创建、编辑和分析文档",
  },
  {
    id: "productivity",
    name: "Productivity",
    nameZh: "效率工具",
    icon: "📊",
    description: "Organization and automation tools",
    descriptionZh: "组织和自动化工具",
  },
  {
    id: "creative-media",
    name: "Creative & Media",
    nameZh: "创意与媒体",
    icon: "🎨",
    description: "Design, images, and video tools",
    descriptionZh: "设计、图像和视频工具",
  },
  {
    id: "communication",
    name: "Communication",
    nameZh: "沟通写作",
    icon: "✍️",
    description: "Writing, research, and content creation",
    descriptionZh: "写作、研究和内容创作",
  },
  {
    id: "business-marketing",
    name: "Business",
    nameZh: "商业营销",
    icon: "💼",
    description: "Marketing, branding, and business tools",
    descriptionZh: "营销、品牌和商务工具",
  },
  {
    id: "data-analysis",
    name: "Data & Analysis",
    nameZh: "数据分析",
    icon: "📈",
    description: "Data processing and analysis tools",
    descriptionZh: "数据处理和分析工具",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    nameZh: "协作管理",
    icon: "👥",
    description: "Team collaboration and project management",
    descriptionZh: "团队协作和项目管理",
  },
  {
    id: "security",
    name: "Security",
    nameZh: "安全系统",
    icon: "🔒",
    description: "Security, forensics, and system tools",
    descriptionZh: "安全、取证和系统工具",
  },
];

export function getCategoryById(id: Category): CategoryConfig | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoryName(id: Category, locale: string): string {
  const category = getCategoryById(id);
  if (!category) return id;
  return locale === "zh" ? category.nameZh : category.name;
}
