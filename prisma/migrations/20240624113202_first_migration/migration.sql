-- CreateTable
CREATE TABLE "Todolist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todolist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentList" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Todolist_slug_key" ON "Todolist"("slug");

-- CreateIndex
CREATE INDEX "Todolist_slug_idx" ON "Todolist"("slug");

-- AddForeignKey
ALTER TABLE "ContentList" ADD CONSTRAINT "ContentList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Todolist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
