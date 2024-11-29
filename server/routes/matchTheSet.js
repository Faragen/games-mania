import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { servURL, matchTheSetPath } from "../server.js";

export const matchTheSet = async (req, res) => {
	try {
		const files = await fs.promises.readdir(matchTheSetPath);
		const images = files.map((file) => {
			const extname = path.extname(file);
			return {
				id: uuidv4(),
				title: path.basename(file, extname).split("-").join(" "),
				imageURL: `${servURL}images/match-the-set/${file}`,
				isFlipped: false,
				disabled: true,
				wrong: false,
				right: false,
			};
		});

		res.status(200).json(images);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Reading files failed :(";
		console.log(message);
	}
};
