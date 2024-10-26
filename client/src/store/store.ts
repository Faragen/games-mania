import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { optionMTSSlice } from "../modules/MatchTheSet/options/options.slice";
import { gameStatusSlice } from "../modules/MatchTheSet/gameStatus/gameStatus.slice";

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
