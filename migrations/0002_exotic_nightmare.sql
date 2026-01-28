PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_skills` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`description_zh` text,
	`content` text,
	`content_zh` text,
	`category` text NOT NULL,
	`repository` text NOT NULL,
	`author` text,
	`featured` integer DEFAULT 0 NOT NULL,
	`official` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_skills`("id", "slug", "name", "description", "description_zh", "content", "content_zh", "category", "repository", "author", "featured", "official", "created_at", "updated_at") SELECT "id", "slug", "name", "description", "description_zh", "content", "content_zh", "category", "repository", "author", "featured", "official", "created_at", "updated_at" FROM `skills`;--> statement-breakpoint
DROP TABLE `skills`;--> statement-breakpoint
ALTER TABLE `__new_skills` RENAME TO `skills`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `skills_slug_unique` ON `skills` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_skills_category` ON `skills` (`category`);--> statement-breakpoint
CREATE INDEX `idx_skills_featured` ON `skills` (`featured`);--> statement-breakpoint
CREATE INDEX `idx_skills_official` ON `skills` (`official`);--> statement-breakpoint
CREATE INDEX `idx_skills_slug` ON `skills` (`slug`);