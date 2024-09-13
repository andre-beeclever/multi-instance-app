/*
  Warnings:

  - Made the column `name` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "clientSecret" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_App" ("clientId", "clientSecret", "name") SELECT "clientId", "clientSecret", "name" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
