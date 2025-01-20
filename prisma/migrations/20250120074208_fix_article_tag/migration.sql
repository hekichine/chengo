-- DropForeignKey
ALTER TABLE `ArticleTag` DROP FOREIGN KEY `ArticleTag_article_id_fkey`;

-- DropIndex
DROP INDEX `ArticleTag_article_id_fkey` ON `ArticleTag`;

-- AlterTable
ALTER TABLE `ArticleTag` MODIFY `article_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ArticleTag` ADD CONSTRAINT `ArticleTag_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `Article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
