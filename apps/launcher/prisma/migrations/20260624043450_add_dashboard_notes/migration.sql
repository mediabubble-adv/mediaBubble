-- CreateTable
CREATE TABLE "dashboard_notes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboard_notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_dashboard_notes_user_created" ON "dashboard_notes"("user_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "dashboard_notes" ADD CONSTRAINT "dashboard_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
