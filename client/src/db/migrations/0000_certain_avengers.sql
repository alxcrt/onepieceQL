DO $$ BEGIN
 CREATE TYPE "public"."sub_type" AS ENUM('Ancient', 'Mythical', 'Artificial');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('Paramecia', 'Zoan', 'Logia');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"origin" text,
	"name" text NOT NULL,
	"birthday" text,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"blood_type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_to_devil_fruits" (
	"character_id" integer,
	"devil_fruit_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devil_fruit_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"sub_type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devil_fruits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"meaning" text,
	"description" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devil_fruits_to_devil_fruit_types" (
	"devil_fruit_id" integer,
	"devil_fruit_type_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_to_devil_fruits" ADD CONSTRAINT "characters_to_devil_fruits_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_to_devil_fruits" ADD CONSTRAINT "characters_to_devil_fruits_devil_fruit_id_devil_fruits_id_fk" FOREIGN KEY ("devil_fruit_id") REFERENCES "public"."devil_fruits"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devil_fruits_to_devil_fruit_types" ADD CONSTRAINT "devil_fruits_to_devil_fruit_types_devil_fruit_id_devil_fruits_id_fk" FOREIGN KEY ("devil_fruit_id") REFERENCES "public"."devil_fruits"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "devil_fruits_to_devil_fruit_types" ADD CONSTRAINT "devil_fruits_to_devil_fruit_types_devil_fruit_type_id_devil_fruit_types_id_fk" FOREIGN KEY ("devil_fruit_type_id") REFERENCES "public"."devil_fruit_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "characters" USING gin ((
        setweight(to_tsvector('simple', "name"), 'A') ||
        setweight(to_tsvector('simple', "origin"), 'B') ||
        setweight(to_tsvector('simple', "birthday"), 'C') ||
        setweight(to_tsvector('simple', "description"), 'D') ||
        setweight(to_tsvector('simple', "blood_type"), 'D')
      ));