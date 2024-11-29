import express from "express";
import path from "path";
import { matchTheSet } from "./routes/matchTheSet.js";
import { login } from "./routes/login.js";
import { logout } from "./routes/logout.js";
import cookieParser from "cookie-parser";
import { profile } from "./routes/profile.js";

//helpers
const serv = express();
const dirname = path.resolve();
const PORT = 3000;
export const servURL = `http://localhost:${PORT}/`;

//CORS allow
serv.use((req, res, next) => {
	res.set("Access-Control-Allow-Origin", "http://localhost:5173");
	res.set("Access-Control-Allow-Headers", "Content-Type");
	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.set("Access-Control-Allow-Credentials", "true");
	if (req.method === "OPTIONS") {
		// Preflighted requests in CORS
		return res.status(204).end();
	}
	next();
});

//json-requests (Content-Type: application/json)
// serv.use(express.json());

//forms-requests (Content-Type: application/x-www-form-urlencoded)
// serv.use(express.urlencoded({ extended: true }));

//check for wait-on
serv.get("/status", (req, res) => {
	res.status(200).send("Server is running!");
});

//Authentication
serv.post("/api/login", express.json(), login);
serv.get("/api/logout", cookieParser(), logout);

//Authorization
serv.post("/api/profile", cookieParser(), profile);

//=========================================================
//Get match the set
//=========================================================
export const matchTheSetPath = path.join(dirname, "./assets/match-the-set");

serv.use("/images/match-the-set", express.static(matchTheSetPath));

serv.get("/api/match-the-set/", matchTheSet);

serv.use(function (req, res) {
	res.status(404).send("Wrong Request");
});

serv.listen(PORT, () => console.log(`Server has been started on ${servURL}`));
