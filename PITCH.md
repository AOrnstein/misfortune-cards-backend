# Elevator Pitch

- A D&D helper tool for DM's and players for the 'Deck Of Many Things'.
- Deck management system
- Gameplay tool (realtime)

## User Roles

- Vistor: not logged in, no user role.
- Spectator: TBD
- User: logged in, player OR DM role.
- Player: logged in, player role.
- DM: logged in, DM role
- Admin: logged in, super user.

## User Stories

As a <role> I can <capability>, so that <receive benefit>

- As a <Visitor> I can <register/login>,
- As a <Visitor> I can <browse the card pool>, so that I can <read the details of any card>

- As a <Spectator> I can <join a game I am invited to>, so that I can <view the game passively>

- As a <User> during a <game>, I can <draw a card from the deck>
- As a <User> during a <game>, I can <read the card details of revealed cards>
- As a <User> I can <read revealed card history in a game>

- As a <Player> I can <create my deck from cards in the card pool>
- As a <Player> I can <update my deck>
- As a <Player> I can <join a game I am invited to>, so that I can <play the game>

- As a <DM> I can <create a game>, so that I can <invite users to play>
- As a <DM> I can <update a player deck during a game with or without their knowledge>, so that I can <guide a narrative>
- As a <DM> I can <read cards face up while the player reads them face down>
- As a <DM> I can <intercept a player action to edit cards before they are revealed>, so that I can <influence the game in realtime>

- As an <Admin> I can <update the card pool>

## Database

## dbdiagram.io

Table card_categories {
id serial [primary key]
name text [not null]
card_back_url text [not null]
card_size text [not null]
description text [not null]
}

Table cards {
id serial [primary key]
name text [not null]
category integer [ref: > card_categories.id, not null]
card_front_url text [not null]
content json [not null]
}

/\*

- card content:
  description
  upright_meaning {person, creature_or_trap, place, treasure, situation}
  reverse_meaning {person, creature_or_trap, place, treasure, situation}
  \*/

Table users {
id serial [primary key]
username text [unique, not null]
password text [not null]

}

Table games {
id serial [primary key]
name text [not null]
dm_id integer [ref: > users.id, not null]
created_at timestamp [not null]
}

Table games_users {
id serial [primary key]
game_id integer [ref: > games.id, not null]
user_id integer [ref: > users.id, not null]
is_dm boolean [not null]

}

Table decks {
id serial [primary key]
game_id integer [ref: > games.id, not null]
user_id integer [ref: > users.id, not null]
card_id integer [ref: > cards.id, not null]

}

## Taking A Turn

Campaign: Series of sessions
Game: Save state  
Session: Live session

1. <Player> draws a card face down into the <card spread>
2. <DM> approves or swaps card while face down in <card spread>

### API Endpoints

- GET /cards

- GET /decks/:id
- POST /decks/:id
- PUT /decks/:id
- DELETE /decks/:id

### Components

- ## Table w/Card Spread
- Draw Card History
- Hand/Spread history
- Card Details
- Compendium
  - search bar
  - types/collections (stretch)
  - add/edit cards (stretch)
- Deck
- Login
- Register
- Game - invitations, active games, create game, delete game

### Components/API

- Welcome/Home

- Profile
  - GET /users/:id
  - GET /games

- Game - Player View
  - GET /decks/:id
  - GET /cards/:id

- Game - DM view
  - GET /cards
  - GET /cards/:id
  - GET /decks/:id
  - PUT /decks/:id

- Compendium
  - GET /cards
  - GET /decks/:id
  - (POST /cards/:id) <Admin> (stretch)
  - (DELETE /cards/:id) <Admin> (stretch)

- Card Details
  - GET /cards/:id

- Deck Builder
  - POST /decks/
  - GET /decks/:id
  - PUT /decks/:id
  - DELETE /decks/:id

# Stretch Goals

- Drawn card history
- 'hidden' column for decks table
- Add a spectator role
- Alternative card spreads (3 card, 5 card, 7 card, etc...)
- In game store and/or financial transactions
- Add different types of card decks. Card attributes table

# Project Management

- Jira
