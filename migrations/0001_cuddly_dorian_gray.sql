-- Step 1: Add slug column as nullable first
ALTER TABLE `skills` ADD `slug` text;--> statement-breakpoint

-- Step 2: Generate slug values for existing records (based on name)
UPDATE `skills` SET `slug` = lower(replace(replace(replace(replace(replace(
  name, ' ', '-'), '/', '-'), '\', '-'), '_', '-'), '.', '-'
)) WHERE `slug` IS NULL;--> statement-breakpoint

-- Step 3: Create unique index (will fail if duplicates exist)
CREATE UNIQUE INDEX `skills_slug_unique` ON `skills` (`slug`);--> statement-breakpoint

-- Step 4: Create regular index for performance
CREATE INDEX `idx_skills_slug` ON `skills` (`slug`);