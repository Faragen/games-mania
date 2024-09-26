import { getMatchingPairs } from "./fetchRequests/getGames";

export const url = "http://localhost:3000";

//Matching pairs
export type Pair = {
	id: string;
	title: string;
	imageURL: string;
};

export const pairs = await getMatchingPairs(url);

// if (!productsList[0]) {
// 	const initialProducts = await getProducts(url, 20, 0);
// 	console.log(initialProducts);

// 	initialProducts.forEach((product) => productsList.push(product));
// }
