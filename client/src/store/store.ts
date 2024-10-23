import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { getMatchTheSet } from "./fetchRequests/getGames";
import { useDispatch, useSelector } from "react-redux";
import { optionMTSSlice } from "../modules/MatchTheSet/options/options.slice";
import { gameStatusSlice } from "../modules/MatchTheSet/gameStatus/gameStatus.slice";

export const url = "http://localhost:3000";

//Match The Set
export type Card = {
	id: string;
	title: string;
	imageURL: string;
	isFlipped: boolean;
	disabled: boolean;
	wrong: boolean;
	right: boolean;
};

export const cards = await getMatchTheSet(url);

//Slices
const rootReducer = combineSlices({
	"MatchTheSet/gameStatus": gameStatusSlice.reducer,
	"MatchTheSet/options": optionMTSSlice.reducer,
});

//Store
export const store = configureStore({
	reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
