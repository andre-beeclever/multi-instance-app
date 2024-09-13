/*
  Warnings:

  - You are about to drop the column `url` on the `App` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "clientSecret" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_App" ("clientId", "clientSecret") SELECT "clientId", "clientSecret" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
