import fs from "fs/promises";

export const changeUserInfo = async (req, res) => {
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));
	const { user, newUser } = req.body;

	if (users[newUser.username] && user.username !== newUser.username) {
		res.status(400).send("This username is already taken");
		return;
	}

	if (user.username !== newUser.username) {
		users[newUser.username] = {
			...user,
			password: users[user.username].password,
		};
		delete users[user.username];
	}

	for (const key in newUser) {
		users[newUser.username][key] = newUser[key];
	}
	await fs.writeFile("./data/users.json", JSON.stringify(users));
	res.status(200).send("new user data has been saved");
};
