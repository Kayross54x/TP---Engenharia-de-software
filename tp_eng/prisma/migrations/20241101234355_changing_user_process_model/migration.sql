-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserProcess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "processCode" TEXT NOT NULL,
    "favouritedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserProcess" ("id", "processCode", "userId") SELECT "id", "processCode", "userId" FROM "UserProcess";
DROP TABLE "UserProcess";
ALTER TABLE "new_UserProcess" RENAME TO "UserProcess";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
