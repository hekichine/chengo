-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `ArticleTag`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
