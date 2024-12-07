import fs from "fs/promises";

export const logout = async (req, res) => {
	try {
		//server data
		const sessions = JSON.parse(
			await fs.readFile("./data/sessions.json", "utf-8")
		);
		//request data
		const sessionId = req.cookies.session;
		//delete session
		delete sessions[sessionId];

		fs.writeFile("./data/sessions.json", JSON.stringify(sessions));
		res.clearCookie("session", {
			path: "/",
			httpOnly: true,
		});
		res.status(200).send("logout complete");
	} catch (err) {
		console.log(err instanceof Error ? err.message : "something went wrong");
		res.status(400).send("error");
	}
};
