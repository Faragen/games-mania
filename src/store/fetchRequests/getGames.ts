import { Card } from "../store";

export async function getMatchTheSet(url: string): Promise<Card[]> {
	const apiGetMachTheSet = "/api/match-the-set/";
	try {
		const response = await fetch(url + apiGetMachTheSet);
		if (!response.ok) {
			throw new Error("Request is failed");
		}
		const data: Card[] = await response.json();
		return data;
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Got an error by trying to fetch Match the Set";
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
