/*
  Warnings:

  - Made the column `appId` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "appId" TEXT NOT NULL,
    CONSTRAINT "Shop_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("clientId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shop" ("appId", "name") SELECT "appId", "name" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
