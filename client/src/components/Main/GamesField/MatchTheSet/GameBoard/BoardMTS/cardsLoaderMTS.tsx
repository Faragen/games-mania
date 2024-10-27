import { getMatchTheSet } from "../../../../../../store/fetchRequests/getGames";

const url = "http://localhost:3000";

export async function cardsLoaderMTS() {
	const cards = await getMatchTheSet(url);

	return cards;
}
