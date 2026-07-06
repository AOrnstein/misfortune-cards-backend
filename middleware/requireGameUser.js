import { getGameUser } from "#db/queries/gamesUsers";

/** Checks if the logged-in user is a player in the specified game */
export default async function requireGameUser(req, res, next) {
    const { id: gameId } = req.params;
    const userId = req.user.id;

    const gameUser = await getGameUser({ gameId, userId });
    if (!gameUser) {
        return res.status(403).send("User is not a player in this game");
    }
    next();
}