-- Skills main table
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  description_zh TEXT,
  content TEXT,
  content_zh TEXT,
  category TEXT NOT NULL,
  repository TEXT NOT NULL,
  author TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  official INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Skill tags table (many-to-many)
CREATE TABLE IF NOT EXISTS skill_tags (
  skill_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  PRIMARY KEY (skill_id, tag),
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(featured);
CREATE INDEX IF NOT EXISTS idx_skills_official ON skills(official);
CREATE INDEX IF NOT EXISTS idx_skill_tags_tag ON skill_tags(tag);
