-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('CLASSIC', 'PROJECT');

-- AlterTable
ALTER TABLE "PostDraft" ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'CLASSIC';

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "liveUrl" TEXT,
    "issues" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDraft" (
    "type" "PostType" NOT NULL DEFAULT 'PROJECT',
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "liveUrl" TEXT,
    "issues" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ImageToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ImageToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ImageToProjectDraft" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ImageToProjectDraft_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ImageToProject_B_index" ON "_ImageToProject"("B");

-- CreateIndex
CREATE INDEX "_ImageToProjectDraft_B_index" ON "_ImageToProjectDraft"("B");

-- AddForeignKey
ALTER TABLE "ProjectDraft" ADD CONSTRAINT "ProjectDraft_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProject" ADD CONSTRAINT "_ImageToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProject" ADD CONSTRAINT "_ImageToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProjectDraft" ADD CONSTRAINT "_ImageToProjectDraft_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProjectDraft" ADD CONSTRAINT "_ImageToProjectDraft_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
