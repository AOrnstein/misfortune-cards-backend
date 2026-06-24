DROP TABLE IF EXISTS users;

CREATE TABLE "card_categories" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "card_back_url" text NOT NULL,
  "card_size" text NOT NULL,
  "description" text NOT NULL
);

CREATE TABLE "card_compendiums" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "category" integer NOT NULL,
  "card_front_url" text NOT NULL,
  "content" json NOT NULL
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "password" text NOT NULL
);

CREATE TABLE "games" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "dm_id" integer NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "games_users" (
  "id" serial PRIMARY KEY,
  "game_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "is_dm" boolean NOT NULL
);

CREATE TABLE "decks" (
  "id" serial PRIMARY KEY,
  "game_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "card_id" integer NOT NULL
);

ALTER TABLE "card_compendiums" ADD FOREIGN KEY ("category") REFERENCES "card_categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games" ADD FOREIGN KEY ("dm_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games_users" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "games_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decks" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "decks" ADD FOREIGN KEY ("card_id") REFERENCES "card_compendiums" ("id") DEFERRABLE INITIALLY IMMEDIATE;

