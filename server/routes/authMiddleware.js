import fs from "fs/promises";

export const authMiddleware = async (req, res, next) => {
	const sessions = JSON.parse(
		await fs.readFile("./data/sessions.json", "utf-8")
	);
	const sessionId = req.cookies.session;

	if (!sessions[sessionId]) {
		return res.status(401).send("Not authenticated");
	} else {
		next();
	}
};
