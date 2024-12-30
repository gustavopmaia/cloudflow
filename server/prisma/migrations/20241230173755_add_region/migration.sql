-- AlterTable
ALTER TABLE "Environments" ADD COLUMN     "region" TEXT NOT NULL DEFAULT 'us-east-2',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
