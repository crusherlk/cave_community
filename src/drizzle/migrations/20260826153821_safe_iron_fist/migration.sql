PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_clubs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`shortDescription` text NOT NULL,
	`longDescription` text NOT NULL,
	`ownerId` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `fk_clubs_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_clubs`(`id`, `name`, `shortDescription`, `longDescription`, `ownerId`, `createdAt`, `updatedAt`) SELECT `id`, `name`, `shortDescription`, `longDescription`, `ownerId`, `createdAt`, `updatedAt` FROM `clubs`;--> statement-breakpoint
DROP TABLE `clubs`;--> statement-breakpoint
ALTER TABLE `__new_clubs` RENAME TO `clubs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `club_ownerId_idx` ON `clubs` (`ownerId`);