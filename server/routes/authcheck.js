import fs from "fs/promises";

export const authcheck = async (req, res) => {
	const sessions = JSON.parse(
		await fs.readFile("./data/sessions.json", "utf-8")
	);
	const sessionId = req.cookies.session;
	const { username } = req.body;

	if (!sessionId) {
		return res.status(401).send("Not authenticated");
	} else if (sessions[sessionId].username !== username) {
		delete sessions[sessionId];
		await fs.writeFile("./data/sessions.json", JSON.stringify(sessions));
		res.clearCookie("session", {
			path: "/",
			httpOnly: true,
		});
		return res.status(401).send("Wrong session");
	} else {
		return res.status(200).send("authentication is ok");
	}
};
