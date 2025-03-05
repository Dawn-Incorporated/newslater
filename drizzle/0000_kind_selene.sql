-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "feeds" (
	"url" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar(255),
	"website" varchar(255),
	"category" varchar(255),
	"date_added" timestamp,
	"date_verified" timestamp
);
--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"image" text,
	"settings" jsonb DEFAULT '{"sendtime":"06:00:00","postlimit":"-1"}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "follow" (
	"user_id" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	CONSTRAINT "pk_follow" PRIMARY KEY("user_id","url")
);
--> statement-breakpoint
CREATE TABLE "auth_verification_token" (
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "auth_verification_token_user_id_token_pk" PRIMARY KEY("user_id","token")
);
--> statement-breakpoint
CREATE TABLE "auth_accounts" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "auth_accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_auth_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_user_id_auth_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_url_feeds_url_fk" FOREIGN KEY ("url") REFERENCES "public"."feeds"("url") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_auth_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_users"("user_id") ON DELETE cascade ON UPDATE no action;
*/