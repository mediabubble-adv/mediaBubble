-- Task Manager v2: client link, threaded comments, activity, reactions

ALTER TABLE "tasks" ADD COLUMN "client_id" UUID;

ALTER TABLE "tasks" ADD CONSTRAINT "tasks_client_id_fkey"
  FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE INDEX "idx_tasks_client_id" ON "tasks"("client_id");
CREATE INDEX "idx_tasks_parent_task_id" ON "tasks"("parent_task_id");

INSERT INTO "clients" ("name", "status", "created_at", "updated_at")
SELECT 'MediaBubble Internal', 'active', NOW(), NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "clients" WHERE "name" = 'MediaBubble Internal'
);

UPDATE "tasks" SET "client_id" = (
  SELECT "id" FROM "clients" WHERE "name" = 'MediaBubble Internal' LIMIT 1
)
WHERE "parent_task_id" IS NULL AND "client_id" IS NULL;

UPDATE "tasks" AS child SET "client_id" = parent."client_id"
FROM "tasks" AS parent
WHERE child."parent_task_id" = parent."id" AND child."client_id" IS NULL;

ALTER TABLE "task_comments" ADD COLUMN "parent_id" UUID;

ALTER TABLE "task_comments" ADD CONSTRAINT "task_comments_parent_id_fkey"
  FOREIGN KEY ("parent_id") REFERENCES "task_comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE INDEX "idx_task_comments_parent_id" ON "task_comments"("parent_id");

CREATE TABLE "comment_attachments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "comment_id" UUID NOT NULL,
  "uploaded_by" UUID NOT NULL,
  "file_name" VARCHAR(255) NOT NULL,
  "file_url" TEXT NOT NULL,
  "file_size" INTEGER,
  "mime_type" VARCHAR(100),
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "comment_attachments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_comment_attachments_comment_id" ON "comment_attachments"("comment_id");

ALTER TABLE "comment_attachments" ADD CONSTRAINT "comment_attachments_comment_id_fkey"
  FOREIGN KEY ("comment_id") REFERENCES "task_comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "comment_attachments" ADD CONSTRAINT "comment_attachments_uploaded_by_fkey"
  FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "task_activity" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "task_id" UUID NOT NULL,
  "actor_id" UUID NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "payload" JSONB NOT NULL,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "task_activity_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_task_activity_task_created" ON "task_activity"("task_id", "created_at");

ALTER TABLE "task_activity" ADD CONSTRAINT "task_activity_task_id_fkey"
  FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "task_activity" ADD CONSTRAINT "task_activity_actor_id_fkey"
  FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "task_reactions" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "target_type" VARCHAR(20) NOT NULL,
  "target_id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "emoji" VARCHAR(20) NOT NULL,
  "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "task_reactions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_task_reactions_target_user" ON "task_reactions"("target_type", "target_id", "user_id");
CREATE INDEX "idx_task_reactions_target" ON "task_reactions"("target_type", "target_id");

ALTER TABLE "task_reactions" ADD CONSTRAINT "task_reactions_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
