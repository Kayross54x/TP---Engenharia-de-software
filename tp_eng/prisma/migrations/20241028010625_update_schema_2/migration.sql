/*
  Warnings:

  - You are about to drop the column `processId` on the `UserProcess` table. All the data in the column will be lost.
  - Added the required column `processCode` to the `UserProcess` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "processCode" TEXT NOT NULL
);
INSERT INTO "new_UserProcess" ("id", "userId") SELECT "id", "userId" FROM "UserProcess";
DROP TABLE "UserProcess";
ALTER TABLE "new_UserProcess" RENAME TO "UserProcess";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
