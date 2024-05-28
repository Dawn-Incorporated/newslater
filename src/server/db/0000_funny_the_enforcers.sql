-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "feeds" (
	"url" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar(255),
	"website" varchar(255),
	"categorie" varchar(255) DEFAULT NULL::character varying
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"login" varchar(255) PRIMARY KEY NOT NULL,
	"password" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"mail" varchar(255) NOT NULL,
	"sendtime" time DEFAULT '06:00:00' NOT NULL,
	"postlimit" integer DEFAULT -1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "follow" (
	"login" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	CONSTRAINT "pk_follow" PRIMARY KEY("login","url")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "fk_follow_feed" FOREIGN KEY ("url") REFERENCES "public"."feeds"("url") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "follow" ADD CONSTRAINT "fk_follow_user" FOREIGN KEY ("login") REFERENCES "public"."users"("login") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/