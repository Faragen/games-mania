import express from "express";
import path from "path";
import productsData from "../MOCK_DATA.json" assert { type: "json" };

const __dirname = path.resolve();
const DATA_PRODUCTS = productsData;
const serv = express();

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
serv.use(express.urlencoded());

serv.get("/api/products/", (req, res) => {
  if (!req.query) {
    //Get all the products
    return res.status(200).json(DATA_PRODUCTS);
  } else if (req.query.limit && req.query.lastProductsSize) {
    //Get limited numbers of products
    const responseDataProducts = [];
    for (let i = req.query.lastProductsSize; i < req.query.limit; i++) {
      responseDataProducts.push(DATA_PRODUCTS[i]);
    }
    res.status(200).json(responseDataProducts);
  } else if (req.query) {
    //Wrong request
    res.status(404).send("Wrong Request");
  }
});
serv.get("/api/products/:num/", (req, res) => {
  res.status(200).json(DATA_PRODUCTS[req.params.num]);
});

serv.use(function (req, res) {
  res.status(404).send("Wrong Request");
});

serv.listen(3000, () => console.log("Server has been started on port 3000..."));
