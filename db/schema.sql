DROP TABLE IF EXISTS invitations;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS games_users;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS card_categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE card_categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  card_back_url text NOT NULL,
  card_size text NOT NULL,
  description text NOT NULL
);

CREATE TABLE cards (
  id serial PRIMARY KEY,
  name text NOT NULL,
  category_id integer NOT NULL REFERENCES card_categories(id) ON DELETE CASCADE,
  card_front_url text NOT NULL,
  content json NOT NULL
);

CREATE TABLE games (
  id serial PRIMARY KEY,
  name text NOT NULL,
  dm_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW(),
  invite_code UUID NOT NULL DEFAULT gen_random_uuid()
);

CREATE TABLE games_users (
  id serial PRIMARY KEY,
  game_id integer NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_dm boolean NOT NULL
);

CREATE TABLE decks (
  id serial PRIMARY KEY,
  game_id integer NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id integer NOT NULL REFERENCES cards(id) ON DELETE CASCADE
);


