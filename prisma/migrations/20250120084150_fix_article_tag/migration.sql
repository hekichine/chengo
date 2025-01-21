/*
  Warnings:

  - You are about to drop the column `article_id` on the `ArticleTag` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArticleTag` DROP FOREIGN KEY `ArticleTag_article_id_fkey`;

-- DropIndex
DROP INDEX `ArticleTag_article_id_fkey` ON `ArticleTag`;

-- AlterTable
ALTER TABLE `Article` ADD COLUMN `tag_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ArticleTag` DROP COLUMN `article_id`;
