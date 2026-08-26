ALTER TABLE `clubs` RENAME COLUMN `description` TO `shortDescription`;--> statement-breakpoint
ALTER TABLE `clubs` ADD `longDescription` text;