/*
  Warnings:

  - A unique constraint covering the columns `[agent_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agent_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `publish` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `agent_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_agent_id_key` ON `Profile`(`agent_id`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
