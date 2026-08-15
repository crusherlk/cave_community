CREATE TABLE `club_members` (
	`memberId` integer NOT NULL,
	`clubId` integer NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `club_members_pk` PRIMARY KEY(`clubId`, `memberId`),
	CONSTRAINT `fk_club_members_memberId_users_id_fk` FOREIGN KEY (`memberId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_club_members_clubId_clubs_id_fk` FOREIGN KEY (`clubId`) REFERENCES `clubs`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `clubs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`ownerId` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `fk_clubs_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `post_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`content` text NOT NULL,
	`postId` integer NOT NULL,
	`userId` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `fk_post_comments_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_post_comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `post_likes` (
	`postId` integer NOT NULL,
	`userId` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `post_likes_pk` PRIMARY KEY(`postId`, `userId`),
	CONSTRAINT `fk_post_likes_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_post_likes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`clubId` integer NOT NULL,
	`authorId` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `fk_posts_clubId_clubs_id_fk` FOREIGN KEY (`clubId`) REFERENCES `clubs`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_posts_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`token` text NOT NULL UNIQUE,
	`expiresAt` integer NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` text DEFAULT (current_timestamp) NOT NULL,
	`userId` integer NOT NULL,
	CONSTRAINT `fk_sessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_sessions`(`id`, `token`, `expiresAt`, `createdAt`, `updatedAt`, `userId`) SELECT `id`, `token`, `expiresAt`, `createdAt`, `updatedAt`, `userId` FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `sessions` (`userId`);--> statement-breakpoint
CREATE INDEX `club_member_memberId_idx` ON `club_members` (`memberId`);--> statement-breakpoint
CREATE INDEX `club_ownerId_idx` ON `clubs` (`ownerId`);--> statement-breakpoint
CREATE INDEX `postComment_postId_idx` ON `post_comments` (`postId`);--> statement-breakpoint
CREATE INDEX `postComment_userId_idx` ON `post_comments` (`userId`);--> statement-breakpoint
CREATE INDEX `postLike_userId_idx` ON `post_likes` (`userId`);--> statement-breakpoint
CREATE INDEX `post_clubId_idx` ON `posts` (`clubId`);--> statement-breakpoint
CREATE INDEX `post_authorId_idx` ON `posts` (`authorId`);