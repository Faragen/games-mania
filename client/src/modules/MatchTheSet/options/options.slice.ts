import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FieldSize = {
	rows: number;
	columns: number;
	fieldSize: number;
};

type SetSize = 2 | 3 | 4 | 5 | 6;

type Option = {
	setSize: SetSize;
	fieldSizes: FieldSize[];
};

export type PlayOption = {
	setSize: SetSize;
	fieldSize: FieldSize;
};

const possibleFieldSizes: FieldSize[] = [
	{ rows: 6, columns: 7, fieldSize: 42 },
	{ rows: 6, columns: 6, fieldSize: 36 },
	{ rows: 5, columns: 7, fieldSize: 35 },
	{ rows: 5, columns: 6, fieldSize: 30 },
	{ rows: 5, columns: 5, fieldSize: 25 },
	{ rows: 4, columns: 6, fieldSize: 24 },
	{ rows: 4, columns: 5, fieldSize: 20 },
	{ rows: 4, columns: 4, fieldSize: 16 },
	{ rows: 3, columns: 4, fieldSize: 12 },
	{ rows: 3, columns: 3, fieldSize: 9 },
];

export const optionsMTS: Option[] = [];

for (let i = 2; i <= 6; i++) {
	optionsMTS.push({ setSize: i as SetSize, fieldSizes: [] });
	possibleFieldSizes.forEach((elem) => {
		if (elem.fieldSize && elem.fieldSize % i === 0) {
			optionsMTS[i - 2].fieldSizes.push(elem);
		}
	});
}

const initialOptionState: PlayOption = {
	setSize: 2,
	fieldSize: {
		rows: 0,
		columns: 0,
		fieldSize: 0,
	},
};

export const optionMTSSlice = createSlice({
	name: "MatchTheSet/options",
	initialState: initialOptionState,
	selectors: {
		selectPlayOption: (state) => state,
	},
	reducers: {
		getOptions: (state, action: PayloadAction<PlayOption>) => {
			state.setSize = action.payload.setSize;
			state.fieldSize = { ...action.payload.fieldSize };
		},
	},
});
