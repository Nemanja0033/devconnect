/*
  Warnings:

  - You are about to drop the `_ImageToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ImageToPost" DROP CONSTRAINT "_ImageToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToPost" DROP CONSTRAINT "_ImageToPost_B_fkey";

-- DropTable
DROP TABLE "_ImageToPost";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
