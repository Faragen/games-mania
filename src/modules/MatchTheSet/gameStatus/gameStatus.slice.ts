import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState =
	| "won"
	| "notStarted"
	| "fieldIsSetUp"
	| "started"
	| "cancelledHelper"
	| "cancelled"
	| "timerFailedHelper"
	| "timerFailed";

export type GameStatus = {
	gameState: GameState;
	progress: {
		opened: number;
		all: number;
	};
};

const gameInitialStatus: GameStatus = {
	gameState: "notStarted",
	progress: {
		opened: 0,
		all: 0,
	},
};

export const gameStatusSlice = createSlice({
	name: "MatchTheSet/gameStatus",
	initialState: gameInitialStatus,
	selectors: {
		selectGameStatus: (state) => state,
	},
	reducers: {
		changeStatus: (state, action: PayloadAction<GameStatus>) => {
			state.gameState = action.payload.gameState;
			state.progress = action.payload.progress;
		},
		changeStatusHelper: (state, action: PayloadAction<GameState>) => {
			state.gameState = action.payload;
		},
	},
});
