import fs from "fs/promises";

export const changePassword = async (req, res) => {
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));
	const { username, currentPassword, newPassword } = req.body;

	if (currentPassword !== users[username].password) {
		return res.status(400).send("Wrong current password");
	}

	users[username].password = newPassword;
	await fs.writeFile("./data/users.json", JSON.stringify(users));
	res.status(200).send("Password has been changed");
};
