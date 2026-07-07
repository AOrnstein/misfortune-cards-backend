import { getGameUser } from "#db/queries/gamesUsers";

/** Checks if the logged-in user is a player in the specified game */
export default async function requireGameUser(req, res, next) {
    // Find the user's gameUser record for the specified game
    const gameUser = await getGameUser({ 
        gameId: req.game.id, 
        userId: req.user.id,
    });

    if (!gameUser) {
        return res.status(403).send("User is not a player in this game");
    }

    // Save the gameUser object in the request for later use
    req.gameUser = gameUser;
    next();
}