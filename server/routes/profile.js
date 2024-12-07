import fs from "fs/promises";

export const profile = async (req, res) => {
	//server data
	const sessions = JSON.parse(
		await fs.readFile("./data/sessions.json", "utf-8")
	);
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));
	//request data
	const { username } = req.body;

	const sessionId = req.cookies.session;
	const userSession = sessions[sessionId];

	if (!userSession || userSession.username !== username) {
		return res.status(401).send("Invalid session");
	}

	const profile = {};
	for (const key in users[username]) {
		if (key === "password") {
			continue;
		}
		profile[key] = users[username][key];
	}

	res.status(200).json(profile);
};
