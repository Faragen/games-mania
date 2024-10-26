import { getMatchTheSet } from "../../../../../../store/fetchRequests/getGames";

const url = "http://localhost:3000";
export const cards = await getMatchTheSet(url);
