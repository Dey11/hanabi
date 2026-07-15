-- CreateEnum
CREATE TYPE "AssetTheme" AS ENUM ('DEFAULT', 'LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "sizes" TEXT,
ADD COLUMN     "theme" "AssetTheme" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "BrandColor" ADD COLUMN     "group" TEXT NOT NULL DEFAULT 'Core';

-- AlterTable
ALTER TABLE "BrandFont" ADD COLUMN     "bodySpecimen" TEXT;

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "author" TEXT,
    "role" TEXT,
    "body" TEXT NOT NULL,
    "rating" INTEGER,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimonial_clientId_createdAt_idx" ON "Testimonial"("clientId", "createdAt");

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
