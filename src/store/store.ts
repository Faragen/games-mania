import { getMatchTheSet } from "./fetchRequests/getGames";

export const url = "http://localhost:3000";

//Matching pairs
export type Card = {
	id: string;
	title: string;
	imageURL: string;
};

export const cards = await getMatchTheSet(url);

// if (!productsList[0]) {
// 	const initialProducts = await getProducts(url, 20, 0);
// 	console.log(initialProducts);

// 	initialProducts.forEach((product) => productsList.push(product));
// }
