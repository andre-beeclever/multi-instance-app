-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AppVariable" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    PRIMARY KEY ("key", "value"),
    CONSTRAINT "AppVariable_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AppVariable" ("appId", "key", "value") SELECT "appId", "key", "value" FROM "AppVariable";
DROP TABLE "AppVariable";
ALTER TABLE "new_AppVariable" RENAME TO "AppVariable";
CREATE TABLE "new_Shop" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "appId" TEXT NOT NULL,
    CONSTRAINT "Shop_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shop" ("appId", "name") SELECT "appId", "name" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
