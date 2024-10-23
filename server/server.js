import express from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

//helpers
const serv = express();
const __dirname = path.resolve();
const PORT = 3000;
const servURL = `http://localhost:${PORT}/`;

//CORS allow
serv.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "http://localhost:5173");
	res.set("Access-Control-Allow-Headers", "*");
	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.set("Access-Control-Allow-Credentials", "true");
	next();
});

//json-requests (Content-Type: application/json)
serv.use(express.json());

//forms-requests (Content-Type: application/x-www-form-urlencoded)
serv.use(express.urlencoded({ extended: true }));

//=========================================================
//Get match the set
//=========================================================
const matchTheSetPath = path.join(__dirname, "/assets/match-the-set");

serv.use("/images/match-the-set", express.static(matchTheSetPath));

serv.get("/api/match-the-set/", async (req, res) => {
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
			error instanceof Error ? error.message : "Reading files is failed :(";
		console.log(message);
	}
});

serv.use(function (req, res) {
	res.status(404).send("Wrong Request");
});

serv.listen(PORT, () => console.log(`Server has been started on ${servURL}`));
