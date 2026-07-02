import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import gamesRouter from "#api/games";
import invitationsRouter from "#api/invitations";
import cardsRouter from "#api/cards";

import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import cors from "cors";
import morgan from "morgan";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

// Serve images
app.use("/images", express.static("data/images"));

// Routers
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/invitations", invitationsRouter);
app.use("/cards", cardsRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
