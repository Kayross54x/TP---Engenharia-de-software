-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "processCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movementCount" INTEGER NOT NULL,
    "searchDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "processId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Process_processCode_key" ON "Process"("processCode");
