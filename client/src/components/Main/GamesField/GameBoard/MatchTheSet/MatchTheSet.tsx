import s from "./MatchTheSet.module.scss";
import {
	cards,
	useAppDispatch,
	useAppSelector,
} from "../../../../../store/store";
import { Card } from "../../../../../store/store";
import GameCard from "./GameCard/GameCard";
import { useCallback, useEffect, useState } from "react";
import { optionMTSSlice } from "../../../../../modules/MatchTheSet/options/options.slice";
import { gameStatusSlice } from "../../../../../modules/MatchTheSet/gameStatus/gameStatus.slice";
import { createPortal } from "react-dom";
import { ResultInfo } from "./ResultInfo/ResultInfo";

export type CurrentSet = {
	id: string;
	title: string;
};

function sortTheSets(
	cards: Card[],
	setSize: number,
	fieldSize: number
): Card[] {
	try {
		if (fieldSize % setSize !== 0) {
			throw new Error(
				"The Field Size must be divisible by the Set Size without remainder"
			);
		}
		const arrOfIndexes = [];

		const arrContainer = Array.from({ length: cards.length }, (_, i) => i++);
		const setCollection: Record<string, number[]> = {};

		for (let i = 1; i <= setSize; i++) {
			setCollection["set" + i] = [];
		}

		for (let i = 1; i <= fieldSize / setSize; i++) {
			setCollection.set1.push(
				arrContainer.splice(Math.random() * arrContainer.length, 1)[0]
			);
		}

		for (const key in setCollection) {
			if (key !== "set1") {
				setCollection[key] = [...setCollection.set1];
			}
		}

		for (let i = 1; i <= fieldSize / setSize; i++) {
			for (const key in setCollection) {
				arrOfIndexes.push(
					setCollection[key].splice(
						Math.random() * setCollection[key].length,
						1
					)[0]
				);
			}
		}

		return arrOfIndexes.map((elem) => {
			cards[elem].id += elem;
			return { ...cards[elem] };
		});
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Wrong size of set or size of field";
		console.log(message);
		return [];
	}
}

const resultModal = document.getElementById("result-modal");
const root = document.getElementById("root")!;

export function MatchTheSet() {
	const dispatch = useAppDispatch();
	const playOption = useAppSelector((state) =>
		optionMTSSlice.selectors.selectPlayOption(state)
	);
	const gameStatus = useAppSelector((state) =>
		gameStatusSlice.selectors.selectGameStatus(state)
	);

	const gameSets = sortTheSets(
		cards,
		playOption.setSize,
		playOption.fieldSize.fieldSize
	);

	const [flippedState, setFlippedState] = useState(gameSets);
	const [, setCurrentSet] = useState<CurrentSet[]>([]);
	const [opensCount, setOpensCount] = useState(0);
	const [isResultOpen, setIsResultOpen] = useState(false);

	const openModal = useCallback(() => {
		root.style.top = `-${window.scrollY}px`;
		root.style.position = "fixed";
		setFlippedState((prevFlippedState) => {
			return prevFlippedState.map((set) => {
				if (!set.isFlipped) {
					return {
						...set,
						right: true,
					};
				}
				return {
					...set,
					disabled: true,
					isFlipped: false,
					wrong: true,
				};
			});
		});
		setIsResultOpen(true);
	}, []);

	const gridScema = {
		gridTemplate: `repeat(${playOption.fieldSize.rows}, 1fr) / repeat(${playOption.fieldSize.columns},  minmax(130px, 300px))`,
	};
	useEffect(() => {
		setFlippedState(gameSets);
	}, [playOption]);
	useEffect(() => {
		if (opensCount === playOption.fieldSize.fieldSize && opensCount !== 0) {
			dispatch(
				gameStatusSlice.actions.changeStatus({
					gameState: "won",
					progress: {
						opened: opensCount,
						all: playOption.fieldSize.fieldSize,
					},
				})
			);
		}
	}, [opensCount]);
	useEffect(() => {
		switch (gameStatus.gameState) {
			case "fieldIsSetUp":
				setFlippedState((prevFlippedState) =>
					prevFlippedState.map((set) => ({ ...set, disabled: true }))
				);
				break;
			case "started":
				setFlippedState((prevFlippedState) =>
					prevFlippedState.map((set) => ({
						...set,
						disabled: false,
						isFlipped: true,
					}))
				);
				setOpensCount(0);
				setCurrentSet([]);
				break;
			case "won":
				openModal();
				break;
			case "cancelled":
				openModal();
				break;
			case "timerFailed":
				openModal();
				break;
			case "cancelledHelper":
				dispatch(
					gameStatusSlice.actions.changeStatus({
						gameState: "cancelled",
						progress: {
							opened: opensCount,
							all: playOption.fieldSize.fieldSize,
						},
					})
				);
				break;
			case "timerFailedHelper":
				dispatch(
					gameStatusSlice.actions.changeStatus({
						gameState: "timerFailed",
						progress: {
							opened: opensCount,
							all: playOption.fieldSize.fieldSize,
						},
					})
				);
				break;
			default:
		}
	}, [gameStatus.gameState]);

	return (
		<>
			{resultModal &&
				createPortal(
					<ResultInfo {...{ isResultOpen, setIsResultOpen, gameStatus }} />,
					resultModal
				)}
			<div className={s["match-the-set"]} style={gridScema}>
				{flippedState.map((card) => {
					return (
						<GameCard
							key={card.id}
							{...{
								card,
								setFlippedState,
								setCurrentSet,
								playOption,
								setOpensCount,
								opensCount,
							}}
						/>
					);
				})}
			</div>
		</>
	);
}
