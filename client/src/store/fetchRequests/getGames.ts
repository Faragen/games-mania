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
