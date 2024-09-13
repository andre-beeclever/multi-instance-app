-- CreateTable
CREATE TABLE "AppVariable" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    PRIMARY KEY ("key", "value"),
    CONSTRAINT "AppVariable_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("clientId") ON DELETE RESTRICT ON UPDATE CASCADE
);
