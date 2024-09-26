import styles from "./MatchingPairs.module.scss";
import { pairs } from "../../../../../store/store";
import { Pair } from "../../../../../store/store";

function sortedPairs(
	pairs: Pair[],
	sameElementsCount: number = 2,
	sizeOfSortedArr: number = 20
): Pair[] {
	if (sizeOfSortedArr % sameElementsCount !== 0) {
		throw new Error("");
	}
	const arrOfIndexes = [];

	//solving problem
	const arrContainer = Array.from({ length: pairs.length }, (e, i) => i++);
	const uniqueNumbers1 = [];

	for (let i = 1; i <= sizeOfSortedArr / sameElementsCount; i++) {
		uniqueNumbers1.push(
			arrContainer.splice(Math.random() * arrContainer.length, 1)[0]
		);
	}
	const uniqueNumbers2 = [...uniqueNumbers1];

	for (let i = 1; i <= sizeOfSortedArr / sameElementsCount; i++) {
		arrOfIndexes.push(
			uniqueNumbers1.splice(Math.random() * uniqueNumbers1.length, 1)[0]
		);
		arrOfIndexes.push(
			uniqueNumbers2.splice(Math.random() * uniqueNumbers2.length, 1)[0]
		);
	}

	return arrOfIndexes.map((elem) => ({ ...pairs[elem] }));
}

const gamePairs = sortedPairs(pairs, 3, 30);
console.log(gamePairs);

export function MatchingPairs() {
	return (
		<div className={styles["main-board"]}>
			{pairs.map((pair) => {
				return (
					<div key={pair.id} className={styles["pair-card"]}>
						<img src={pair.imageURL} alt={pair.title} />
					</div>
				);
			})}
		</div>
	);
}
