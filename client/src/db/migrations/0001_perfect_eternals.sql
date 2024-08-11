DROP INDEX IF EXISTS "name_search_index";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_search_index" ON "characters" USING gin ((
        setweight(to_tsvector('english', "name"), 'A') ||
        setweight(to_tsvector('english', "origin"), 'B') ||
        setweight(to_tsvector('english', "birthday"), 'C') ||
        setweight(to_tsvector('english', "description"), 'D') ||
        setweight(to_tsvector('english', "blood_type"), 'D')
      ));