CREATE TABLE `skill_tags` (
	`skill_id` text NOT NULL,
	`tag` text NOT NULL,
	PRIMARY KEY(`skill_id`, `tag`),
	FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_skill_tags_tag` ON `skill_tags` (`tag`);--> statement-breakpoint
CREATE TABLE `skills` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE INDEX `idx_skills_category` ON `skills` (`category`);--> statement-breakpoint
CREATE INDEX `idx_skills_featured` ON `skills` (`featured`);--> statement-breakpoint
CREATE INDEX `idx_skills_official` ON `skills` (`official`);