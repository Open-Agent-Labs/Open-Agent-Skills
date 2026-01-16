export type Category =
  | "document-processing"
  | "development"
  | "data-analysis"
  | "business-marketing"
  | "communication"
  | "creative-media"
  | "productivity"
  | "collaboration"
  | "security";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: Category;
  repository: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
  official?: boolean;
}

export const skills: Skill[] = [
  // ==================== Document Processing ====================
  {
    id: "docx",
    name: "DOCX",
    description: "Create, edit, analyze Word docs with tracked changes, comments, and formatting.",
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
    category: "development",
    repository: "https://github.com/zxkane/aws-skills",
    author: "zxkane",
    tags: ["aws", "cdk", "serverless"],
  },
  {
    id: "changelog-generator",
    name: "Changelog Generator",
    description: "Automatically creates user-facing changelogs from git commits by analyzing history and transforming technical commits into customer-friendly release notes.",
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator",
    author: "ComposioHQ",
    tags: ["git", "changelog", "automation"],
  },
  {
    id: "claude-code-terminal-title",
    name: "Claude Code Terminal Title",
    description: "Gives each Claude Code terminal window a dynamic title that describes the work being done.",
    category: "development",
    repository: "https://github.com/bluzername/claude-code-terminal-title",
    author: "bluzername",
    tags: ["terminal", "productivity", "claude-code"],
  },
  {
    id: "d3-visualization",
    name: "D3.js Visualization",
    description: "Teaches Claude to produce D3 charts and interactive data visualizations.",
    category: "development",
    repository: "https://github.com/chrisvoncsefalvay/claude-d3js-skill",
    author: "chrisvoncsefalvay",
    tags: ["d3", "visualization", "charts"],
  },
  {
    id: "ffuf-web-fuzzing",
    name: "FFUF Web Fuzzing",
    description: "Integrates the ffuf web fuzzer so Claude can run fuzzing tasks and analyze results for vulnerabilities.",
    category: "development",
    repository: "https://github.com/jthack/ffuf_claude_skill",
    author: "jthack",
    tags: ["security", "fuzzing", "testing"],
  },
  {
    id: "finishing-dev-branch",
    name: "Finishing Development Branch",
    description: "Guides completion of development work by presenting clear options and handling chosen workflow.",
    category: "development",
    repository: "https://github.com/obra/superpowers/tree/main/skills/finishing-a-development-branch",
    author: "obra",
    tags: ["git", "workflow", "development"],
  },
  {
    id: "ios-simulator",
    name: "iOS Simulator",
    description: "Enables Claude to interact with iOS Simulator for testing and debugging iOS applications.",
    category: "development",
    repository: "https://github.com/conorluddy/ios-simulator-skill",
    author: "conorluddy",
    tags: ["ios", "simulator", "mobile"],
  },
  {
    id: "langsmith-fetch",
    name: "LangSmith Fetch",
    description: "Debug LangChain and LangGraph agents by automatically fetching and analyzing execution traces from LangSmith Studio.",
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/langsmith-fetch",
    author: "OthmanAdi",
    tags: ["langchain", "debugging", "observability"],
  },
  {
    id: "mcp-builder",
    name: "MCP Builder",
    description: "Guides creation of high-quality MCP (Model Context Protocol) servers for integrating external APIs and services with LLMs.",
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
    category: "development",
    repository: "https://github.com/1NickPappas/move-code-quality-skill",
    author: "1NickPappas",
    tags: ["move", "blockchain", "quality"],
  },
  {
    id: "playwright-automation",
    name: "Playwright Browser Automation",
    description: "Model-invoked Playwright automation for testing and validating web applications.",
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
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/customaize-agent/skills/prompt-engineering",
    author: "NeoLabHQ",
    tags: ["prompts", "ai", "best-practices"],
  },
  {
    id: "pypict-testing",
    name: "PyPICT Testing",
    description: "Design comprehensive test cases using PICT (Pairwise Independent Combinatorial Testing) for requirements or code.",
    category: "development",
    repository: "https://github.com/omkamal/pypict-claude-skill",
    author: "omkamal",
    tags: ["testing", "pict", "quality"],
  },
  {
    id: "reddit-fetch",
    name: "Reddit Fetch",
    description: "Fetches Reddit content via Gemini CLI when WebFetch is blocked or returns 403 errors.",
    category: "development",
    repository: "https://github.com/ykdojo/claude-code-tips/tree/main/skills/reddit-fetch",
    author: "ykdojo",
    tags: ["reddit", "fetch", "api"],
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    description: "Provides guidance for creating effective Claude Skills that extend capabilities with specialized knowledge and workflows.",
    category: "development",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/skill-creator",
    author: "ComposioHQ",
    tags: ["skills", "meta", "creation"],
  },
  {
    id: "skill-seekers",
    name: "Skill Seekers",
    description: "Automatically converts any documentation website into a Claude AI skill in minutes.",
    category: "development",
    repository: "https://github.com/yusufkaraaslan/Skill_Seekers",
    author: "yusufkaraaslan",
    tags: ["documentation", "automation", "conversion"],
  },
  {
    id: "software-architecture",
    name: "Software Architecture",
    description: "Implements design patterns including Clean Architecture, SOLID principles, and comprehensive software design best practices.",
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/ddd/skills/software-architecture",
    author: "NeoLabHQ",
    tags: ["architecture", "design-patterns", "solid"],
  },
  {
    id: "subagent-development",
    name: "Subagent Driven Development",
    description: "Dispatches independent subagents for individual tasks with code review checkpoints between iterations.",
    category: "development",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/sadd/skills/subagent-driven-development",
    author: "NeoLabHQ",
    tags: ["agents", "development", "workflow"],
  },
  {
    id: "tdd",
    name: "Test Driven Development",
    description: "Use when implementing any feature or bugfix, before writing implementation code.",
    category: "development",
    repository: "https://github.com/obra/superpowers/tree/main/skills/test-driven-development",
    author: "obra",
    tags: ["tdd", "testing", "development"],
  },
  {
    id: "git-worktrees",
    name: "Using Git Worktrees",
    description: "Creates isolated git worktrees with smart directory selection and safety verification.",
    category: "development",
    repository: "https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/",
    author: "obra",
    tags: ["git", "worktrees", "workflow"],
  },
  {
    id: "connect-apps",
    name: "Connect Apps",
    description: "Connect Claude to any app. Send emails, create issues, post messages across Gmail, Slack, GitHub, Notion, and 1000+ services.",
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
    category: "data-analysis",
    repository: "https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill",
    author: "coffeefuelbump",
    tags: ["csv", "analysis", "visualization"],
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "Execute safe read-only SQL queries against PostgreSQL databases with multi-connection support and defense-in-depth security.",
    category: "data-analysis",
    repository: "https://github.com/sanjay3290/ai-skills/tree/main/skills/postgres",
    author: "sanjay3290",
    tags: ["postgres", "sql", "database"],
  },
  {
    id: "root-cause-tracing",
    name: "Root Cause Tracing",
    description: "Use when errors occur deep in execution and you need to trace back to find the original trigger.",
    category: "data-analysis",
    repository: "https://github.com/obra/superpowers/tree/main/skills/root-cause-tracing",
    author: "obra",
    tags: ["debugging", "analysis", "tracing"],
  },

  // ==================== Business & Marketing ====================
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    description: "Applies Anthropic's official brand colors and typography to artifacts for consistent visual identity.",
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/brand-guidelines",
    author: "ComposioHQ",
    tags: ["branding", "design", "identity"],
  },
  {
    id: "competitive-ads",
    name: "Competitive Ads Extractor",
    description: "Extracts and analyzes competitors' ads from ad libraries to understand messaging and creative approaches.",
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/competitive-ads-extractor",
    author: "ComposioHQ",
    tags: ["marketing", "ads", "competitive"],
  },
  {
    id: "domain-brainstormer",
    name: "Domain Name Brainstormer",
    description: "Generates creative domain name ideas and checks availability across multiple TLDs including .com, .io, .dev, and .ai.",
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/domain-name-brainstormer",
    author: "ComposioHQ",
    tags: ["domain", "naming", "startup"],
  },
  {
    id: "internal-comms",
    name: "Internal Comms",
    description: "Helps write internal communications including updates, company newsletters, FAQs, status reports, and project updates.",
    category: "business-marketing",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/internal-comms",
    author: "ComposioHQ",
    tags: ["communication", "writing", "business"],
  },
  {
    id: "lead-research",
    name: "Lead Research Assistant",
    description: "Identifies and qualifies high-quality leads by analyzing your product, searching for target companies, and providing outreach strategies.",
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
    category: "communication",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/article-extractor",
    author: "michalparkola",
    tags: ["web", "extraction", "articles"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    description: "Transform rough ideas into fully-formed designs through structured questioning and alternative exploration.",
    category: "communication",
    repository: "https://github.com/obra/superpowers/tree/main/skills/brainstorming",
    author: "obra",
    tags: ["ideation", "creativity", "design"],
  },
  {
    id: "content-research-writer",
    name: "Content Research Writer",
    description: "Assists in writing high-quality content by conducting research, adding citations, improving hooks, and providing feedback.",
    category: "communication",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/content-research-writer",
    author: "ComposioHQ",
    tags: ["writing", "research", "content"],
  },
  {
    id: "family-history",
    name: "Family History Research",
    description: "Provides assistance with planning family history and genealogy research projects.",
    category: "communication",
    repository: "https://github.com/emaynard/claude-family-history-research-skill",
    author: "emaynard",
    tags: ["genealogy", "research", "history"],
  },
  {
    id: "meeting-insights",
    name: "Meeting Insights Analyzer",
    description: "Analyzes meeting transcripts to uncover behavioral patterns including conflict avoidance, speaking ratios, and leadership style.",
    category: "communication",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/meeting-insights-analyzer",
    author: "ComposioHQ",
    tags: ["meetings", "analysis", "insights"],
  },
  {
    id: "notebooklm",
    name: "NotebookLM Integration",
    description: "Lets Claude Code chat directly with NotebookLM for source-grounded answers based exclusively on uploaded documents.",
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
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/canvas-design",
    author: "ComposioHQ",
    tags: ["design", "art", "visual"],
  },
  {
    id: "imagen",
    name: "Imagen",
    description: "Generate images using Google Gemini's image generation API for UI mockups, icons, illustrations, and visual assets.",
    category: "creative-media",
    repository: "https://github.com/sanjay3290/ai-skills/tree/main/skills/imagen",
    author: "sanjay3290",
    tags: ["images", "generation", "ai"],
  },
  {
    id: "image-enhancer",
    name: "Image Enhancer",
    description: "Improves image and screenshot quality by enhancing resolution, sharpness, and clarity for professional presentations.",
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/image-enhancer",
    author: "ComposioHQ",
    tags: ["images", "enhancement", "quality"],
  },
  {
    id: "slack-gif-creator",
    name: "Slack GIF Creator",
    description: "Creates animated GIFs optimized for Slack with validators for size constraints and composable animation primitives.",
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/slack-gif-creator",
    author: "ComposioHQ",
    tags: ["gif", "slack", "animation"],
  },
  {
    id: "theme-factory",
    name: "Theme Factory",
    description: "Applies professional font and color themes to artifacts including slides, docs, reports, and HTML landing pages.",
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/theme-factory",
    author: "ComposioHQ",
    tags: ["themes", "design", "styling"],
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    description: "Downloads videos from YouTube and other platforms for offline viewing, editing, or archival.",
    category: "creative-media",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/video-downloader",
    author: "ComposioHQ",
    tags: ["video", "download", "youtube"],
  },
  {
    id: "youtube-transcript",
    name: "YouTube Transcript",
    description: "Fetch transcripts from YouTube videos and prepare summaries.",
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
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/file-organizer",
    author: "ComposioHQ",
    tags: ["files", "organization", "automation"],
  },
  {
    id: "invoice-organizer",
    name: "Invoice Organizer",
    description: "Automatically organizes invoices and receipts for tax preparation by reading files, extracting information, and renaming consistently.",
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/invoice-organizer",
    author: "ComposioHQ",
    tags: ["invoices", "tax", "organization"],
  },
  {
    id: "kaizen",
    name: "Kaizen",
    description: "Applies continuous improvement methodology with multiple analytical approaches, based on Japanese Kaizen philosophy.",
    category: "productivity",
    repository: "https://github.com/NeoLabHQ/context-engineering-kit/tree/master/plugins/kaizen/skills/kaizen",
    author: "NeoLabHQ",
    tags: ["improvement", "methodology", "lean"],
  },
  {
    id: "n8n-skills",
    name: "n8n Skills",
    description: "Enables AI assistants to directly understand and operate n8n workflows.",
    category: "productivity",
    repository: "https://github.com/haunchen/n8n-skills",
    author: "haunchen",
    tags: ["n8n", "automation", "workflows"],
  },
  {
    id: "raffle-picker",
    name: "Raffle Winner Picker",
    description: "Randomly selects winners from lists, spreadsheets, or Google Sheets for giveaways with cryptographically secure randomness.",
    category: "productivity",
    repository: "https://github.com/ComposioHQ/awesome-claude-skills/tree/master/raffle-winner-picker",
    author: "ComposioHQ",
    tags: ["raffle", "random", "giveaway"],
  },
  {
    id: "resume-generator",
    name: "Tailored Resume Generator",
    description: "Analyzes job descriptions and generates tailored resumes that highlight relevant experience and skills.",
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
    category: "productivity",
    repository: "https://github.com/michalparkola/tapestry-skills-for-claude-code/tree/main/ship-learn-next",
    author: "michalparkola",
    tags: ["learning", "iteration", "feedback"],
  },
  {
    id: "tapestry",
    name: "Tapestry",
    description: "Interlink and summarize related documents into knowledge networks.",
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
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/git-pushing",
    author: "mhattingpete",
    tags: ["git", "automation", "workflow"],
  },
  {
    id: "review-implementing",
    name: "Review Implementing",
    description: "Evaluate code implementation plans and align with specs.",
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/review-implementing",
    author: "mhattingpete",
    tags: ["code-review", "planning", "specs"],
  },
  {
    id: "test-fixing",
    name: "Test Fixing",
    description: "Detect failing tests and propose patches or fixes.",
    category: "collaboration",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/test-fixing",
    author: "mhattingpete",
    tags: ["testing", "debugging", "fixes"],
  },

  // ==================== Security & Systems ====================
  {
    id: "computer-forensics",
    name: "Computer Forensics",
    description: "Digital forensics analysis and investigation techniques.",
    category: "security",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/computer-forensics-skills/skills/computer-forensics",
    author: "mhattingpete",
    tags: ["forensics", "security", "investigation"],
  },
  {
    id: "file-deletion",
    name: "Secure File Deletion",
    description: "Secure file deletion and data sanitization methods.",
    category: "security",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/computer-forensics-skills/skills/file-deletion",
    author: "mhattingpete",
    tags: ["security", "deletion", "privacy"],
  },
  {
    id: "metadata-extraction",
    name: "Metadata Extraction",
    description: "Extract and analyze file metadata for forensic purposes.",
    category: "security",
    repository: "https://github.com/mhattingpete/claude-skills-marketplace/tree/main/computer-forensics-skills/skills/metadata-extraction",
    author: "mhattingpete",
    tags: ["metadata", "forensics", "analysis"],
  },
  {
    id: "threat-hunting",
    name: "Threat Hunting with Sigma",
    description: "Use Sigma detection rules to hunt for threats and analyze security events.",
    category: "security",
    repository: "https://github.com/jthack/threat-hunting-with-sigma-rules-skill",
    author: "jthack",
    tags: ["security", "sigma", "threat-hunting"],
  },
];

// Helper functions
export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByCategory(category: Category): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getFeaturedSkills(): Skill[] {
  return skills.filter((skill) => skill.featured);
}

export function getOfficialSkills(): Skill[] {
  return skills.filter((skill) => skill.official);
}

export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase();
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery) ||
      skill.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedSkills(skillId: string, limit = 3): Skill[] {
  const skill = getSkillById(skillId);
  if (!skill) return [];
  
  return skills
    .filter((s) => s.id !== skillId && s.category === skill.category)
    .slice(0, limit);
}
