import { Pair } from "../store";

export async function getMatchingPairs(url: string): Promise<Pair[]> {
	const apiMachingPairs = "/api/matching-pairs/";
	try {
		const response = await fetch(url + apiMachingPairs);
		if (!response.ok) {
			throw new Error("Request is failed");
		}
		const data: Pair[] = await response.json();
		return data;
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Got an error by trying to fetch Matching Pairs";
		console.log(message);
		return [];
	}
}

// export async function getProducts(
//   url: string,
//   limit: number,
//   lastProductSize: number
// ): Promise<Product[]> {
//   try {
//     const response = await fetch(
//       url +
//         `/api/products?limit=${limit}` +
//         `&lastProductsSize=${lastProductSize}`
//     );

//     if (!response.ok) {
//       throw new Error(`ERROR! status:${response.status}`);
//     }

//     const data: Product[] = await response.json();
//     return data;
//   } catch (error) {
//     const errorMsg =
//       error instanceof Error ? error.message : "It's an error...";
//     console.log(errorMsg);
//     return [];
//   }
// }
