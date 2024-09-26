import styles from "./MatchTheSet.module.scss";
import { cards } from "../../../../../store/store";
import { Card } from "../../../../../store/store";

function sortedSets(
	cards: Card[],
	setSize: number = 2,
	fieldSize: number = 20
): Card[] {
	if (fieldSize % setSize !== 0) {
		throw new Error("");
	}
	const arrOfIndexes = [];

	//solving problem
	const arrContainer = Array.from({ length: cards.length }, (e, i) => i++);
	const uniqueNumbers1 = [];

	for (let i = 1; i <= fieldSize / setSize; i++) {
		uniqueNumbers1.push(
			arrContainer.splice(Math.random() * arrContainer.length, 1)[0]
		);
	}
	const uniqueNumbers2 = [...uniqueNumbers1];

	for (let i = 1; i <= fieldSize / setSize; i++) {
		arrOfIndexes.push(
			uniqueNumbers1.splice(Math.random() * uniqueNumbers1.length, 1)[0]
		);
		arrOfIndexes.push(
			uniqueNumbers2.splice(Math.random() * uniqueNumbers2.length, 1)[0]
		);
	}

	return arrOfIndexes.map((elem) => ({ ...cards[elem] }));
}

const gameSets = sortedSets(cards, 3, 30);
console.log(gameSets);

export function MatchTheSet() {
	return (
		<div className={styles["game-board"]}>
			{cards.map((card) => {
				return (
					<div key={card.id}>
						<img src={card.imageURL} alt={card.title} />
					</div>
				);
			})}
		</div>
	);
}
