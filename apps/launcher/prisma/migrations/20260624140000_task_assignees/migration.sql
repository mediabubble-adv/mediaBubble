CREATE TABLE "task_assignees" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "task_id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "assigned_by" UUID,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "task_assignees_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_task_assignees_task_user" ON "task_assignees"("task_id", "user_id");
CREATE INDEX "idx_task_assignees_user_id" ON "task_assignees"("user_id");
CREATE INDEX "idx_task_assignees_task_id" ON "task_assignees"("task_id");

ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_task_id_fkey"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_assigned_by_fkey"
  FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO "task_assignees" ("task_id", "user_id", "assigned_by", "created_at")
SELECT "id", "assigned_to", "created_by", NOW()
FROM "tasks"
WHERE "assigned_to" IS NOT NULL
  AND "deleted_at" IS NULL
ON CONFLICT DO NOTHING;
