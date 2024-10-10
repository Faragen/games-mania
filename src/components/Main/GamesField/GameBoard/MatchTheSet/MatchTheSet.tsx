import styles from "./MatchTheSet.module.scss";
import { cards, useAppSelector } from "../../../../../store/store";
import { Card } from "../../../../../store/store";
import GameCard from "./GameCard/GameCard";
import { useEffect, useState } from "react";
import { optionMTSSlice } from "../../../../../modules/MatchTheSet/options/options.slice";

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

export function MatchTheSet() {
	const playOption = useAppSelector((state) =>
		optionMTSSlice.selectors.selectPlayOption(state)
	);
	const gameSets = sortTheSets(
		cards,
		playOption.setSize,
		playOption.fieldSize.fieldSize
	);

	const [flippedState, setFlippedState] = useState(gameSets);
	const gridScema = {
		gridTemplate: `repeat(${playOption.fieldSize.rows}, 1fr) / repeat(${playOption.fieldSize.columns},  minmax(130px, 300px))`,
	};
	useEffect(() => {
		setFlippedState(gameSets);
	}, [playOption]);

	function handleFlip(id: string): void {
		setFlippedState((prevFlippedState) =>
			prevFlippedState.map((set) => {
				if (set.id === id) {
					return { ...set, isFlipped: !set.isFlipped };
				}
				return set;
			})
		);
	}

	return (
		<div className={styles["match-the-set"]} style={gridScema}>
			{flippedState.map((card) => {
				return <GameCard key={card.id} card={card} handleFlip={handleFlip} />;
			})}
		</div>
	);
}
