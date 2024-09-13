/*
  Warnings:

  - Made the column `id` on table `App` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_App" ("clientId", "clientSecret", "id", "name") SELECT "clientId", "clientSecret", "id", "name" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
CREATE UNIQUE INDEX "App_id_key" ON "App"("id");
CREATE UNIQUE INDEX "App_clientId_key" ON "App"("clientId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
