import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export const login = async (req, res) => {
	//server data
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));
	const sessions = JSON.parse(
		await fs.readFile("./data/sessions.json", "utf-8")
	);
	//request data
	const { username, password } = req.body;
	let sessionId = req.cookies.session;

	//extract user
	const user = users[username];

	if (!user || user.password !== password) {
		return res.status(403).send("wrong username or password");
	}
	//if session already exists
	if (sessionId && sessions[sessionId].username !== username) {
		res.clearCookie("session", {
			path: "/",
			httpOnly: true,
		});
		return res.status(403).send("Invalid session");
	} else if (sessionId && sessions[sessionId].username === username) {
		return res.status(200).send("successful authentication 1");
	}

	//add new session
	sessionId = uuidv4();
	sessions[sessionId] = { username, userId: user.userId };
	await fs.writeFile("./data/sessions.json", JSON.stringify(sessions));

	//set cookie
	res.cookie("session", sessionId, { httpOnly: true });

	return res.status(200).send("successful authentication 2");
};
