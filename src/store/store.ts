import { configureStore } from "@reduxjs/toolkit";
import { getMatchTheSet } from "./fetchRequests/getGames";
import { useDispatch, useSelector } from "react-redux";
import { optionMTSSlice } from "../modules/MatchTheSet/options/options.slice";

export const url = "http://localhost:3000";

//Match The Set
export type Card = {
	id: string;
	title: string;
	imageURL: string;
	isFlipped: boolean;
	disabled: boolean;
};

export const cards = await getMatchTheSet(url);

//Store
export const store = configureStore({
	reducer: {
		[optionMTSSlice.name]: optionMTSSlice.reducer,
	},
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
