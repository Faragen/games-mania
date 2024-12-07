import fs from "fs/promises";

export const registration = async (req, res) => {
	const users = JSON.parse(await fs.readFile("./data/users.json", "utf-8"));
	const { email, username, password } = req.body;
	if (users[username]) {
		return res.status(403).send("This username is already taken");
	}
	users.count += 1;
	users[username] = {
		email,
		username,
		password,
		userId: users.count,
		userAvatar: "http://localhost:3000/images/users-avatars/0.webp",
	};
	await fs.writeFile("./data/users.json", JSON.stringify(users));
	return res.status(201).send("New user has registered");
};
