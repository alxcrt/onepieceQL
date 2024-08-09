ALTER TABLE "devil_fruits" ALTER COLUMN "meaning" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "birthday" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "blood_type" text;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "origin" text;--> statement-breakpoint
ALTER TABLE "devil_fruits" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "devil_fruits" ADD COLUMN "image" text NOT NULL;