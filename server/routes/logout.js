import { sessions } from "./sessions.js";

export const logout = async (req, res) => {
	try {
		const sessionId = req.cookies.session;
		delete sessions[sessionId];
		res.clearCookie("sessions", {
			path: "/",
			httpOnly: true,
		});
		res.status(200).send("logout complete");
	} catch (err) {
		console.log(err instanceof Error ? err.message : "something went wrong");
		res.status(400).send("error");
	}
};
