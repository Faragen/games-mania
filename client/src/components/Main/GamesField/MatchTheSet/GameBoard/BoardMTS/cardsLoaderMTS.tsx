import { getMatchTheSet } from "../../../../../../store/fetchRequests/getGames";

export const URL = "http://localhost:3000";

export async function cardsLoaderMTS() {
	const cards = await getMatchTheSet(URL);

	return cards;
}
