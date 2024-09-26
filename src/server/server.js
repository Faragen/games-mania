import express from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

//helpers
const __dirname = path.resolve();
const serv = express();
const servURL = "http://localhost:3000/";

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
const matchTheSetPath = path.join(__dirname, "src/assets/match-the-set");

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
			};
		});

		res.status(200).json(images);
	} catch (error) {}
});
//=========================================================
//Get products
//=========================================================
// serv.get("/api/products/", (req, res) => {
// 	if (!req.query) {
// 		//Get all the products
// 		return res.status(200).json(DATA_PRODUCTS);
// 	} else if (req.query.limit && req.query.lastProductsSize) {
// 		//Get limited numbers of products
// 		const responseDataProducts = [];
// 		for (let i = req.query.lastProductsSize; i < req.query.limit; i++) {
// 			responseDataProducts.push(DATA_PRODUCTS[i]);
// 		}
// 		res.status(200).json(responseDataProducts);
// 	} else if (req.query) {
// 		//Wrong request
// 		res.status(404).send("Wrong Request");
// 	}
// });
// serv.get("/api/products/:num/", (req, res) => {
// 	res.status(200).json(DATA_PRODUCTS[req.params.num]);
// });

serv.use(function (req, res) {
	res.status(404).send("Wrong Request");
});

serv.listen(3000, () => console.log(`Server has been started on ${servURL}`));
