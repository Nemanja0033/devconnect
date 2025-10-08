/*
  Warnings:

  - You are about to drop the `_ImageToPostDraft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ImageToProjectDraft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_id_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToPostDraft" DROP CONSTRAINT "_ImageToPostDraft_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToPostDraft" DROP CONSTRAINT "_ImageToPostDraft_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProject" DROP CONSTRAINT "_ImageToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProject" DROP CONSTRAINT "_ImageToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProjectDraft" DROP CONSTRAINT "_ImageToProjectDraft_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProjectDraft" DROP CONSTRAINT "_ImageToProjectDraft_B_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "postDraftId" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "projectDraftId" TEXT,
ADD COLUMN     "projectId" TEXT;

-- DropTable
DROP TABLE "_ImageToPostDraft";

-- DropTable
DROP TABLE "_ImageToProject";

-- DropTable
DROP TABLE "_ImageToProjectDraft";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_Post_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_PostDraft_fkey" FOREIGN KEY ("postDraftId") REFERENCES "PostDraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_Project_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_ProjectDraft_fkey" FOREIGN KEY ("projectDraftId") REFERENCES "ProjectDraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
