import { sessions } from "./sessions.js";
import { users } from "./users.js";

export const profile = async (req, res) => {
	const { username } = req.body;
	const sessionId = req.cookies.session;
	const userSession = sessions[sessionId];

	if (!userSession || userSession.name !== username || userSession.userId) {
		return res.status(401).send("Invalid session");
	}

	res.send(users[username]);
};
