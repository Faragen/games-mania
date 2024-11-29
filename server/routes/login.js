import { sessions } from "./sessions.js";
import { users } from "./users.js";
import { v4 as uuidv4 } from "uuid";

export const login = async (req, res) => {
	const { username, password } = req.body;

	const user = users[username];

	if (!user || user.password !== password) {
		return res.status(403).send("wrong username or password");
	}

	const sessionId = uuidv4();
	sessions[sessionId] = { username, userId: user.userId };

	res.cookie("session", sessionId, { httpOnly: true });

	return res.status(200).send("successful authentication");
};
