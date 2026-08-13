CREATE TABLE `sessions` (
	`id` text PRIMARY KEY,
	`expiresAt` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	`userId` integer NOT NULL,
	CONSTRAINT `fk_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `sessions` (`userId`);