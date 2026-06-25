ALTER TABLE "channels" ADD COLUMN "dm_key" VARCHAR(80);

CREATE UNIQUE INDEX "channels_dm_key_key" ON "channels"("dm_key");
