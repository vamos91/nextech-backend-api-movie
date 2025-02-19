-- AlterTable
ALTER TABLE `movies` MODIFY `desc` TEXT NULL;

-- AlterTable
ALTER TABLE `playlist` MODIFY `title` TEXT NULL;

-- CreateTable
CREATE TABLE `movies_has_playlist` (
    `movies_id` INTEGER NOT NULL,
    `playlist_id` INTEGER NOT NULL,

    INDEX `fk_movies_has_playlist_movies1_idx`(`movies_id`),
    INDEX `fk_movies_has_playlist_playlist1_idx`(`playlist_id`),
    PRIMARY KEY (`movies_id`, `playlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movies_has_playlist` ADD CONSTRAINT `fk_movies_has_playlist_movies1` FOREIGN KEY (`movies_id`) REFERENCES `movies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `movies_has_playlist` ADD CONSTRAINT `fk_movies_has_playlist_playlist1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
