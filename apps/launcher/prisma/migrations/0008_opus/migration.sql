-- OPUS foundation tables: briefs, triggers, metrics, usage metering.

CREATE TABLE "opus_briefs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID,
    "client_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "goal" VARCHAR(50) NOT NULL DEFAULT 'leads',
    "audience" TEXT,
    "budget" DECIMAL(12,2),
    "currency" VARCHAR(10) DEFAULT 'EGP',
    "channels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "key_messages" JSONB,
    "platforms" JSONB,
    "status" VARCHAR(50) DEFAULT 'draft',
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opus_briefs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "opus_briefs_campaign_id_key" ON "opus_briefs"("campaign_id");
CREATE INDEX "idx_opus_briefs_client_id" ON "opus_briefs"("client_id");
CREATE INDEX "idx_opus_briefs_status" ON "opus_briefs"("status");
CREATE INDEX "idx_opus_briefs_created_by" ON "opus_briefs"("created_by");

ALTER TABLE "opus_briefs" ADD CONSTRAINT "opus_briefs_campaign_id_fkey"
  FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "opus_briefs" ADD CONSTRAINT "opus_briefs_client_id_fkey"
  FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "opus_briefs" ADD CONSTRAINT "opus_briefs_created_by_fkey"
  FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "opus_triggers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "schedule" VARCHAR(100),
    "condition" JSONB,
    "action" VARCHAR(100) NOT NULL,
    "created_by" UUID NOT NULL,
    "last_run_at" TIMESTAMP(6),
    "execution_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opus_triggers_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "opus_triggers_slug_key" ON "opus_triggers"("slug");
CREATE INDEX "idx_opus_triggers_enabled" ON "opus_triggers"("enabled");
CREATE INDEX "idx_opus_triggers_type" ON "opus_triggers"("type");

ALTER TABLE "opus_triggers" ADD CONSTRAINT "opus_triggers_created_by_fkey"
  FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "opus_trigger_runs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "trigger_id" UUID NOT NULL,
    "status" VARCHAR(50) DEFAULT 'Running',
    "steps_total" INTEGER,
    "steps_done" INTEGER,
    "output" JSONB,
    "error_message" TEXT,
    "started_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMP(6),
    "triggered_by" UUID,

    CONSTRAINT "opus_trigger_runs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_opus_trigger_runs_trigger_id" ON "opus_trigger_runs"("trigger_id");
CREATE INDEX "idx_opus_trigger_runs_status" ON "opus_trigger_runs"("status");
CREATE INDEX "idx_opus_trigger_runs_started_at" ON "opus_trigger_runs"("started_at");

ALTER TABLE "opus_trigger_runs" ADD CONSTRAINT "opus_trigger_runs_trigger_id_fkey"
  FOREIGN KEY ("trigger_id") REFERENCES "opus_triggers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "opus_trigger_runs" ADD CONSTRAINT "opus_trigger_runs_triggered_by_fkey"
  FOREIGN KEY ("triggered_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

CREATE TABLE "opus_campaign_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_id" UUID NOT NULL,
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "impressions" INTEGER DEFAULT 0,
    "clicks" INTEGER DEFAULT 0,
    "conversions" INTEGER DEFAULT 0,
    "spend" DECIMAL(12,2) DEFAULT 0,
    "meta_metrics" JSONB,
    "google_metrics" JSONB,
    "roas" DECIMAL(8,2),
    "recorded_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opus_campaign_metrics_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_opus_campaign_metrics_campaign_id" ON "opus_campaign_metrics"("campaign_id");
CREATE INDEX "idx_opus_campaign_metrics_period_start" ON "opus_campaign_metrics"("period_start");

ALTER TABLE "opus_campaign_metrics" ADD CONSTRAINT "opus_campaign_metrics_campaign_id_fkey"
  FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE "opus_usage_periods" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "period_start" DATE NOT NULL,
    "period_end" DATE NOT NULL,
    "plan" VARCHAR(50) DEFAULT 'starter',
    "ai_generations" INTEGER DEFAULT 0,
    "campaigns_launched" INTEGER DEFAULT 0,
    "api_calls" INTEGER DEFAULT 0,
    "optimizations" INTEGER DEFAULT 0,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opus_usage_periods_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_opus_usage_periods_period_start" ON "opus_usage_periods"("period_start");
